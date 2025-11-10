var editor;

// Fetch and display GitHub version information
async function fetchGitHubVersion() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/TheWooffles/Moncao/commits/main"
    );
    const data = await response.json();
    const shortHash = data.sha.substring(0, 7);
    const date = new Date(data.commit.author.date).toLocaleDateString();
    const message = data.commit.message;
    const versionBar = document.getElementById("version-bar");
    versionBar.textContent = `Version: ${shortHash} (${date}) — ${message}`;
  } catch (error) {
    console.error("Error fetching version:", error);
    const versionBar = document.getElementById("version-bar");
    versionBar.textContent = "Version information unavailable";
  }
}

// Fetch version when page loads
fetchGitHubVersion();

// Initialize Monaco
window.onload = function () {
  // Load tab manager
  let script = document.createElement("script");
  script.src = "tabs.js";
  document.body.appendChild(script);

  monaco.languages.registerCompletionItemProvider("lua", {
    provideCompletionItems: (model, position, context, token) => {
      const suggestions = [
        {
          label: "local",
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: "Lua/Luau keyword",
          insertText: "local",
        },
        {
          label: "game",
          kind: monaco.languages.CompletionItemKind.Variable,
          documentation:
            "The root DataModel object, representing the entire game.",
          insertText: "game",
        },
        {
          label: "script",
          kind: monaco.languages.CompletionItemKind.Variable,
          documentation: "The currently running Script or ModuleScript.",
          insertText: "script",
        },
      ];
      return { suggestions: suggestions };
    },
  });

  editor = monaco.editor.create(document.getElementById("container"), {
    language: "lua",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: true },
    smoothScrolling: true,
    links: true,
    dragAndDrop: true,
    showFoldingControls: "always",
  });

  // Create initial tab after editor is initialized
  script.onload = () => {
    tabManager.createTab("entropy.lua", "-- // Entropy");
  };
};

function setValue(value) {
  editor.setValue(value);
}

function clearValue() {
  editor.setValue("");
}

function getValue() {
  return editor.getValue();
}

function setLanguage(language) {
  monaco.editor.setModelLanguage(editor.getModel(), language);
}

function setTheme(theme) {
  monaco.editor.setTheme(theme);
}

function saveAsFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
    const filename = prompt("File Name:", "Content.txt");
    if (filename === null) {
      console.log("Save Prompt Canceled!");
    } else if (filename === "") {
      alert("Enter A Valid File Name!");
    } else {
      const content = getValue();
      saveAsFile(filename, content);
    }
  }
});
