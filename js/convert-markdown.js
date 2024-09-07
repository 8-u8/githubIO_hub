const fs = require('fs-extra');
const { marked } = require('marked');
const path = require('path');

// プロジェクトのルートディレクトリを指定
const rootDir = path.join(__dirname, '..');

const contentDir = path.join(rootDir, 'content');
const outputDir = path.join(rootDir, 'generated');

async function convertMarkdownToHtml() {
  await fs.ensureDir(outputDir);

  const files = await fs.readdir(contentDir);

  for (const file of files) {
    if (path.extname(file) === '.md') {
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const html = marked.parse(content); // ここを変更

      const outputPath = path.join(outputDir, `${path.basename(file, '.md')}.html`);
      await fs.writeFile(outputPath, html);

      console.log(`Converted ${file} to HTML`);
    }
  }
}

convertMarkdownToHtml().catch(console.error);