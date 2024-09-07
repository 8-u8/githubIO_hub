const fs = require('fs-extra');
const path = require('path');

// プロジェクトのルートディレクトリを指定
const rootDir = path.join(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
const generatedDir = path.join(rootDir, 'generated');

async function updateIndexHtml() {
  let indexContent = await fs.readFile(indexPath, 'utf-8');

  const files = await fs.readdir(generatedDir);

  for (const file of files) {
    const sectionId = path.basename(file, '.html');
    const sectionContent = await fs.readFile(path.join(generatedDir, file), 'utf-8');

    const sectionRegex = new RegExp(`<section id="${sectionId}" class="content.*?>(.*?)</section>`, 's');
    indexContent = indexContent.replace(sectionRegex, `<section id="${sectionId}" class="content">${sectionContent}</section>`);
  }

  await fs.writeFile(indexPath, indexContent);
  console.log('Updated index.html');
}

updateIndexHtml().catch(console.error);