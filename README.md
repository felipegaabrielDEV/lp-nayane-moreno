# 🦷 Dra. Nayane Moreno — Landing Page | Ortodontia em Aracaju

> 🚧 **Prévia no ar, ainda fora do Google.** Endereço: **https://dranayanemorenoortodontia.com.br**. A página segue com `noindex, nofollow` até a aprovação final; só sai no lançamento.
>
> ✅ **Site aprovado pelo Felipe em 24/11/2026.** Prévia 2 publicada no endereço oficial: formulário antes do WhatsApp, aviso de cookies, Google Tag Manager, política de privacidade e 404. Ver "Prévia 2".

Landing page da **Dra. Nayane Moreno**, Cirurgiã-Dentista (CRO-SE 2301) em Aracaju/SE, focada em **Ortodontia**: captar pessoas interessadas em colocar aparelho e levá-las a agendar a avaliação pelo WhatsApp.

---

## 📋 Sobre o projeto

- **Posicionamento:** "Dra. Nayane Moreno — Ortodontia em Aracaju". O site é só de Ortodontia.
- **Tratamentos:** aparelho metálico e aparelho de porcelana. **Alinhador: a Dra. informou em 12/11/2026 que não trabalha com alinhadores** (removido do site).
- **Formas de atendimento:** convênio (SulAmérica e Amil) e particular.
- **Conversão:** todos os botões levam ao WhatsApp, com mensagem pronta por origem.
- **Referências internas:** a estrutura e a engenharia seguem as LPs da Nutri Anna Waleska e da VALLENCI Salas; identidade, textos e imagens são próprios.

---

## 🌐 Domínio e publicação

| Item | Situação |
|---|---|
| **Endereço oficial** | `dranayanemorenoortodontia.com.br` (o `www` redireciona para ele) |
| **Hospedagem** | GitHub Pages, gratuita, com HTTPS forçado |
| **Arquivo `CNAME`** | Na raiz do repositório; liga o site ao domínio. Não apague |
| **Registro** | Registro.br, em nome da Dra. Nayane (titular); a gestão técnica fica com o desenvolvedor |
| **DNS** | Zona do Registro.br: 4 registros `A` para o GitHub Pages e `CNAME` do `www` para `felipegaabrieldev.github.io` |
| **Validade** | 1 ano, até **18/11/2027**. Renovar no Registro.br antes do vencimento |
| **Site da mentoria** | Domínio separado (`dranayanemoreno.com.br`), não foi alterado |

Dados de acesso, CPF e pedidos ficam fora deste repositório.

---

## ✨ Seções

| Seção | Destaques |
|---|---|
| **Menu** | Fixo, com nome e CRO sempre visíveis; menu de tela cheia no celular (fecha com `Esc` ou ao tocar num link) |
| **Topo** | Título, foto em moldura de arco, cartão com CRO, três números de destaque e faixa com seis cartões (os de Evolução e Depoimento rolam até a seção) |
| **Para quem é** | Seis situações em cartões com foto. Fotos ilustrativas geradas por IA, com a nota "Imagens ilustrativas" (`assets/situacoes/`) |
| **Aparelhos** | Dois cartões (metálico e porcelana) com foto ilustrativa, características e botão próprio |
| **Evolução e depoimento** | Caso em andamento (fotos de antes e atual) e vídeo de relato, com autorizações de imagem feitas pela Dra. |
| **Convênios e particular** | Lado a lado: planos atendidos e atendimento particular |
| **Como funciona** | Cinco etapas, do WhatsApp ao acompanhamento, e citação da Dra. Nayane |
| **Sobre** | Formação, trajetória e história pessoal ligada à ortodontia, com cartões de credenciais |
| **Atendimento** | Fotos da Dra. atendendo (grade no computador, carrossel no celular), com visualização ampliada |
| **Consultório** | Galeria com as fotos do consultório (setas, deslize e teclado) |
| **Como chegar** | Endereço, horário e botões que abrem o **perfil da Dra. no Google Maps** |
| **Avaliações do Google** | Widget do Elfsight (4,9 de 5, 202 avaliações em 21/11/2026), liberado pela Dra.; carrega ao chegar perto da seção; ver pendências |
| **Perguntas frequentes** | Perguntas em acordeão acessível |
| **Chamada final e rodapé** | Contato, localização, horário e identificação profissional |

