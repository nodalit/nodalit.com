// Builds site-src/ into a single self-contained site/index.html
// (CSS + JS inlined and minified) so the page loads in one request.
// Run: npm run build:site
import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const src = dirname(fileURLToPath(import.meta.url))
const out = join(src, '..', 'site', 'index.html')

const bundle = async (entry) => {
  const res = await build({
    entryPoints: [join(src, entry)],
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'es2020',
    write: false,
  })
  return res.outputFiles[0].text.trim()
}

const [html, css, js] = await Promise.all([
  readFile(join(src, 'index.html'), 'utf8'),
  bundle('css/style.css'),
  bundle('js/app.js'),
])

const replaceOnce = (text, needle, replacement) => {
  if (!text.includes(needle)) throw new Error(`build: "${needle}" not found in index.html`)
  return text.replace(needle, () => replacement)
}

// strip HTML comments and collapse indentation (before inlining, so CSS/JS are untouched)
const slimHtml = html
  .replace(/<!--[\s\S]*?-->/g, '')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .join('\n')

let result = replaceOnce(slimHtml, '<link rel="stylesheet" href="css/style.css">', `<style>${css}</style>`)
result = replaceOnce(
  result,
  '<script type="module" src="js/app.js"></script>',
  `<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`,
)

await writeFile(out, result + '\n')
console.log(`site/index.html: ${(Buffer.byteLength(result) / 1024).toFixed(1)} KB`)
