// Gera a imagem do cartão de compartilhamento (a que aparece quando alguém manda o link no WhatsApp).
//
// Uso, na raiz do repositório:
//   node ferramentas/gerar-cartao.js          -> cartão 1200 x 630 com a foto da Dra. (o que está no ar)
//   node ferramentas/gerar-cartao.js logo     -> cartão QUADRADO com a logomarca (versão guardada)
//
// Salva em assets/compartilhar/ com a data do dia no nome. Depois:
//   1. converta para JPG (menor e aceito por todas as redes);
//   2. troque o endereço nas meta tags og:image e twitter:image do index.html, e a altura em og:image:height.
// O nome do arquivo precisa mudar a cada versão: o WhatsApp guarda a prévia antiga por muito tempo.
const { chromium } = require("playwright");
const path = require("path");

// Cada modelo tem o seu tamanho. O de 1200 × 630 é o formato clássico do Facebook e do LinkedIn;
// o quadrado aparece maior na conversa do WhatsApp.
const MODELOS = {
    foto: { arquivo: "cartao-compartilhar.html", largura: 1200, altura: 630 },
    logo: { arquivo: "cartao-compartilhar-logo.html", largura: 1200, altura: 1200 },
};

(async () => {
    const escolha = (process.argv[2] || "foto").toLowerCase();
    const modelo = MODELOS[escolha];
    if (!modelo) {
        console.error(`Modelo desconhecido: "${escolha}". Use "foto" ou "logo".`);
        process.exit(1);
    }

    const raiz = path.resolve(__dirname, "..");
    const hoje = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const saida = path.join(raiz, "assets", "compartilhar", `compartilhar-${hoje}-${escolha}.png`);

    const navegador = await chromium.launch();
    const pagina = await navegador.newPage({
        viewport: { width: modelo.largura, height: modelo.altura },
        deviceScaleFactor: 1, // 1 para a imagem sair no tamanho exato em pixels
    });
    await pagina.goto("file://" + path.join(__dirname, modelo.arquivo));
    await pagina.evaluate(async () => { await document.fonts.ready; }); // espera a Montserrat carregar
    await pagina.waitForTimeout(1500);
    await pagina.screenshot({ path: saida });
    await navegador.close();

    console.log(`Cartão "${escolha}" (${modelo.largura} x ${modelo.altura}) gerado em ${saida}`);
    console.log("Converta para JPG e atualize as meta tags og:image do index.html.");
})();
