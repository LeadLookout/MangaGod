// ...existing code...

async function fetchMangaPages(mangaId, page = 1, limit = 10, lastUpdated = null) {
    const cacheKey = `manga-${mangaId}-page-${page}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    try {
        const url = new URL(`/api/manga/${mangaId}`, window.location.origin);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        if (lastUpdated) {
            url.searchParams.append('lastUpdated', lastUpdated);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching manga pages:', error);
        throw error;
    }
}

// Export the function for use in the app
module.exports = { fetchMangaPages };
