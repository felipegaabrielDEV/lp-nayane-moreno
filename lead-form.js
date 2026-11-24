/* ==========================================================================
   Formulário antes do WhatsApp
   Todo botão com data-wa abre esta janela. Depois de validar, a pessoa segue
   para o WhatsApp do consultório com a mensagem do botão + as respostas, e
   confirma o envio por lá. Sem JavaScript, os botões continuam indo direto ao
   WhatsApp (href montado em script.js).

   Eventos (eventos.js → GTM), com os nomes do guia do gestor de tráfego:
     form_open      abriu o formulário
     form_start     mexeu no primeiro campo
     form_error     tentou enviar com erro
     generate_lead  envio válido            → Meta: Lead · GA4: evento principal
     click_whatsapp seguiu para o WhatsApp  → Meta: Contact
   O nome nunca vai para o dataLayer. O telefone só embaralhado (SHA-256), para
   as conversões otimizadas do Google Ads, e é apagado logo depois do evento.

   Origem da visita: na chegada, os parâmetros UTM são lidos e guardados na
   sessão (sessionStorage "nm_origin"). Se o gestor de tráfego passar links da
   Tintim por origem, basta preencher LINKS_POR_ORIGEM abaixo.
   ========================================================================== */
(function () {
    "use strict";
    const modal = document.getElementById("lead-modal");
    const form = document.getElementById("lead-form");
    if (!modal || !form) return;

    const janela = modal.querySelector(".lead-janela");
    const passo = document.getElementById("lead-passo");
    const sucesso = document.getElementById("lead-sucesso");
    const campos = {
        paciente: document.getElementById("lead-paciente"),
        convenio: document.getElementById("lead-convenio"),
        operadora: document.getElementById("lead-operadora"),   // "Qual convênio?", só com "Sim"
        nome: form.elements.nome,
        whatsapp: form.elements.whatsapp
    };
    const valorDe = nome => form.elements[nome]?.value || ""; // nos grupos de opção, devolve a opção marcada
    const textoDaEscolha = nome => form.querySelector(`input[name="${nome}"]:checked`)?.nextElementSibling?.textContent.trim() || "";
    const track = (evento, params) => { if (typeof window.nayaneTrack === "function") window.nayaneTrack(evento, params); };

    /* ---------- Origem da visita (UTM) ----------
       Reconhece anúncio do Meta, Google Ads, bio do Instagram e perfil do Google. Guarda só na sessão do navegador. */
    const LINKS_POR_ORIGEM = {
        // Links da Tintim por origem, quando o gestor de tráfego enviar. Ex.: meta_ads: "https://tintim.link/whatsapp/…"
    };
    function resolverOrigem(fonte, meio) {
        const f = (fonte || "").toLowerCase();
        const m = (meio || "").toLowerCase();
        if (["facebook", "fb", "instagram", "ig", "meta"].includes(f) && ["paid_social", "paid", "cpc", "ads"].includes(m)) return "meta_ads";
        if (f === "google" && ["cpc", "paid", "ads"].includes(m)) return "google_ads";
        if (["instagram", "ig"].includes(f) && ["organic", "organic_social", "bio", "social"].includes(m)) return "instagram_bio";
        if (f === "google" && ["organic", "perfil", "gbp", "maps"].includes(m)) return "google_perfil";
        return "";
    }
    try {
        const q = new URLSearchParams(location.search);
        const origem = resolverOrigem(q.get("utm_source"), q.get("utm_medium"));
        if (origem) sessionStorage.setItem("nm_origin", origem);
    } catch (erro) { }
    const origemDaVisita = () => { try { return sessionStorage.getItem("nm_origin") || "direto"; } catch (erro) { return "direto"; } };

    /* ---------- Posição do botão no rastreamento ----------
       Os botões dos aparelhos levam a mesma posição ("aparelhos"): o tipo de aparelho é tratamento de interesse e
       não vai para as plataformas de anúncio (regra de privacidade do projeto). A mensagem do WhatsApp continua
       citando o aparelho, porque ela é conversa direta com o consultório. */
    const posicaoRastreio = origem => origem.startsWith("aparelho_") ? "aparelhos" : origem;

    /* ---------- Telefone: máscara e validação (DDD + fixo ou celular) ---------- */
    const digitos = valor => valor.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
    function formatarTelefone(valor) {
        const d = digitos(valor);
        if (d.length <= 2) return d.length ? `(${d}` : "";
        if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
        if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
        return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }
    function telefoneValido(valor) {
        const d = digitos(valor);
        if (d.length !== 10 && d.length !== 11) return false;
        if (+d.slice(0, 2) < 11 || d[2] === "0") return false;
        return d.length === 10 || d[2] === "9";
    }

    /* Conversões otimizadas do Google Ads: o telefone vai só embaralhado (SHA-256 do formato +55DDDNÚMERO),
       calculado enquanto a pessoa digita para já estar pronto no envio. O GTM só usa com consentimento de marketing. */
    let hashTelefone = "";
    let telefoneDoHash = "";
    const e164 = valor => telefoneValido(valor) ? `+55${digitos(valor)}` : "";
    function calcularHash() {
        const tel = e164(campos.whatsapp.value);
        if (!tel || tel === telefoneDoHash || !(window.crypto && crypto.subtle)) return;
        crypto.subtle.digest("SHA-256", new TextEncoder().encode(tel)).then(buffer => {
            hashTelefone = [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
            telefoneDoHash = tel;
        }).catch(() => { });
    }
    campos.whatsapp.addEventListener("input", () => {
        campos.whatsapp.value = formatarTelefone(campos.whatsapp.value);
        calcularHash();
    });

    /* ---------- Validação ---------- */
    const usaConvenio = () => valorDe("convenio") === "sim";
    const regras = {
        paciente: () => Boolean(valorDe("paciente")),
        convenio: () => Boolean(valorDe("convenio")),
        // "Qual convênio?" só vale quando aparece na tela (com "Sim")
        operadora: () => !usaConvenio() || Boolean(valorDe("operadora")),
        nome: () => campos.nome.value.trim().length >= 2,
        whatsapp: () => telefoneValido(campos.whatsapp.value)
    };
    const erroDe = nome => document.getElementById(`lead-${nome}-erro`);

    function marcarErro(nome, mostrar) {
        const campo = campos[nome];
        const erro = erroDe(nome);
        campo.classList.toggle("invalido", mostrar);
        // A mensagem só fica ligada ao campo enquanto há erro (senão o leitor de tela a anunciaria sempre)
        if (mostrar) campo.setAttribute("aria-describedby", erro.id);
        else campo.removeAttribute("aria-describedby");
        if (campo.tagName === "INPUT") campo.setAttribute("aria-invalid", String(mostrar));
        erro.hidden = !mostrar;
    }

    Object.keys(campos).forEach(nome => {
        const alvo = campos[nome];
        const reconferir = () => { if (alvo.classList.contains("invalido")) marcarErro(nome, !regras[nome]()); };
        alvo.addEventListener("input", reconferir);
        alvo.addEventListener("change", reconferir);
        if (alvo.tagName === "INPUT") alvo.addEventListener("blur", () => { if (alvo.value) marcarErro(nome, !regras[nome]()); });
    });

    /* "Qual convênio?" aparece quando a pessoa marca "Sim". Ao esconder, a escolha e o erro são limpos,
       para nada antigo ir para a mensagem. A lista são os convênios atendidos (Amil, SulAmérica, Porto Seguro e Petrobras);
       para mudar as opções, mexa no #lead-operadora do index.html. */
    function atualizarConvenio() {
        const mostrar = usaConvenio();
        if (!mostrar) {
            form.querySelectorAll('input[name="operadora"]').forEach(r => { r.checked = false; });
            marcarErro("operadora", false);
        }
        campos.operadora.hidden = !mostrar;
    }
    form.addEventListener("change", evento => { if (evento.target.name === "convenio") atualizarConvenio(); });

    // Início do formulário: primeira alteração em qualquer campo, uma vez por abertura
    let origemBotao = "sem_posicao";
    let comecou = false;
    form.addEventListener("input", () => { if (!comecou) { comecou = true; track("form_start", { form_id: "whatsapp_lead", cta_position: posicaoRastreio(origemBotao) }); } });
    form.addEventListener("change", () => { if (!comecou) { comecou = true; track("form_start", { form_id: "whatsapp_lead", cta_position: posicaoRastreio(origemBotao) }); } });

    /* ---------- Abrir e fechar ---------- */
    let quemAbriu = null;
    const focaveis = () => [...janela.querySelectorAll("button, input, a[href]")].filter(el => !el.disabled && el.offsetParent !== null);

    function mostrarPasso(feito) {
        passo.hidden = feito;
        sucesso.hidden = !feito;
        janela.setAttribute("aria-labelledby", feito ? "lead-sucesso-titulo" : "lead-titulo");
        if (feito) janela.removeAttribute("aria-describedby");
        else janela.setAttribute("aria-describedby", "lead-intro");
    }

    function abrir(botao) {
        quemAbriu = botao;
        origemBotao = botao.dataset.waOrigin || "sem_posicao";
        comecou = false;
        atualizarConvenio();
        mostrarPasso(false);
        modal.hidden = false;
        document.body.classList.add("lead-aberto");
        requestAnimationFrame(() => modal.classList.add("aberto"));
        track("form_open", { form_id: "whatsapp_lead", cta_position: posicaoRastreio(origemBotao) });
        setTimeout(() => form.querySelector('input[name="paciente"]').focus({ preventScroll: true }), 60);
    }

    function fechar() {
        modal.classList.remove("aberto");
        document.body.classList.remove("lead-aberto");
        modal.hidden = true;
        if (quemAbriu && document.contains(quemAbriu)) quemAbriu.focus({ preventScroll: true });
    }

    document.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-wa]");
        if (!botao || modal.contains(botao)) return;
        evento.preventDefault();
        abrir(botao);
    });
    modal.querySelectorAll("[data-lead-fechar]").forEach(el => el.addEventListener("click", fechar));

    document.addEventListener("keydown", evento => {
        if (modal.hidden) return;
        if (evento.key === "Escape") fechar();
        if (evento.key === "Tab") {
            const itens = focaveis();
            const primeiro = itens[0];
            const ultimo = itens[itens.length - 1];
            if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo.focus(); }
            else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro.focus(); }
        }
    });

    /* ---------- Envio: valida, registra e segue para o WhatsApp ---------- */
    form.addEventListener("submit", evento => {
        evento.preventDefault();
        const invalidos = Object.keys(regras).filter(nome => !regras[nome]());
        Object.keys(regras).forEach(nome => marcarErro(nome, invalidos.includes(nome)));
        if (invalidos.length) {
            const primeiro = campos[invalidos[0]];
            (primeiro.tagName === "FIELDSET" ? primeiro.querySelector("input") : primeiro).focus();
            track("form_error", { form_id: "whatsapp_lead", error_fields: invalidos.join(",") });
            return;
        }

        const respostas = {
            nome: campos.nome.value.trim().replace(/\s+/g, " "),
            whatsapp: formatarTelefone(campos.whatsapp.value),
            paciente: valorDe("paciente"),
            convenio: valorDe("convenio")
        };
        // Qual convênio: vai SÓ na mensagem do WhatsApp (conversa direta com o consultório), nunca para o rastreamento.
        const textoConvenio = usaConvenio() ? `Sim, ${valorDe("operadora")}` : textoDaEscolha("convenio");
        const wa = window.nmWhats || {};
        const mensagem = [
            wa.mensagem ? wa.mensagem(origemBotao) : "Olá! Vim pelo site e quero agendar uma avaliação de ortodontia com a Dra. Nayane Moreno.",
            "",
            `*Nome:* ${respostas.nome}`,
            `*WhatsApp:* ${respostas.whatsapp}`,
            `*Quem vai usar o aparelho:* ${textoDaEscolha("paciente")}`,
            `*Convênio:* ${textoConvenio}`
        ].join("\n");
        const origem = origemDaVisita();
        const numero = wa.numero || (document.querySelector('meta[name="whatsapp-number"]')?.content || "").replace(/\D/g, "");
        const base = LINKS_POR_ORIGEM[origem] || (numero ? `https://wa.me/${numero}` : "https://wa.me/");
        const url = `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(mensagem)}`;

        // Rastreamento: só as respostas de múltipla escolha (perfil e convênio não são dado de saúde).
        // O nome nunca vai; o telefone só embaralhado, e é apagado do dataLayer logo depois.
        const lead = {
            form_id: "whatsapp_lead",
            cta_position: posicaoRastreio(origemBotao),
            perfil_paciente: respostas.paciente,
            convenio: respostas.convenio,
            visit_origin: origem
        };
        if (hashTelefone && telefoneDoHash === e164(campos.whatsapp.value)) lead.ec_phone_sha256 = hashTelefone;
        track("generate_lead", lead);
        if (lead.ec_phone_sha256) (window.dataLayer = window.dataLayer || []).push({ ec_phone_sha256: undefined });
        track("click_whatsapp", { cta_position: posicaoRastreio(origemBotao), link_url: base });

        const aba = window.open(url, "_blank");
        if (aba) aba.opener = null;
        else window.location.href = url; // o navegador bloqueou a nova aba: abre na mesma
        form.reset();
        atualizarConvenio();   // esconde de novo as perguntas do convênio
        hashTelefone = telefoneDoHash = "";
        Object.keys(campos).forEach(nome => marcarErro(nome, false));

        // Confirmação no lugar do formulário, com o link caso o WhatsApp não tenha aberto
        document.getElementById("lead-sucesso-nome").textContent = `, ${respostas.nome.split(" ")[0]}`;
        document.getElementById("lead-sucesso-link").href = url;
        mostrarPasso(true);
        janela.scrollTop = 0;
        document.getElementById("lead-sucesso-titulo").focus({ preventScroll: true });
    });
})();
