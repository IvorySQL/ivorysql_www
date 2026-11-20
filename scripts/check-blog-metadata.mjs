import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const authors = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/authors.json'), 'utf8'));
function moduleUrl(source) {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2017 },
  });
  return 'data:text/javascript;base64,' + Buffer.from(outputText).toString('base64');
}
const readingUrl = moduleUrl(fs.readFileSync(path.join(root, 'src/lib/reading-time.ts'), 'utf8'));
const { generateReadingTime } = await import(readingUrl);
const { resolveAuthor } = await import(moduleUrl(
  fs.readFileSync(path.join(root, 'src/lib/authors.ts'), 'utf8')
    .replace(/import authorsData from [^;]+;/, 'const authorsData = ' + JSON.stringify(authors) + ';'),
));
const { getSortedPosts, getPostdata } = await import(moduleUrl(
  fs.readFileSync(path.join(root, 'src/lib/posts.ts'), 'utf8')
    .replace('"./reading-time"', JSON.stringify(readingUrl))
    .replace('"gray-matter"', JSON.stringify(import.meta.resolve('gray-matter'))),
));
let failed = 0;
function check(name, action) {
  try {
    action();
    console.log('PASS', name);
  } catch (error) {
    failed++;
    console.error('FAIL', name, error.message);
  }
}
check('Chinese author uses Chinese display name', () => assert.equal(resolveAuthor('付超', 'zh').author, '付超'));
check('English author uses English display name', () => assert.equal(resolveAuthor('付超', 'en').author, 'Fu Chao'));
check('English alias also resolves in Chinese', () => assert.equal(resolveAuthor('Fu Chao', 'zh').author, '付超'));
check('Approved nickname is preserved', () => assert.equal(resolveAuthor('qqtq', 'zh').author, 'qqtq'));
check('Unknown authors remain visible', () => assert.equal(resolveAuthor('Guest Writer', 'en').author, 'Guest Writer'));
check('Chinese prose baseline', () => assert.equal(generateReadingTime('字'.repeat(800), 'zh'), '2 分钟阅读'));
check('English prose baseline', () => assert.equal(generateReadingTime('word '.repeat(400), 'en'), '2 min read'));
check('Code and terminal output do not inflate the estimate', () => assert.equal(generateReadingTime('字'.repeat(800) + '\n\n```sql\n' + 'SELECT very_long_column_name FROM example_table;\n'.repeat(1000) + '```', 'zh'), '2 分钟阅读'));
check('Tilde fences also exclude terminal output', () => assert.equal(generateReadingTime('word '.repeat(400) + '\n~~~text\n' + 'log entry\n'.repeat(1000) + '~~~', 'en'), '2 min read'));
check('Inline triple backticks preserve surrounding prose', () => assert.equal(generateReadingTime('```compatible_db``` ' + '字'.repeat(800), 'zh'), '3 分钟阅读'));
check('Mixed prose counts English as words', () => assert.equal(generateReadingTime('字'.repeat(400) + ' PostgreSQL '.repeat(200), 'zh'), '2 分钟阅读'));
check('Link destinations and image URLs do not count as prose', () => assert.equal(generateReadingTime('字'.repeat(400) + '\n[](' + 'https://example.com/' + 'x'.repeat(5000) + ')\n![diagram](https://example.com/diagram.png)', 'zh'), '1 分钟阅读'));
check('HTML preformatted logs do not count', () => assert.equal(generateReadingTime('word '.repeat(400) + '<pre>' + 'output line\n'.repeat(1000) + '</pre>', 'en'), '2 min read'));
check('Empty content has a one-minute minimum', () => assert.equal(generateReadingTime('', 'en'), '1 min read'));

for (const locale of ['zh', 'en']) {
  const posts = getSortedPosts(locale);
  check(`${locale}: every list item matches its detail author and reading time`, () => {
    for (const post of posts) {
      const detail = getPostdata(locale, post.slug);
      assert.equal(resolveAuthor(post.author, locale).author, resolveAuthor(detail.author, locale).author, post.slug);
      assert.equal(post.readingTime, detail.readingTime, post.slug);
      assert.ok(authors.some((author) => author.author_id === post.author), `Missing author: ${post.author}`);
    }
  });
  const changes = posts.map((post) => {
    const { content } = getPostdata(locale, post.slug);
    const oldMinutes = locale === 'zh'
      ? Math.max(1, Math.ceil(content.replace(/\s+/g, '').length / 400))
      : Math.ceil(content.trim().split(/\s+/).length / 200);
    return { slug: post.slug, before: oldMinutes, after: post.readingTime };
  });
  console.log(locale, 'largest previous estimates:', changes.sort((a, b) => b.before - a.before).slice(0, 3));
}
if (failed) {
  console.error(`${failed} checks failed`);
  process.exitCode = 1;
}
