import { REQUEST_INIT } from './Config.js';
import fetch from 'node-fetch';

const BASE_URL_V3 = 'https://api.themoviedb.org/3';
const API_KEY = 'b1873c6876da5e75d4e8531a13a3c7a2';
const END = 'include_adult=false&api_key=' + API_KEY;
export async function movie(id: number): Promise<any | Error> {
    const url = BASE_URL_V3 + '/movie/' + id + '?language=da-DK&' + END;
    return await fetchUrl(url);
}

export async function providers(id: number): Promise<any | Error> {
    const url = BASE_URL_V3 + '/movie/' + id + '/watch/providers?language=da-DK&' + END;
    return await fetchUrl(url);
}

export async function images(id: number): Promise<any | Error> {
    const url = BASE_URL_V3 + '/movie/' + id + '/images?include_image_language=da,en&' + END;
    return await fetchUrl(url);
}

export async function credits(id: number): Promise<any | Error> {
    const url = BASE_URL_V3 + '/movie/' + id + '/credits?' + END;
    return await fetchUrl(url);
}
// https://api.themoviedb.org/3/discover/movie?api_key=b1873c6876da5e75d4e8531a13a3c7a2&language=da-DK&region=DK&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=384

export async function discover(): Promise<any | Error> {
    const url = BASE_URL_V3 + '/discover/movie?language=da-DK&region=DK&with_watch_providers=384';
    return await fetchUrl(url);
}

async function fetchUrl(url: string): Promise<unknown | Error> {
    try {
        const response = await fetch(url, REQUEST_INIT);
        const json = await response.json();
        if (response.ok) {
            return json;
        } else {
            return new Error('Tmdb error');
        }
    } catch(error) {
        console.log(error);
        return new Error('Tmdb error');
    }
}

const genres = [
    {
        id: 28,
        name: 'Action'
    },
    {
        id: 12,
        name: 'Eventyr'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Komedie'
    },
    {
        id: 80,
        name: 'Krimi'
    },
    {
        id: 99,
        name: 'Dokumentar'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Familie'
    },
    {
        id: 14,
        name: 'Fantasi'
    },
    {
        id: 36,
        name: 'Historie '
    },
    {
        id: 27,
        name: 'Gyser'
    },
    {
        id: 10402,
        name: 'Musik'
    },
    {
        id: 9648,
        name: 'Mysterie'
    },
    {
        id: 10749,
        name: 'Romantik'
    },
    {
        id: 878,
        name: 'Sci-fi'
    },
    {
        id: 10770,
        name: 'TV film'
    },
    {
        id: 53,
        name: 'Thriller'
    },
    {
        id: 10752,
        name: 'Krig'
    },
    {
        id: 37,
        name: 'Western'
    }
];

export function getGenre(id: number): Object {
    for (const genre of genres) {
        if (genre.id === id) {
            return genre;
        }
    }
    return {id: 0, name: 'unknown'};
}