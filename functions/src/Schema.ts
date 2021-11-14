import { 
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import { movie, providers, images, credits, discover, getGenre } from './Api.js';


const Image = new GraphQLObjectType({
    name: 'Image',
    fields: {
        aspect_ratio: {type: GraphQLFloat},
        file_path: {type: GraphQLString},
        height: {type: GraphQLInt},
        iso_639_1: {type: GraphQLString},
        vote_average: {type: GraphQLFloat},
        vote_count: {type: GraphQLInt},
        width: {type: GraphQLInt}
    }
});

const Images = new GraphQLObjectType({
    name: 'Images',
    fields: {
        id: {type: GraphQLInt},
        backdrops: {type: new GraphQLList(Image)},
        posters: {type: new GraphQLList(Image)}
    }
});

const Provider = new GraphQLObjectType({
    name: 'Provider',
    fields: {
        display_priority: {type: GraphQLInt},
        logo_path: {type: GraphQLString},
        provider_id: {type: GraphQLInt},
        provider_name: {type: GraphQLString}
    }
});

const Watch = new GraphQLObjectType({
    name: 'Watch',
    fields: {
        buy: {type: new GraphQLList(Provider)},
        flatrate: {type: new GraphQLList(Provider)},
        link: {type: GraphQLString},
        rent: {type: new GraphQLList(Provider)}
    }
});

const Language = new GraphQLObjectType({
    name: 'Language',
    fields: {
        english_name: {type: GraphQLString},
        iso_639_1: {type: GraphQLString},
        name: {type: GraphQLString}
    }
});

const Country = new GraphQLObjectType({
    name: 'Country',
    fields: {
        iso_3166_1: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});

const Company = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: {type: GraphQLInt},
        logo_path: {type: GraphQLString},
        name: {type: GraphQLString},
        origin_country: {type: GraphQLString}
    }
});

const Collection = new GraphQLObjectType({
    name: 'Collection',
    fields: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        poster_path: {type: GraphQLString},
        backdrop_path: {type: GraphQLString}
    }
});

const Genre = new GraphQLObjectType({
    name: 'Genre',
    fields: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString}
    }
});

const Cast = new GraphQLObjectType({
    name: 'Cast',
    fields: {
        adult: {type: GraphQLBoolean},
        cast_id: {type: GraphQLInt},
        character: {type: GraphQLString},
        credit_id: {type: GraphQLString},
        gender: {type: GraphQLInt},
        id: {type: GraphQLInt},
        known_for_department: {type: GraphQLString},
        name: {type: GraphQLString},
        order: {type: GraphQLInt},
        original_name: {type: GraphQLString},
        popularity: {type: GraphQLFloat},
        profile_path: {type: GraphQLString}
    }
});

const Crew = new GraphQLObjectType({
    name: 'Crew',
    fields: {
        adult: {type: GraphQLBoolean},
        credit_id: {type: GraphQLString},
        department: {type: GraphQLString},
        gender: {type: GraphQLInt},
        id: {type: GraphQLInt},
        job: {type: GraphQLString},
        known_for_department: {type: GraphQLString},
        name: {type: GraphQLString},
        original_name: {type: GraphQLString},
        popularity: {type: GraphQLFloat},
        profile_path: {type: GraphQLString}
    }
});

const Credits = new GraphQLObjectType({
    name: 'Credits',
    fields: {
        id: {type: GraphQLInt},
        cast: {type: new GraphQLList(Cast)},
        crew: {type: new GraphQLList(Crew)}
    }
});

const Movie = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        adult: {type: GraphQLBoolean},
        backdrop_path: {type: GraphQLString},
        budget: {type: GraphQLInt},
        belongs_to_collection: {type: Collection},
        credits: {
            type: Credits,
            async resolve(movie) {
                return await credits(movie.id);
            }
        },
        genres: {
            type: new GraphQLList(Genre),
            resolve(movie) {
                // console.log(typeof movie.genre_ids[0]);
                if (movie.genres) {
                    return movie.genres;
                } else if (movie.genre_ids) {
                    console.log('---------------- movie.genre_ids', movie.genre_ids.length);
                    const genre_ids: Array<number> = movie.genre_ids;
                    const genres: Array<Object> = [];
                    for (const id of genre_ids) {
                        const genre = getGenre(id);
                        console.log(genre);
                        genres.push(genre);
                    }
                    return genres;
                }
                return [];
            }
        },
        homepage: {type: GraphQLString},
        id: {type: GraphQLInt},
        images: {
            type: Images,
            async resolve(movie) {
                return await images(movie.id);
            }
        },
        imdb_id: {type: GraphQLID},
        original_language: {type: GraphQLString},
        original_title: {type: GraphQLString},
        overview: {type: GraphQLString},
        poster_path: {type: GraphQLString},
        production_companies: {type: new GraphQLList(Company)},
        popularity: {type: GraphQLFloat},
        production_countries: {type: new GraphQLList(Country)},
        release_date: {type: GraphQLString},
        revenue: {type: GraphQLInt},
        runtime: {type: GraphQLInt},
        status: {type: GraphQLString},
        tagline: {type: GraphQLString},
        title: {type: GraphQLString},
        slug: {
            type: GraphQLString,
            resolve(movie) {
                return 'ygtre';
            }
        },
        spoken_languages: {type: new GraphQLList(Language)},
        video: {type: GraphQLBoolean},
        vote_average: {type: GraphQLFloat},
        vote_count: {type: GraphQLInt},
        watch: {
            type: Watch,
            async resolve(movie) {
                const result =  await providers(movie.id);
                return result.results.DK;
            }
        }

    }
});

const Page = new GraphQLObjectType({
    name: 'Page',
    fields: {
        page: {type: GraphQLInt},
        results: {type: new GraphQLList(Movie)},
        total_pages: {type: GraphQLInt},
        total_results: {type: GraphQLInt}
    }
});

const Root = new GraphQLObjectType({
    name: 'Root',
    fields: {
        movie: {
            type: Movie,
            args: { 
                id: {type: GraphQLInt}
            },
            async resolve(parent, args) {
                return await movie(args.id);
            }
        },
        discover: {
            type: Page,
            async resolve(parent, args) {
                return await discover();
            }
        }
    }
});

export default new GraphQLSchema({
    query: Root
});