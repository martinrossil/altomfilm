import ICollection from './ICollection';
import IGenre from './IGenre';

export default interface IMovie {
    adult: boolean;
    backdrop: string | null;
    budget: number;
    collection: ICollection | null;
    genres: Array<IGenre>;
    homepage: string | null;
    id: number;
    imdb: string | null;
    originalLanguage: string;
    originalTitle: string;
    overview: string | null;
    release: string;
    title: string;
}