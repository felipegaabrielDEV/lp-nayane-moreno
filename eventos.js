/* ==========================================================================
   Eventos da página para o Google Tag Manager (dataLayer)
   O site só AVISA o que aconteceu. Quem decide o que vai para GA4, Meta Pixel
   e Clarity é o painel do GTM, sempre respeitando o aviso de cookies
   (consent.js). Passo a passo para o gestor de tráfego: docs/gtm-passo-a-passo.md.

   Cada evento leva um event_id único, para as plataformas não contarem a mesma
   ação duas vezes (e para deduplicar com a Conversions API da Meta, se ativada).

   Eventos do formulário (lead-form.js): form_open, form_start, form_error,
   generate_lead e click_whatsapp. Aqui: section_view (seção-chave vista).
   Nunca entra no dataLayer: nome, telefone em texto aberto, sintoma, queixa
   ou tipo de aparelho de interesse.
   ========================================================================== */
(function () {
    "use strict";
    const dataLayer = window.dataLayer = window.dataLayer || [];

    const uuid = () => (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
        });

    window.nayaneTrack = (evento, params = {}) => {
        const eventId = uuid();
        dataLayer.push({ event: evento, event_id: eventId, ...params });
        return eventId;
    };

    /* Seção vista: metade da seção (ou metade da tela, se a seção for maior que a tela) visível por 1 segundo.
       Uma vez por seção a cada visita. Para medir outra seção, acrescente aqui o seletor e o nome. */
    const secoes = [
        { seletor: "#aparelhos", nome: "aparelhos" },
        { seletor: "#evolucao", nome: "evolucao_caso" },
        { seletor: "#convenios", nome: "convenios" },
        { seletor: "#sobre", nome: "sobre" },
        { seletor: "#avaliacoes", nome: "avaliacoes" },
        { seletor: "#duvidas", nome: "duvidas" }
    ];
    if (!("IntersectionObserver" in window)) return;

    secoes.forEach(({ seletor, nome }) => {
        const el = document.querySelector(seletor);
        if (!el) return;
        let timer = null;
        const obs = new IntersectionObserver(entradas => entradas.forEach(en => {
            const base = Math.min(en.boundingClientRect.height, window.innerHeight) || 1;
            const visivel = en.isIntersecting && en.intersectionRect.height / base >= .5;
            if (visivel && !timer) {
                timer = setTimeout(() => { obs.disconnect(); window.nayaneTrack("section_view", { section_name: nome }); }, 1000);
            } else if (!visivel && timer) {
                clearTimeout(timer);
                timer = null;
            }
        }), { threshold: [0, .25, .5, .75, 1] });
        obs.observe(el);
    });
})();
