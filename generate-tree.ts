import fs from "fs";
import path from "path";
// npx tsx generate-tree.ts

// Folders or files to ignore
const IGNORE_LIST: string[] = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "cert.pem",
  "key.pem",
  ".save-codes",
];

function generateTree(dirPath: string, prefix: string = ""): string {
  let result = "";

  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const filteredItems = items.filter(
      (item) => !IGNORE_LIST.includes(item.name),
    );

    filteredItems.forEach((item, index) => {
      const isLast = index === filteredItems.length - 1;
      const pointer = isLast ? "└── " : "├── ";
      const currentPrefix = isLast ? "    " : "│   ";

      if (item.isDirectory()) {
        result += `${prefix}${pointer}${item.name}/\n`;
        result += generateTree(
          path.join(dirPath, item.name),
          prefix + currentPrefix,
        );
      } else {
        result += `${prefix}${pointer}${item.name}\n`;
      }
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`Error reading the folder ${dirPath}:`, errorMessage);
  }

  return result;
}

const projectRoot: string = process.cwd();
const rootName: string = path.basename(projectRoot);

console.log(`\nProject structure for: ${rootName}/\n`);
const treeStructure: string = `${rootName}/\n` + generateTree(projectRoot);

console.log(treeStructure);

fs.writeFileSync("project-structure.txt", treeStructure, "utf8");
console.log(
  "✅ Project structure successfully saved to the file: project-structure.txt\n",
);
