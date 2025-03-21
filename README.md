# Markdown Folder Clip

**Right-click any folder in the VS Code Explorer to copy all readable text files as Markdown.**  
Each file is represented with a heading (using `#`) and its contents underneath. Folder hierarchy is reflected using heading levels.

---

## ✨ Features

- Recursively scans all text-based files under a selected folder.
- Builds a single Markdown document with headings for each file.
- Uses `#`, `##`, `###`, etc. based on folder depth.
- Automatically copies the result to your clipboard.

---

## 📂 Example

Given:

src/ 
├── Main.cs 
└── util/ 
└── StringCopy.cs


Clipboard contents after using the command:

```markdown
# src/Main.cs

<contents of Main.cs>

## src/util/StringCopy.cs

<contents of StringCopy.cs>

📦 Supported Extensions
Files with the following extensions will be included:

.txt, .md, .js, .ts, .cs, .py, .json, .html, .css, .xml

🚀 How to Use
1. Right-click a folder in the VS Code Explorer.
2. Select "Copy Folder as Markdown".
3. Paste the result wherever you want—like in an email, Notion, or documentation.

🛠 Development
1. Clone or unzip this extension.
2. Run npm install.
3. Open in VS Code and press F5 to launch a Development Host.
4. Right-click a folder and test it out.

📋 License
MIT License

## Legal

Use of this extension is subject to the terms and conditions in [TERMS_OF_USE.txt](./TERMS_OF_USE.txt).
This plugin may collect basic anonymized telemetry. See [PRIVACY.md](./PRIVACY.md) for details.
