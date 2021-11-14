import { CollectionType } from './CollectionType';
import { GenreType } from './GenreType';

export type MovieType = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: CollectionType | null;
    budget: number;
    genres: Array<GenreType>;
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    release_date: string;
    title: string;
}