---

## 🎨 Identidade visual

Segue o **Manual de Identidade Visual** da marca (nov/2026). As cores foram conferidas nos pixels da logomarca enviada.

| Cor | Hex | Uso |
|---|---|---|
| Verde da marca | `#16AD8E` | Logo, destaques, ícones e detalhes |
| Cinza da marca | `#8C8C8C` | "MORENO", fio do aparelho e textos de apoio |
| Verde dos botões | `#0F7A64` | Botões (contraste AA com texto branco) |
| Verde escuro | `#0F3F36` | Faixa do topo, seção "Como funciona" e chamada final |
| Verde claro | `#E8F6F1` | Fundos de detalhe |
| Fundo suave | `#F7F9F8` | Seções alternadas com o branco |
| Texto | `#303B39` | Títulos e textos |

Tipografia: **Montserrat** em todo o site, com o contraste de pesos da logo (forte em "NAYANE", leve em "MORENO"): títulos em 600 e o trecho em destaque em 300, no verde da marca.

Detalhe próprio do site: o **fio do aparelho com o bráquete verde**, tirado da logo. Logomarca em `assets/marca/` (ícone, versão completa e favicon, com fundo transparente).

---

## 🛠️ Tecnologias e estrutura

HTML, CSS e JavaScript puros, sem framework nem build, publicados pelo GitHub Pages.

```
├── index.html          # Estrutura e conteúdo de todas as seções
├── styles.css          # Identidade, layout responsivo e animações (tokens no :root)
├── script.js           # Menu, WhatsApp, FAQ, galerias, visualização ampliada e revelar ao rolar
├── CNAME               # Domínio personalizado do GitHub Pages
├── lead-form.js        # Formulário antes do WhatsApp e origem da visita (UTM)
├── eventos.js          # Eventos para o Google Tag Manager (window.nayaneTrack)
├── consent.js          # Aviso de cookies (LGPD) e Modo de Consentimento do Google
├── politica-de-privacidade.html  # noindex; responsável pelos dados: a empresa do consultório (CNPJ)
├── 404.html            # Página de erro, com <base href="/">
├── docs/               # gtm-passo-a-passo.md: como montar o painel do GTM (para o gestor de tráfego)
├── ferramentas/        # gerar-previa-privada.py (HTML único offline) e gerar-cartao.js (imagem de compartilhamento)
└── assets/
    ├── marca/          # Logomarca (ícone, completa e favicon)
    ├── profissional/   # Fotos da Dra. Nayane (WebP)
    ├── atendimento/    # Fotos de atendimento
    ├── consultorio/    # Fotos do consultório (WebP)
    ├── situacoes/      # Fotos ilustrativas de "Para quem é"
    ├── aparelhos/      # Fotos ilustrativas dos aparelhos
    ├── casos/          # Antes e atual do caso e vídeo de depoimento
    ├── convenios/      # Logos dos convênios
    └── compartilhar/   # Imagem que aparece quando o link é compartilhado (WhatsApp, redes)
```

