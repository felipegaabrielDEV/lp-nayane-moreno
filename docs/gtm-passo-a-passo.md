# Passo a passo do Google Tag Manager — site da Dra. Nayane Moreno

**Para:** o gestor de tráfego (Felipe).
**Versão:** 1.0 · 23/11/2026.
**Base:** o guia "Guia de integrações e rastreamento" (23/11/2026), ajustado ao que o site **realmente envia**.
**Onde testar:** no site oficial, `https://dranayanemorenoortodontia.com.br/` (a prévia 2 foi aprovada e publicada; o site segue fora do Google até o lançamento).
**Regra geral:** nenhuma senha ou token no GTM nem no site. Onde aparece `[ENTRE_COLCHETES]`, é informação que ainda falta.

---

## 1. Como o site funciona (e a resposta sobre "botões como lead")

**Todo botão de WhatsApp abre um formulário curto** (4 perguntas). Quem envia o formulário segue para o WhatsApp com a mensagem pronta. Por isso:

- **`generate_lead` = formulário enviado = Lead.** É a conversão dos botões. Atende ao pedido de marcar os botões como lead e respeita o guia ("Lead só no envio confirmado de formulário").
- **`click_whatsapp` = seguiu para o WhatsApp = Contact.** Dispara logo depois de cada `generate_lead`. Não há caminho que pule o formulário (só para quem navega sem JavaScript, e aí nada é medido).

O que mudou em relação ao guia:

| No guia | No site | Observação |
|---|---|---|
| `click_whatsapp` → Contact | igual | Sempre logo depois de um `generate_lead` |
| `generate_lead` → Lead | igual | Conversão principal |
| `click_phone` → Contact | **não existe** | O site não tem botão de ligar; o contato é só pelo WhatsApp |
| `appointment_booked` → Schedule | **não existe no site** | O agendamento acontece na conversa. Se for medir, é pelo atendimento/CRM (importação offline) |
| — | `form_open`, `form_start`, `form_error`, `section_view`, `consent_update` | Novos, para entender o funil |

---

## 2. Identificadores

| Serviço | ID | Onde fica |
|---|---|---|
| Google Tag Manager | `GTM-PN2GHRMF` | Já instalado no site (trechos oficiais no `<head>` e no `<body>`) |
| Google Analytics 4 | `G-EVCXNXLJ7X` | **Só no GTM** (não instalar direto no código) |
| Meta Pixel | `29738900965703465` | **Só no GTM** |
| Microsoft Clarity | `zi8y5zcfm0` | **Só no GTM** |
| Google Ads | `[ID_GOOGLE_ADS]` e `[ROTULO_CONVERSAO]` | Integração futura |

---

## 3. Eventos que o site envia ao `dataLayer`

Todos levam `event_id` (único), para as plataformas não contarem duas vezes e para deduplicar com a Conversions API, se for ativada.

| Evento | Quando | Parâmetros |
|---|---|---|
| `form_open` | Abriu o formulário | `form_id`, `cta_position` |
| `form_start` | Mexeu no primeiro campo | `form_id`, `cta_position` |
| `form_error` | Tentou enviar com erro | `form_id`, `error_fields` |
| `generate_lead` | **Envio válido** | `form_id`, `cta_position`, `perfil_paciente`, `convenio`, `visit_origin`, `ec_phone_sha256` |
| `click_whatsapp` | Seguiu para o WhatsApp | `cta_position`, `link_url` |
| `section_view` | Viu uma seção-chave por 1 s | `section_name` |
| `consent_update` | Escolheu no aviso de cookies | `consent_analytics`, `consent_marketing`, `consent_externo` |

**Valores possíveis**

- `form_id`: sempre `whatsapp_lead`.
- `cta_position` (botão que abriu o formulário): `menu`, `menu_mobile`, `hero`, `situacoes`, `aparelhos`, `casos`, `convenios`, `particular`, `como_funciona`, `sobre`, `consultorio`, `horario`, `faq`, `cta_final`, `rodape`, `botao_flutuante`. Os dois botões de aparelho chegam como `aparelhos`, sem o tipo (metálico ou porcelana): tipo de tratamento de interesse não vai para as plataformas.
- `perfil_paciente`: `adulto` ou `adolescente`.
- `convenio`: `sim`, `particular` ou `nao_sei`. Quando a pessoa marca `sim`, o formulário pergunta **qual convênio** (Amil, SulAmérica, Porto Seguro, Petrobras ou Outro, com o nome digitado). **Esse nome vai só na mensagem do WhatsApp e nunca chega ao `dataLayer`**: não existe variável nem parâmetro para ele, e não deve ser criado no GTM.
- `visit_origin`: `meta_ads`, `google_ads`, `instagram_bio`, `google_perfil` ou `direto`, lido das UTMs (ver seção 9).
- `error_fields`: campos com erro, separados por vírgula: `paciente`, `convenio`, `operadora` (faltou escolher qual convênio), `outro` (faltou escrever o nome), `nome`, `whatsapp`.
- `section_name`: `aparelhos`, `evolucao_caso`, `convenios`, `sobre`, `avaliacoes`, `duvidas`.
- `ec_phone_sha256`: telefone embaralhado (SHA-256 de `+55DDDNÚMERO`), só para as conversões otimizadas do Google Ads. É apagado do `dataLayer` logo depois do evento.

