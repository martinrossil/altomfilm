import { Collection } from './Collection.js';
import ICollection from '../interfaces/ICollection';
import IMovie from '../interfaces/IMovie';
import { MovieType } from '../types/MovieType';
import IGenre from '../interfaces/IGenre.js';
import Genre from './Genre.js';

export default class Movie implements IMovie {
    public adult: boolean;
    public backdrop: string | null;
    public budget: number;
    public collection: ICollection | null;
    public genres: Array<IGenre>;
    public homepage: string | null;
    public id: number;
    public imdb: string | null;
    public originalLanguage: string;
    public originalTitle: string;
    public overview: string | null;
    public release: string;
    public title: string;
    public constructor(init: MovieType) {
        this.adult = init.adult;
        this.backdrop = init.backdrop_path ? init.backdrop_path : null;
        this.budget = init.budget;
        this.collection = init.belongs_to_collection ? new Collection(init.belongs_to_collection) : null;
        this.genres = init.genres.map(genreType => new Genre(genreType));
        this.homepage = init.homepage;
        this.id = init.id;
        this.imdb = init.imdb_id;
        this.originalLanguage = init.original_language;
        this.overview = init.overview;
        this.originalTitle = init.original_title;
        this.release = init.release_date;
        this.title = init.title;
    }
}