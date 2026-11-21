// Gera a imagem do cartão de compartilhamento a partir de ferramentas/cartao-compartilhar.html.
// Uso, na raiz do repositório:  node ferramentas/gerar-cartao.js
// Salva em assets/compartilhar/ com a data do dia no nome. Depois, troque o endereço nas meta tags og:image
// e twitter:image do index.html (o WhatsApp guarda a prévia antiga por muito tempo).
const { chromium } = require("playwright");
const path = require("path");

(async () => {
    const raiz = path.resolve(__dirname, "..");
    const hoje = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const saida = path.join(raiz, "assets", "compartilhar", `compartilhar-${hoje}.png`);

    const navegador = await chromium.launch();
    // 1200 × 630 px é o tamanho que o WhatsApp, o Facebook e o LinkedIn esperam.
    const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await pagina.goto("file://" + path.join(__dirname, "cartao-compartilhar.html"));
    await pagina.evaluate(async () => { await document.fonts.ready; }); // espera a Montserrat carregar
    await pagina.waitForTimeout(1500);
    await pagina.screenshot({ path: saida });
    await navegador.close();

    console.log("Cartão gerado em " + saida);
    console.log("Converta para JPG (menor e aceito por todas as redes) antes de publicar.");
})();
