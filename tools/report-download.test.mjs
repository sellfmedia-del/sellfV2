import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const source = fs.readFileSync(new URL('./report-download.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText
const compiledModule = {exports: {}}
new Function('exports', 'module', compiled)(compiledModule.exports, compiledModule)
const {createReportHtml, escapeHtml, reportFileName} = compiledModule.exports

test('HTML output escapes user supplied content', () => {
  const html = createReportHtml({tool: 'sellf-route', language: 'tr', title: '<Rota>', input: {note: '<script>alert(1)</script>'}, result: {ok: true}}, {fullName: 'Test <User>', companyName: 'A&B'})
  assert.doesNotMatch(html, /<script>alert/)
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/)
  assert.match(html, /A&amp;B/)
  assert.equal(escapeHtml('"<&'), '&quot;&lt;&amp;')
})

test('report filename is normalized and bounded', () => {
  assert.equal(reportFileName('growth-simulator', 'Şirket & Ürün A.Ş.'), 'sellf-growth-simulator-sirket-urun-a-s.html')
  assert.ok(reportFileName('report-audit', 'x'.repeat(100)).length < 90)
})
