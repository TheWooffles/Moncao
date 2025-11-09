import os
import requests
from urllib.parse import urljoin
import json

def download_file(url, local_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Downloaded: {local_path}")
    else:
        print(f"Failed to download: {url}")

def download_monaco():
    base_url = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.53.0/min/vs/"
    local_base = "vs"
    
    # Core files we know exist
    core_files = [
        "loader.js",
        "editor/editor.main.js",
        "editor/editor.main.css",
        "editor/editor.main.nls.js",
        "base/worker/workerMain.js",
        "basic-languages/lua/lua.js",
    ]

    # Create the vs directory
    os.makedirs(local_base, exist_ok=True)

    # Download known core files
    for file_path in core_files:
        url = urljoin(base_url, file_path)
        local_path = os.path.join(local_base, file_path)
        download_file(url, local_path)

if __name__ == "__main__":
    download_monaco()