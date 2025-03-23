const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function isTextFile(filePath) {
  const textExtensions = ['.txt', '.md', '.js', '.ts', '.cs', '.py', '.json', '.html', '.css', '.xml', '.yaml', '.yml', '.csv', '.log', '.sql', '.sh', '.bash', '.bat', '.ini', '.properties', '.txt', '.bicep', '.ps1', '.psm1', '.psd1', '.pssc', '.tf', '.tfstate', '.tfvars', '.dockerfile', '.dockerignore', '.gitignore', '.npmignore', '.env', '.env.example', '.env.local', '.env.development', '.env.production', '.env.test', '.env.staging', '.env.production.local', '.env.development.local', '.env.test.local', '.env.staging.local', '.env.example.local', '.env.example.development', '.env.example.production', '.env.example.test', '.env.example.staging', '.env.example.production.local', '.env.example.development.local', '.env.example.test.local', '.env.example.staging.local', '.c', '.cpp', '.h', '.hpp', '.java', '.swift', '.go', '.php', '.rb', '.pl', '.lua', '.r', '.dart', '.kotlin', '.scala', '.groovy', '.clj', '.cljs', '.elixir', '.erlang', '.coffee', '.less', '.scss', '.sass'];
  return textExtensions.includes(path.extname(filePath).toLowerCase());
}

function buildMarkdownFromFolder(folderPath, baseDepth = 0) {
  let output = '';

  function walk(currentPath, depth) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(folderPath, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
      } else if (entry.isFile() && isTextFile(fullPath)) {
        const heading = '#'.repeat(depth + 1);
        const content = fs.readFileSync(fullPath, 'utf8');
        output += `${heading} ${relativePath}\n\n${content}\n\n`;
      }
    }
  }

  walk(folderPath, baseDepth);
  return output;
}

function buildMarkdownFromFile(filePath) {
  const filename = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  return `# ${filename}\n\n${content}\n\n`;
}

function activate(context) {
  console.log("✅ Markdown Folder Clip extension activated");

  let disposable = vscode.commands.registerCommand('extension.copyFolderAsMarkdown', async (uri) => {
    if (!uri || !uri.fsPath) return;

    const filePath = uri.fsPath;
    console.log("📁 Right-click command triggered on:", filePath);

    try {
      let markdown;
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        markdown = buildMarkdownFromFolder(filePath);
      } else if (stats.isFile()) {
        if (!isTextFile(filePath)) {
          console.log("⛔ Skipped non-text file:", filePath);
          return; // silently skip
        }
        markdown = buildMarkdownFromFile(filePath);
      }

      if (markdown) {
        await vscode.env.clipboard.writeText(markdown);
        console.log("📋 Markdown copied to clipboard!");
        vscode.window.showInformationMessage('Markdown copied to clipboard!');
      }

    } catch (err) {
      console.error("🔥 Error:", err);
      vscode.window.showErrorMessage(`Error: ${err.message}`);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