**Onde mexer:**
- Número do WhatsApp: `<meta name="whatsapp-number">` no `<head>` (só dígitos, com 55 e DDD).
- Mensagem de cada botão: objeto `mensagens` em `script.js`, pela origem (`data-wa-origin`).
- Cores e fontes: tokens no início de `styles.css`.
- Avaliações: ID do widget no bloco "Avaliações do Google" do `script.js` (conta Elfsight só da Nayane; não reutilizar o ID de outro cliente). Cores, idioma e filtros ficam no painel do Elfsight, sem novo envio de código.
- Imagem de compartilhamento: `ferramentas/cartao-compartilhar.html` (modelo) e `node ferramentas/gerar-cartao.js` (gera a imagem). Ao trocar, salvar com **outro nome de arquivo** e atualizar `og:image` e `twitter:image`: o WhatsApp guarda a prévia antiga.
- Lançamento: remover `<meta name="robots" content="noindex, nofollow">` do `<head>` só com a aprovação final.

---

## 📱 Responsividade, acessibilidade e performance

- Testado em `320` · `375` · `390` · `430` · `768` · `1024` · `1366` · `1920` px, sem rolagem horizontal.
- Foco visível, link "Pular para o conteúdo", FAQ com `aria-expanded`, áreas de toque de 44 px ou mais.
- Animações desligadas com `prefers-reduced-motion`.
- Imagens em WebP com dimensões declaradas e `loading="lazy"` fora do topo; foto do topo com `preload`.

---

## 🚀 Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 🕓 Histórico de entregas

- **Identidade e estrutura:** logomarca, cores e tipografia do manual da marca; seções completas.
- **Conteúdo:** textos conferidos contra as respostas da Dra.; alinhador removido; faixa do topo com 6 cartões; antes e atual e depoimento em vídeo publicados com autorização.
- **Ajustes finais:** botão de prévia retirado do site; bloco de Avaliações preparado; botões "Como chegar" apontam para o perfil do Google Maps; espaçamento do bloco de convênios.
- **Avaliações do Google (21/11/2026):** widget do Elfsight (plano grátis, conta própria da Nayane) nas cores do site, liberado pela Dra.; carrega sozinho ao chegar perto da seção.
- **Convênio no formulário (24/11/2026):** a Dra. pediu que, ao marcar "Sim" em convênio, o formulário pergunte qual (a recepção já sabe de qual plano se trata). Feito, só com os quatro convênios atendidos (a opção "Outro" foi retirada por decisão da agência).
- **Site aprovado (24/11/2026):** o Felipe aprovou o site pronto, no grupo. A Dra. Nayane foi avisada do que foi feito (formulário, aviso de cookies, política de privacidade e medição) e de que faltava dizer quem responde pelos dados (a agência informou a empresa do consultório, com CNPJ). O lançamento (Google) fica para depois.
- **Imagem de compartilhamento (21/11/2026):** cartão 1200 × 630 com a foto da Dra., a logo e as cores do site. A Dra. escolheu esta entre duas opções; a versão com a logomarca fica guardada em `assets/compartilhar/` e `ferramentas/`.
- **Prévia 2 (aprovada pelo Felipe e publicada no endereço oficial):** formulário antes do WhatsApp, aviso de cookies com Modo de Consentimento, Google Tag Manager, eventos, avaliações do Google só com permissão, política de privacidade e página 404, em `/previa-2/` para aprovação.
- **Domínio:** `dranayanemorenoortodontia.com.br` no ar com HTTPS.
- **Documentação:** pasta da cliente no Drive reorganizada, com os questionários respondidos pela Dra., os estudos da agência e um mapa do projeto, "Leia primeiro" (ver "Documentação no Drive").
- **Inteligências no Drive (23/11/2026):** pasta "INTELIGÊNCIAS - META" na pasta da Nayane e modelo "INTELIGÊNCIAS - CLIENTES" para as próximas clientes (ver "Documentação no Drive").

---

## 🗂️ Documentação no Drive

O material estratégico fica no **Google Drive**, na pasta da Dra. Nayane, e **não** neste repositório (que é público). Aqui só está o que pode ser publicado. Os links do Drive também ficam de fora.

