import ITmdb from './interfaces/ITmdb';
import IMovie from './interfaces/IMovie';
import Movie from './vo/Movie.js';
import { MovieType } from './types/MovieType';
import fetch from 'node-fetch';
import { LanguageType } from './types/LanguageType';

export default class Tmdb implements ITmdb {
    private static BASE_URL_V3 = 'https://api.themoviedb.org/3';
    private token: string;
    public constructor(token: string) {
        this.token = token;
    }

    public async movie(id: number, language: LanguageType = 'en-US'): Promise<[IMovie | null, Error | null]> {
        const url = Tmdb.BASE_URL_V3 + '/movie/' + id + '?include_adult=false&language=' + language;
        try {
            const response = await fetch(url, this.requestInit);
            const json: MovieType = await response.json() as MovieType;
            if (response.ok) {
                // console.log(json);
                return [new Movie(json), null];
            } else {
                return [null, new Error('Tmdb error')];
            }
        } catch(error) {
            return [null, new Error('Tmdb error')];
        }
    }

    private get requestInit(): Record<string, string | Record<string, string> | Headers | string[][]> {
        return {
            method: 'GET',
            headers: this.headersInit
        }
    }

    private get headersInit(): Headers | string[][] | Record<string, string> {
        return {
            Authorization: 'Bearer ' + this.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
}