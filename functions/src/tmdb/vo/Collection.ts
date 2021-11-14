import { CollectionType } from '../types/CollectionType';
import ICollection from '../interfaces/ICollection';

export class Collection implements ICollection {
    public id: number;
    public name: string;
    public poster: string;
    public backdrop: string;
    public constructor(init: CollectionType) {
        this.id = init.id;
        this.name = init.name;
        this.poster = init.poster_path;
        this.backdrop = init.backdrop_path;
    }
}