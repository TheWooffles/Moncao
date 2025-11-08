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
    const versionBar = document.getElementById("version-bar");
    versionBar.textContent = `Version: ${shortHash} (${date})`;
  } catch (error) {
    console.error("Error fetching version:", error);
    const versionBar = document.getElementById("version-bar");
    versionBar.textContent = "Version information unavailable";
  }
}

// Fetch version when page loads
fetchGitHubVersion();

require(["./vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("container"), {
    value: "",
    language: "lua",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: true },
    smoothScrolling: true,
    links: true,
    dragAndDrop: true,
  });
});

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
