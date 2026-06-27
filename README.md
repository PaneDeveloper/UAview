# 🔍 UA Viewer Pro

Identificador de User Agent completo, em **um único arquivo HTML** — sem build, sem dependências de npm, sem servidor obrigatório. Detecta navegador, sistema operacional, engine de renderização, arquitetura, tipo de dispositivo e várias infos extras de hardware/sistema, com histórico, comparador e exportação via QR Code.

Funciona como app comum **ou como PWA instalável** (tem `manifest.json` + `service-worker.js` inclusos).

---

## ✨ Funcionalidades

- **Análise sob demanda** — nada roda automaticamente; o usuário clica em "Analisar Meu Dispositivo"
- **Detecção detalhada**:
  - Navegador + versão (Chrome, Firefox, Edge, Safari, Opera)
  - Sistema operacional (Windows 7 até 11, macOS, Linux, Android, iOS)
  - Engine de renderização (Blink, Gecko, WebKit, Trident)
  - Arquitetura (32-bit / 64-bit)
  - Tipo de dispositivo, com ícone próprio: 💻 PC, 📱 Celular, 📺 TV, ⌚ SmartWatch, 📱 Tablet
- **Resumo expansível (accordion)** com infos extras:
  - Resolução de tela, profundidade de cor, pixel ratio
  - RAM aproximada e núcleos de CPU (quando o navegador expõe)
  - Idioma do sistema, suporte a toque, status online/offline, cookies
  - Links de referência para a Wikipedia (navegador, SO, engine)
- **Histórico local** (via `localStorage`, até 50 entradas) com modal de confirmação animado antes de limpar
- **Comparador** — cola um User Agent de outro dispositivo e compara lado a lado com o atual
- **QR Code** (em celulares/tablets) — gera um QR com o UA puro e outro com o JSON completo, pra escanear em outro aparelho
- **Tema claro/escuro** — segue a preferência do sistema, com botão pra alternar manualmente; **TVs entram em modo escuro por padrão**
- **Ícones Material Icons** do Google Fonts em toda a interface
- **Acessível** — `aria-label`, `role`, `aria-live` e `aria-hidden` aplicados nos elementos certos pra leitores de tela
- **i18n básico** — interface em PT-BR ou EN, detectado pelo idioma do navegador

---

## 📦 Estrutura do projeto

```
ua-viewer-pwa/
├── index.html            # App completo (HTML + CSS + JS em um arquivo só)
├── manifest.json         # Metadados do PWA (nome, cores, ícones)
├── service-worker.js     # Cache básico (app shell offline; QR/Wikipedia sempre online)
└── icons/                # Ícones em 9 tamanhos + versão maskable + favicon
```

---

## 🚀 Como usar

### Direto no navegador
Basta abrir o `index.html`. Não precisa de servidor pra usar as funcionalidades básicas.

### Como PWA (instalável)
PWA exige `localhost` ou HTTPS — não funciona abrindo o arquivo direto (`file://`). Para testar localmente:

```bash
cd ua-viewer-pwa
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080` e use a opção **"Adicionar à tela inicial"** / **"Instalar app"** do navegador.

---

## 🛠️ Stack

- **Zero dependências de build** — HTML, CSS e JS puro
- [Material Icons](https://fonts.google.com/icons) (Google Fonts, via CDN)
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) (via cdnjs, só carregado quando necessário)
- `localStorage` para histórico (sem backend)

---

## ⚠️ Limitações conhecidas

- `navigator.deviceMemory` e `navigator.hardwareConcurrency` não são suportados em todos os navegadores (ex: Firefox e Safari restringem por privacidade) — nesses casos o app mostra "Não informado pelo navegador"
- A detecção de SO/navegador é baseada em string do User Agent, que pode ser falsificada ou ficar desatualizada conforme navegadores mudam seu formato
- QR Code e links da Wikipedia exigem conexão com a internet (não fazem parte do cache offline do PWA, de propósito)

---

## 📝 Licença


O Projeto usa a Licença MIT, como descrito no arquivo LICENSE.md