| Pasta | O que tem |
|---|---|
| **Construção do Site › Leia primeiro — Mapa do projeto** | Mapa da pasta, de onde cada documento veio e as pendências abertas. Comece por ele |
| **Respostas dos 4 arquivos** | Os 4 questionários respondidos pela Dra. (Profissional, Mercado, Persona e Concorrentes), organizados, com a etiqueta "No site hoje" em cada pergunta |
| **Construção do Site › Estudos** | Roteiro do site, notas internas da agência, pesquisa de mercado e manual de identidade visual |
| **Construção do Site › Confirmações** | Conferências com o desenvolvedor |
| **Fotos - SITE** | Fotos do consultório, do atendimento e das provas sociais, mais a logo |
| **Construção do Site › INTELIGÊNCIAS - META** | Rastreamento da Nayane: solicitação ao gestor de tráfego (com o que chegou e o que falta), passo a passo do GTM, regras de privacidade e checklist de validação. Versão de consulta do `docs/gtm-passo-a-passo.md` |
| **CLIENTES › INTELIGÊNCIAS - CLIENTES** | Os mesmos quatro documentos como modelo, sem dado de nenhuma cliente, com os campos a preencher em amarelo. Serve para as próximas clientes (a Júlia é a próxima) |

**Como a informação é pesada** (regra do `CLAUDE.md`), da que mais vale para a que menos vale: resposta da Dra. → fato documentado → hipótese → pendente → interno. Quando duas fontes se contradizem, aponta-se a contradição e pergunta-se; ninguém escolhe sozinho.

**Nunca entram neste repositório:** valores e condições comerciais, metas, orçamento de anúncios, nomes de concorrentes e qualquer análise sobre eles, dados de pacientes e links dos documentos do Drive.

---

## ✅ Prévia 2 (aprovada e publicada)

**Onde está:** no site oficial, https://dranayanemorenoortodontia.com.br (política em `/politica-de-privacidade.html`; a 404 aparece em qualquer endereço que não existe). Aprovada pelo Felipe e publicada; a pasta `/previa-2/` foi apagada. O site segue com `noindex` até o lançamento.

**O que tem**
- **Formulário antes do WhatsApp:** todo botão abre 4 perguntas do Roteiro (quem vai usar o aparelho, convênio, nome e WhatsApp). Se a pessoa marca "Sim" em convênio, aparece "Qual convênio?" (Amil, SulAmérica, Porto Seguro ou Petrobras), pedido da Dra. Nayane em 24/11/2026. O nome do convênio vai só na mensagem do WhatsApp, nunca ao rastreamento. Depois, o WhatsApp abre com a mensagem do botão e as respostas. Gaveta no celular, foco preso, `Esc` fecha, máscara de telefone com DDD, `data-clarity-mask`.
- **Aviso de cookies:** tudo negado por padrão; escolhas de Estatística, Marketing e Avaliações do Google; "Preferências de cookies" no rodapé e na política.
- **Google Tag Manager** (`GTM-PN2GHRMF`) com Modo de Consentimento. GA4, Meta Pixel e Clarity entram **pelo painel do GTM**, não no código: passo a passo em [`docs/gtm-passo-a-passo.md`](docs/gtm-passo-a-passo.md).
- **Eventos:** `generate_lead` (formulário enviado = **Lead**, a conversão dos botões) e `click_whatsapp` (= **Contact**), mais `form_open`, `form_start`, `form_error`, `section_view` e `consent_update`. Nome e telefone em texto aberto nunca vão ao `dataLayer`; o tipo de aparelho também não.
- **Avaliações do Google:** só carregam com a permissão do aviso; sem ela, um quadro com o link para o Google.
- **Política de privacidade** (rascunho para revisão jurídica) e **página 404**.

**Testes feitos:** 320 a 1920 px sem rolagem horizontal (com aviso e formulário abertos), teclado e foco, consentimento negado não carrega Elfsight, nome e telefone fora do `dataLayer`, nenhum erro de JavaScript.

