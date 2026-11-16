// Builds site-src/ into site/index.html (CSS inlined and minified) plus one
// content-hashed site/app.<hash>.js, imported after the load event so the
// HTML alone fits in the first round trip.
// Run: npm run build:site
import { build } from 'esbuild'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const src = dirname(fileURLToPath(import.meta.url))
const outDir = join(src, '..', 'site')
const out = join(outDir, 'index.html')

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

const hash = createHash('sha256').update(js).digest('hex').slice(0, 8)
const scriptName = `app.${hash}.js`

const replaceOnce = (text, needle, replacement) => {
  if (!text.includes(needle)) throw new Error(`build: "${needle}" not found in index.html`)
  return text.replace(needle, () => replacement)
}

// strip HTML comments and collapse indentation (before inlining, so CSS is untouched)
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
  // one retry under a new URL, since browsers remember a failed module fetch per specifier
  `<script>addEventListener("load",()=>setTimeout(()=>{const u="./${scriptName}";import(u).catch(()=>import(u+"?r"))},0),{once:true})</script>`,
)

await writeFile(join(outDir, scriptName), js + '\n')
await writeFile(out, result + '\n')

// drop bundles from earlier builds, only once the new files are in place
for (const name of await readdir(outDir)) {
  if (name !== scriptName && /^app\.[0-9a-f]{8}\.js$/.test(name)) await rm(join(outDir, name))
}

const kb = (text) => `${(Buffer.byteLength(text) / 1024).toFixed(1)} KB`
console.log(`site/index.html: ${kb(result)}`)
console.log(`site/${scriptName}: ${kb(js)}`)
