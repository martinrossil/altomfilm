const movies: Array<Object> = [
    {
        id: 1,
        title: 'Batman'
    },
    {
        id: 2,
        title: 'Forrest Gump'
    },
    {
        id: 3,
        title: 'Aliens'
    }
]

type Arg = {
    id: number
}

export const resolvers = {
    Query: {
        movies: () => movies,
        movie: (parent: unknown, args: Arg) => movies[args.id - 1]
    }
};