**Falta para fechar o rastreamento:** o Felipe montar as tags no GTM e testar no modo Visualizar, já no endereço oficial (passo a passo em [`docs/gtm-passo-a-passo.md`](docs/gtm-passo-a-passo.md)).

**Fica para o lançamento:** criar o `sitemap.xml`, tirar o `noindex` e enviar o sitemap no Search Console.

**Ainda fora da prévia 2:** mapa do Google incorporado no bloco do consultório.

---

## ✅ Pendências de conteúdo

Conferência feita em 13/11/2026 contra os quatro documentos da cliente no Drive (Profissional, Persona, Mercado e Concorrentes), já respondidos pela Dra. Nayane. Cada item resolvido traz o documento e a pergunta de origem.

**Resolvidas pelas respostas da Dra.**
- [x] Tipos de aparelho (metálico e porcelana; sem alinhador), manutenções mensais, duração média de um ano e meio e fim do tratamento (Mercado, P02, P09 e P11)
- [x] Citação, endereço, horário, equipe, formação e números do topo (Profissional P01, P02, P13; Mercado P27)
- [x] Convênios: 4 logos mantidas por decisão da Dra., que tem parceria com as empresas (Petrobras e Porto Seguro são só de clínica geral, Mercado P19; o texto pede para confirmar a cobertura no WhatsApp)
- [x] **Autorizações de imagem** (fotos de atendimento, caso clínico e vídeo da mãe): a Dra. informou em nov/2026 que estão todas feitas; os documentos ficam com a clínica, fora deste repositório
- [x] **Antes e depois e depoimentos:** a Dra. respondeu que pode publicar; só preço é proibido (Mercado, P30)
- [x] Texto "Quem cuida do seu sorriso" e fotos ilustrativas dos aparelhos e de "Para quem é": aprovados pela Dra.
- [x] Faixa do topo com 6 cartões, aprovada em 12/11/2026; Evolução e Depoimento agora aparecem também no modo "ocultar pendências"

**Ainda abertas** (revisão de 19/11/2026)

*Com a Dra. Nayane*
- [x] **Avaliações do Google:** liberadas pela Dra. Nayane em 21/11/2026; widget no ar, carregando direto
- [ ] **Avaliações, norma do CFO:** conferir a norma vigente do CFO e do CRO-SE sobre exibir avaliações de pacientes (a autorização da Dra. não substitui)
- [x] **Avaliações, privacidade (LGPD):** o widget só carrega com a permissão do aviso de cookies e a política cita Google e Elfsight. No site oficial desde a publicação da prévia 2
- [ ] **Avaliações, Elfsight:** idioma em português confirmado (23/11/2026). Falta conferir no painel os filtros (nota mínima 4 e palavras ocultas como preço, melhor, rápido, resultado), a opção de ocultar a foto de quem avalia e que o widget está publicado. Plano grátis: 1.000 visualizações por mês e selo "Free Google Reviews Widget" (tirar o selo exige plano pago); conferir o que acontece ao passar do limite
- [ ] **Avaliações, texto dos clientes:** o Google mostra o que o paciente escreveu; se aparecer preço, "melhor" ou promessa de resultado, ocultar pelo filtro do Elfsight. Hoje aparece um nome de perfil não pessoal ("Vídeos Edificadores")
- [ ] **Convênios na ortodontia:** o topo e o bloco Convênios mostram 4 logos, mas a pergunta "Meu convênio cobre o aparelho?" cita só SulAmérica e Amil. Confirmar se Petrobras e Porto Seguro cobrem ortodontia e ajustar o texto
- [ ] **Idade mínima da ortodontia:** o site diz 11 anos (Profissional, P10), mas o Persona diz "acima de 12" (P02)
- [ ] **Copy do topo:** "sorriso dos sonhos, sem passar anos usando aparelho?" pode ser lida como promessa de prazo. Alternativa proposta: "Aparelho metálico ou de porcelana: qual combina com você?"
- [ ] **"Ortopedia Facial" na logo do rodapé:** a logo completa (`assets/marca/logo-completa.png`) traz "Ortodontia & Ortopedia Facial". Confirmar o registro no CRO-SE; se não houver, o rodapé usa só o ícone
- [ ] **Foto do diploma e dos certificados** (a Dra. perguntou o que é preciso e ainda não enviou)
- [ ] **Autorização escrita das operadoras** para as logos dos convênios, se a Dra. tiver
- [x] **Política de privacidade, quem responde pelos dados:** a empresa do consultório, CNPJ 28.971.129/0001-66 (informado pela agência em 24/11/2026). A política identifica a empresa pelo CNPJ e pelo consultório
- [ ] **Política de privacidade, razão social:** a política ainda não traz o nome (razão social) da empresa, só o CNPJ. Acrescentar se a Dra. quiser
- [ ] **Resultado sem promessa:** a Dra. quer destacar o resultado do tratamento; combinar como mostrar a evolução sem prometer resultado (regra de publicidade odontológica)

