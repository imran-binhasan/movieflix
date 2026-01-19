export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    APIKEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    }
}

export const getMovieLists = async ({ query }: { query: string }) => {

    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${(encodeURIComponent(query))}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch movie lists', response.statusText);
    }

    const data = await response.json();
    console.log('Movie Lists:', data);
    return data.results;
}

export const getMovieDetail = async (id: string) => {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if (!response.ok) {
        //@ts-ignore
        throw new Error('Failed to fetch movie details', response.statusText);
    }

    const data = await response.json();
    return data;
}