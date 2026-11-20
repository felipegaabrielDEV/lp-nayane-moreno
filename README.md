# 🦷 Dra. Nayane Moreno — Landing Page | Ortodontia em Aracaju

> 🚧 **Prévia no ar, ainda fora do Google.** Endereço: **https://dranayanemorenoortodontia.com.br**. A página segue com `noindex, nofollow` até a aprovação final; só sai no lançamento.

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
| **Avaliações do Google** | **Oculta** (atributo `hidden`) até a liberação; ver pendências |
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
├── ferramentas/        # gerar-previa-privada.py: gera um HTML único para conferir o site offline
└── assets/
    ├── marca/          # Logomarca (ícone, completa e favicon)
    ├── profissional/   # Fotos da Dra. Nayane (WebP)
    ├── atendimento/    # Fotos de atendimento
    ├── consultorio/    # Fotos do consultório (WebP)
    ├── situacoes/      # Fotos ilustrativas de "Para quem é"
    ├── aparelhos/      # Fotos ilustrativas dos aparelhos
    ├── casos/          # Antes e atual do caso e vídeo de depoimento
    └── convenios/      # Logos dos convênios
```

**Onde mexer:**
- Número do WhatsApp: `<meta name="whatsapp-number">` no `<head>` (só dígitos, com 55 e DDD).
- Mensagem de cada botão: objeto `mensagens` em `script.js`, pela origem (`data-wa-origin`).
- Cores e fontes: tokens no início de `styles.css`.
- Publicar as Avaliações: trocar o texto do bloco `#avaliacoes` e apagar o atributo `hidden` da `<section>`.
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
- **Ajustes finais:** botão de prévia retirado do site; bloco de Avaliações oculto; botões "Como chegar" apontam para o perfil do Google Maps; espaçamento do bloco de convênios.
- **Domínio:** `dranayanemorenoortodontia.com.br` no ar com HTTPS.
- **Documentação:** pasta da cliente no Drive reorganizada, com os questionários respondidos pela Dra., os estudos da agência e um mapa do projeto, "Leia primeiro" (ver "Documentação no Drive").

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

**Como a informação é pesada** (regra do `CLAUDE.md`), da que mais vale para a que menos vale: resposta da Dra. → fato documentado → hipótese → pendente → interno. Quando duas fontes se contradizem, aponta-se a contradição e pergunta-se; ninguém escolhe sozinho.

**Nunca entram neste repositório:** valores e condições comerciais, metas, orçamento de anúncios, nomes de concorrentes e qualquer análise sobre eles, dados de pacientes e links dos documentos do Drive.

---

## 🗺️ Próximas etapas (prévia 2)

- Formulário curto antes do WhatsApp.
- Links da Tintim por origem (UTM), Google Tag Manager com Modo de Consentimento e aviso de cookies.
- Política de privacidade, página 404, imagem de compartilhamento 1200 × 630 e dados para o Google (`Dentist`).
- Mapa do Google incorporado no bloco do consultório.

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
- [ ] **Avaliações do Google** (bloco OCULTO, atributo `hidden` em `#avaliacoes`): o link do perfil já está nos botões de "Como chegar"; falta a liberação do uso das avaliações (norma do CFO) e a escolha de quais destacar
- [ ] **Convênios na ortodontia:** o topo e o bloco Convênios mostram 4 logos, mas a pergunta "Meu convênio cobre o aparelho?" cita só SulAmérica e Amil. Confirmar se Petrobras e Porto Seguro cobrem ortodontia e ajustar o texto
- [ ] **Idade mínima da ortodontia:** o site diz 11 anos (Profissional, P10), mas o Persona diz "acima de 12" (P02)
- [ ] **Copy do topo:** "sorriso dos sonhos, sem passar anos usando aparelho?" pode ser lida como promessa de prazo. Alternativa proposta: "Aparelho metálico ou de porcelana: qual combina com você?"
- [ ] **"Ortopedia Facial" na logo do rodapé:** a logo completa (`assets/marca/logo-completa.png`) traz "Ortodontia & Ortopedia Facial". Confirmar o registro no CRO-SE; se não houver, o rodapé usa só o ícone
- [ ] **Foto do diploma e dos certificados** (a Dra. perguntou o que é preciso e ainda não enviou)
- [ ] **Autorização escrita das operadoras** para as logos dos convênios, se a Dra. tiver
- [ ] **Política de privacidade:** nome de quem responde pelos dados de quem preenche o formulário (necessário para a prévia 2)
- [ ] **Resultado sem promessa:** a Dra. quer destacar o resultado do tratamento; combinar como mostrar a evolução sem prometer resultado (regra de publicidade odontológica)

*Com o gestor de tráfego*
- [ ] **Códigos de rastreamento** (pedidos em 19/11/2026, aguardando): ID do Google Tag Manager, Pixel da Meta, conversão do Google Ads, GA4, Microsoft Clarity e links da Tintim por origem
- [ ] **Regras do rastreamento a combinar:** Meta e Google Ads recebem só o nome do evento e o `event_id` (o Google Ads também o telefone em SHA-256, com consentimento); a posição do botão vai só ao GA4 e ao Clarity; `utm_campaign` sem nome de tratamento; Google Signals e autoConfig do Pixel desligados

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
