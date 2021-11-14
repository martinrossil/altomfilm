import IGenre from '../interfaces/IGenre';
import { GenreType } from '../types/GenreType';

export default class Genre implements IGenre {
    public id: number;
    public name: string;
    public constructor(init: GenreType) {
        this.id = init.id;
        this.name = init.name;
    }
}