*Com o gestor de tráfego*
- [x] **Códigos de rastreamento:** recebidos em 23/11/2026 (GTM, GA4, Meta Pixel e Clarity). GTM instalado no site oficial; os outros entram pelo painel do GTM
- [x] **"Botões como lead":** resolvido. Todo botão abre o formulário, e o envio (`generate_lead`) é o Lead; o clique para o WhatsApp é Contact
- [x] **Site aprovado pelo Felipe** em 24/11/2026. Ele disse que alinha o restante com a agência; as quatro tarefas abaixo seguem em aberto até ele confirmar
- [ ] **Montar o painel do GTM** seguindo [`docs/gtm-passo-a-passo.md`](docs/gtm-passo-a-passo.md), já com as regras do projeto (Meta e Google Ads só com o nome do evento e o `event_id`; `utm_campaign` sem nome de tratamento; Google Signals e autoConfig do Pixel desligados), e testar no modo Visualizar na prévia 2
- [ ] **Token da Conversions API da Meta:** o guia avisa que foi compartilhado antes. Revogar e gerar outro, guardado só no servidor
- [ ] **Google Ads:** ID e rótulo da conversão ("a definir" no guia)
- [ ] **Tintim:** confirmar se vai usar; se sim, enviar os links por origem
- [x] **Search Console, registro TXT:** adicionado no DNS do Registro.br em 23/11/2026, sem mexer nos registros do site
- [ ] **Search Console, verificação:** o Felipe clicar em Verificar em search.google.com/search-console, na propriedade de Domínio (previsto para 24/11/2026). Alternativa, se falhar: meta tag de verificação no site

*Com a agência*
- [ ] **Cor oficial da marca:** o manual de identidade estima o verde em `#49B89F`; o site usa `#16AD8E`, conferido nos pixels da logo. Definir uma só e pedir o arquivo vetorial da logo
- [ ] **Norma do CRO-SE por escrito**, se o Felipe preferir não depender só da resposta da Dra.
- [ ] **No lançamento:** tirar o `noindex`, avaliar o bairro (São José) no título da página e corrigir endereço e descrição nos cadastros antigos (Facebook e diretórios ainda mostram outro endereço)
- [ ] **Google Meu Negócio:** é administrado pela Dra.; no lançamento, pedir acesso (ou combinar que ela atualize) para corrigir endereço, horário e convênios

**Fora do site, por decisão registrada**
- Alinhador transparente: a Dra. não trabalha com ele (Mercado, P09)
- Mentoria: tem site próprio e não entra (Profissional, P25; Persona, P26)
- Preços, bônus de aparelho e condições de pagamento: informação interna, não vai ao site (Mercado, P15 e P30; Persona, P15 e P18)
- Estacionamento: a reclamação mais comum dos pacientes é não ter onde estacionar (Persona, P24), então o site não promete vaga

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Dra. Nayane Moreno** e não devem ser reutilizados sem autorização.
