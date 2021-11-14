import { LanguageType } from '../types/LanguageType';
import IMovie from './IMovie';

export default interface ITmdb {
    movie(id: number, language: LanguageType): Promise<[IMovie | null, Error | null]>;
}