**Nunca chega ao `dataLayer`:** nome, telefone em texto aberto, sintoma, queixa, tipo de aparelho.

---

## 4. Consentimento (já pronto no site)

O site começa com **tudo negado** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`), com `wait_for_update: 500` e `ads_data_redaction: true`. O aviso de cookies tem três escolhas:

| Escolha no aviso | Atualiza | Libera |
|---|---|---|
| Estatística | `analytics_storage` | GA4 e Clarity |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` | Meta Pixel e Google Ads |
| Avaliações do Google | nada no Google (fica no site) | Widget do Elfsight |

A escolha salva é reaplicada no `<head>` nas visitas seguintes, antes do GTM.

---

## 5. Variáveis

**Constantes**

| Nome | Valor |
|---|---|
| `C - GA4 ID` | `G-EVCXNXLJ7X` |
| `C - Meta Pixel ID` | `29738900965703465` |
| `C - Clarity ID` | `zi8y5zcfm0` |
| `C - Google Ads ID` | `[ID_GOOGLE_ADS]` (só os números) |

**Variáveis da camada de dados** (versão 2). Nome = `DLV - ` + chave:

`event_id` · `form_id` · `cta_position` · `perfil_paciente` · `convenio` · `visit_origin` · `error_fields` · `link_url` · `section_name` · `consent_analytics` · `consent_marketing` · `ec_phone_sha256`

**JavaScript personalizado** `JS - Dados EC Google Ads` (para quando o Google Ads entrar):

```js
function () {
  var h = {{DLV - ec_phone_sha256}};
  return h ? { sha256_phone_number: h } : undefined;
}
```

---

## 6. Acionadores

| Nome | Tipo | Condição |
|---|---|---|
| `CE - consent_update` | Evento personalizado | `consent_update` |
| `CE - generate_lead` | Evento personalizado | `generate_lead` |
| `CE - click_whatsapp` | Evento personalizado | `click_whatsapp` |
| `CE - form_open` | Evento personalizado | `form_open` |
| `CE - form_start` | Evento personalizado | `form_start` |
| `CE - form_error` | Evento personalizado | `form_error` |
| `CE - section_view` | Evento personalizado | `section_view` |
| `Inicialização - Todas as páginas` | Inicialização | todas |
| `Todas as páginas` | Visualização de página | todas |

---

## 7. Tags

Em cada tag: **Configurações avançadas → Configurações de consentimento → "Exigir consentimento adicional"** com o tipo indicado.

Nas tags de carregamento (Google tag, Meta Base, Clarity), use **"Opções de disparo: uma vez por página"** com o acionador de página **e** o `CE - consent_update`. Assim, quem aceita o aviso no meio da visita passa a ser medido sem recarregar.

| Tag | Tipo | Acionador | Consentimento | Configuração |
|---|---|---|---|---|
| **GA4 - Google tag** | Tag do Google | Inicialização + `CE - consent_update` (uma vez por página) | `analytics_storage` | ID `{{C - GA4 ID}}`. No GA4: **Google Signals desligado** |
| **GA4 - generate_lead** | Evento do GA4 | `CE - generate_lead` | `analytics_storage` | Nome `generate_lead`; parâmetros `form_id`, `cta_position`, `perfil_paciente`, `convenio`, `visit_origin`. **Não** enviar `ec_phone_sha256`. No GA4, marcar `generate_lead` como **evento principal** |
| **GA4 - interações** | Evento do GA4 | `CE - click_whatsapp`, `CE - form_open`, `CE - form_start`, `CE - form_error`, `CE - section_view` | `analytics_storage` | Nome `{{Event}}`; parâmetros `cta_position`, `form_id`, `section_name`, `error_fields` |
| **Meta - Base + PageView** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | código 8.1 |
| **Meta - Lead** | HTML personalizado | `CE - generate_lead` | `ad_storage` | código 8.2 · Sequenciamento: depois de "Meta - Base + PageView" |
| **Meta - Contact** | HTML personalizado | `CE - click_whatsapp` | `ad_storage` | código 8.3 · mesmo sequenciamento |
| **Clarity** | HTML personalizado | Todas as páginas + `CE - consent_update` (uma vez por página) | `analytics_storage` | código 8.4 |
| **Ads - Formulário enviado** *(quando houver o ID)* | Acompanhamento de conversões do Google Ads | `CE - generate_lead` | `ad_storage`, `ad_user_data` | ID `{{C - Google Ads ID}}`, rótulo `[ROTULO_CONVERSAO]`, ID da transação `{{DLV - event_id}}`, "Incluir dados fornecidos pelo usuário" → código com `{{JS - Dados EC Google Ads}}` |
| **Ads - Vinculador** *(quando houver o ID)* | Vinculador de conversões | Todas as páginas + `CE - consent_update` (uma vez por página) | `ad_storage` | — |

