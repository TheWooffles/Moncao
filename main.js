var editor;

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

function getValue() {
  return editor.getValue();
}

function setLanguage(language) {
  monaco.editor.setModelLanguage(editor.getModel(), language);
}

function setTheme(theme) {
  monaco.editor.setTheme(theme);
}
