interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    genre: Genre;
    description?: string;
    director?: string;
}

// Для тестирования
const movies: Movie[] = [
    {
        id: 1,
        title: "Интерстеллар",
        year: 2014,
        rating: 8.6,
        genre: "sci-fi",
        description: "Эпическое путешествие в космос",
        director: "Кристофер Нолан"
    },
    {
        id: 2,
        title: "Достать ножи",
        year: 2019,
        rating: 7.9,
        genre: "comedy",
        description: "Юмористический детектив о загадочной смерти",
        director: "Райан Джонсон"
    },
    {
        id: 3,
        title: "Джон Уик",
        year: 2014,
        rating: 7.4,
        genre: "action",
        description: "Бесконечные перестрелки и месть",
        director: "Чад Стахелски"
    },
    {
        id: 4,
        title: "Наследие",
        year: 2023,
        rating: 7.8,
        genre: "horror",
        description: "Семейные тайны и сверхъестественный ужас",
        director: "Оз Перкинс"
    },
    {
        id: 5,
        title: "Оппенгеймер",
        year: 2023,
        rating: 8.4,
        genre: "drama",
        description: "История создания атомной бомбы",
        director: "Кристофер Нолан"
    }
];

const genres = ['comedy', 'drama', 'action', 'horror', 'sci-fi'] as const;
type Genre = typeof genres[number];

const genreEmojis = {
    comedy: "стикер 1",
    drama: "стикер 2", 
    action: "стикер 3",
    horror: "стикер 4",
    "sci-fi": "стикер 5"
} as const

type GenreEmoji = typeof genreEmojis[keyof typeof genreEmojis];


type SortBy = "year" | "rating" | "title";

type MovieCard = Pick<Movie, 'id' | 'title' | 'year' | 'rating'>;

type MovieFull = Readonly<Movie>;

function filterByGenre(movies: Movie[], genre: Genre): Movie[] {
    let film: Movie[] = []
    movies.forEach(movie => {
        if (movie.genre === genre) {
            film.push(movie)
        }
    });
    return film
}

function sortMovies(movies: Movie[], by: SortBy): Movie[] {
    return [...movies].sort((a, b) => {
        switch (by) {
            case "year":
                return a.year - b.year;
            
            case "rating":
                return b.rating - a.rating;
            
            case "title":
                return a.title.localeCompare(b.title);
                
            default:
                return 0;
        }
    });
}

function toCard(movie: Movie): MovieCard {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating
    };
}


function getGenreEmoji(genre: Genre): GenreEmoji {
    return genreEmojis[genre];
}


// Тестирование
console.log(filterByGenre(movies, "action"))

console.log("По году:", sortMovies(movies, "year"));
console.log("По рейтингу:", sortMovies(movies, "rating"));
console.log("По названию:", sortMovies(movies, "title"));

console.log(toCard(movies[1]!));

movies.forEach(movie => {
    console.log(`${getGenreEmoji(movie.genre)} ${movie.title}`);
});





