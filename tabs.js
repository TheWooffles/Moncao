class Tab {
  constructor(id, title, model) {
    this.id = id;
    this.title = title;
    this.model = model;
    this.isActive = false;
  }
}

class TabManager {
  constructor() {
    this.tabs = [];
    this.activeTab = null;
    this.tabCounter = 0;
  }

  createTab(title = "Untitled", content = "") {
    const id = `tab-${++this.tabCounter}`;
    const model = monaco.editor.createModel(content, "lua");
    const tab = new Tab(id, title, model);

    this.tabs.push(tab);
    this.renderTabs();
    this.switchToTab(tab);
    return tab;
  }

  closeTab(tabId) {
    const index = this.tabs.findIndex((tab) => tab.id === tabId);
    if (index === -1) return;

    const tab = this.tabs[index];
    tab.model.dispose();
    this.tabs.splice(index, 1);

    if (tab === this.activeTab) {
      this.activeTab = this.tabs[index] || this.tabs[index - 1] || null;
      if (this.activeTab) {
        this.switchToTab(this.activeTab);
      }
    }

    this.renderTabs();
  }

  switchToTab(tab) {
    if (this.activeTab) {
      this.activeTab.isActive = false;
    }
    tab.isActive = true;
    this.activeTab = tab;
    editor.setModel(tab.model);
    this.renderTabs();
  }

  renderTabs() {
    const tabBar = document.getElementById("tab-bar");
    tabBar.innerHTML = "";

    this.tabs.forEach((tab) => {
      const tabElement = document.createElement("div");
      tabElement.className = `tab ${tab.isActive ? "active" : ""}`;
      tabElement.setAttribute("data-tab-id", tab.id);

      const titleSpan = document.createElement("span");
      titleSpan.textContent = tab.title;
      tabElement.appendChild(titleSpan);

      const closeButton = document.createElement("span");
      closeButton.className = "tab-close";
      closeButton.innerHTML = "×";
      closeButton.onclick = (e) => {
        e.stopPropagation();
        this.closeTab(tab.id);
      };
      tabElement.appendChild(closeButton);

      tabElement.onclick = () => this.switchToTab(tab);
      tabBar.appendChild(tabElement);
    });

    // Add new tab button
    const newTabButton = document.createElement("div");
    newTabButton.className = "new-tab-button";
    newTabButton.innerHTML = "+";
    newTabButton.onclick = () => this.createTab();
    tabBar.appendChild(newTabButton);
  }
}

// Initialize tab manager
const tabManager = new TabManager();