---

## 8. Códigos das tags HTML

**8.1 Meta - Base + PageView**
```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '{{C - Meta Pixel ID}}'); // não coleta cliques e textos da página sozinho
fbq('init', '{{C - Meta Pixel ID}}');
fbq('track', 'PageView');
</script>
```

**8.2 Meta - Lead.** Para a Meta vai **só o nome do evento e o `event_id`** (regra combinada no projeto). Posição do botão, perfil e convênio ficam só no GA4.
```html
<script>
fbq('track', 'Lead', {}, { eventID: {{DLV - event_id}} });
</script>
```

**8.3 Meta - Contact** (o guia pede Contact no clique do WhatsApp; mesma regra: só o evento e o `event_id`)
```html
<script>
fbq('track', 'Contact', {}, { eventID: {{DLV - event_id}} });
</script>
```

**8.4 Clarity**
```html
<script>
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{C - Clarity ID}}");
</script>
```

No painel do Clarity: **Configurações → Mascaramento → "Rígido" (Strict)**. A janela do formulário já tem `data-clarity-mask="true"`, mas o modo rígido protege também o resto da página.

---

## 9. Origem da visita (UTMs)

O site lê `utm_source` e `utm_medium` na chegada e envia `visit_origin` no `generate_lead`. Para cada campanha cair na origem certa, use:

| Origem | `utm_source` | `utm_medium` |
|---|---|---|
| Anúncio do Meta | `facebook` ou `instagram` | `paid_social` |
| Google Ads | `google` | `cpc` |
| Bio do Instagram | `instagram` | `organic` |
| Perfil do Google | `google` | `organic` |

Se for usar **Tintim**, envie os links por origem: o site já tem o lugar para eles (`LINKS_POR_ORIGEM` em `lead-form.js`).

---

## 10. Testes no modo "Visualizar" (antes de publicar o contêiner)

Abra o modo Visualizar do GTM com o endereço do site: `https://dranayanemorenoortodontia.com.br/`

1. **Antes de escolher no aviso:** nenhuma tag de GA4, Meta ou Clarity dispara. No Tag Assistant, o consentimento aparece todo como `denied`.
2. **"Recusar":** continua tudo bloqueado.
3. **"Personalizar" → só Estatística:** GA4 e Clarity disparam; Meta não.
4. **"Aceitar":** GA4, Meta e Clarity disparam uma vez cada (sem recarregar a página).
5. **Formulário:** clique em qualquer botão de WhatsApp → `form_open`; preencha → `form_start`; envie vazio → `form_error`; envie certo → `generate_lead` e `click_whatsapp`, **uma vez cada**. Confira o mesmo `event_id` no GA4 (DebugView) e no Meta (Pixel Helper / Gerenciador de Eventos → Testar eventos).
6. **"Preferências de cookies" (rodapé) → desmarcar tudo → Salvar:** a página recarrega e nada mais dispara.

---

## 11. Pontos de atenção

1. **Token da Conversions API.** O guia avisa que um token foi compartilhado antes. **Revogar e gerar outro**, guardar só no servidor. Nunca no site, no GTM web ou em documento.
2. **Não instalar GA4, Pixel ou Clarity direto no código.** Tudo pelo GTM, senão duplica.
3. **Google Search Console:** verificação pelo registro TXT no DNS do domínio (fora do site). Alternativa: meta tag de verificação no site, se o DNS for difícil.
4. **Dados de saúde:** não criar variáveis com o texto da mensagem do WhatsApp nem com o tipo de aparelho.
5. **Regras combinadas no projeto:** Meta e Google Ads recebem só o nome do evento e o `event_id` (o Google Ads também o telefone em SHA-256, com consentimento); posição do botão, perfil e convênio vão só ao GA4; `utm_campaign` sem nome de tratamento (ex.: `ortodontia_aracaju_nov`, nunca `aparelho_porcelana`); Google Signals e autoConfig do Pixel desligados.

## 12. O que falta

- [ ] ID do Google Ads e rótulo da conversão.
- [ ] Confirmar se vai usar Tintim (e os links por origem).
- [ ] Revogar o token antigo da Conversions API.
- [ ] Registro TXT do Search Console no DNS.
