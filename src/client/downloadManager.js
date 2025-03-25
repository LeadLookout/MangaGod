// ...existing code...

class DownloadManager {
    constructor() {
        this.downloads = new Map();
    }

    startDownload(id, url) {
        const controller = new AbortController();
        const signal = controller.signal;

        this.downloads.set(id, { controller, url });

        fetch(url, { signal })
            .then(response => response.blob())
            .then(blob => {
                // Save the blob to local storage or IndexedDB
                console.log(`Download ${id} completed.`);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log(`Download ${id} canceled.`);
                } else {
                    console.error(`Download ${id} failed:`, err);
                }
            });
    }

    pauseDownload(id) {
        const download = this.downloads.get(id);
        if (download) {
            download.controller.abort();
            console.log(`Download ${id} paused.`);
        }
    }

    resumeDownload(id) {
        const download = this.downloads.get(id);
        if (download) {
            console.log(`Resuming download ${id}...`);
            this.startDownload(id, download.url);
        }
    }
}

// Export the class for use in the app
module.exports = { DownloadManager };
