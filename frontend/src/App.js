import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {useRecs, UserProvider} from './components/context/UserContext';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';
import SearchResultsPage from "./components/SearchResultPage/SearchResultPage";
import {setRecs} from "./components/context/UserContext";


const api_key="5b6661938c854a6c4ced17e36c98eb1b";
const Main = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes()
    }, []);

    const getGenres = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
        const data = await response.json();
        return data.genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});
    };

    const getMovies = async (page = 1, movies = []) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`
        );
        const data = await response.json();
        const newMovies = movies.concat(data.results);

        if (newMovies.length >= 1 || !data.results.length) {
            return newMovies.slice(0, 1);
        }

        return getMovies(page + 1, newMovies);
    };

    const getRecipes = async () => {
        const genreMapping = await getGenres();
        const movies = await getMovies();

        function generateHexId(length) {
            let result = '';
            for (let i = 0; i < length; i += 8) {
                const random32bit = Math.floor(Math.random() * Math.pow(2, 32));
                result += random32bit.toString(16).padStart(8, '0');
            }
            return result.slice(0, length);
        }

        const formattedData = movies.map(movie => ({
            _id: { "$oid": generateHexId(24).toString() },
            imdbId: `tt${movie.id}`,
            title: movie.title,
            releaseDate: movie.release_date,
            trailerLink: "some_trailer_link", // Replace with actual trailer link
            genres: movie.genre_ids.map(id => genreMapping[id]),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrops: [
                `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            ],
            reviewIds: [],
            rating: movie.vote_average,
            popularity: movie.popularity,

        }));

        setRecipes(formattedData);
        console.log(formattedData);
    };

    return (
        <main></main>
    );
};

function App() {
    const [movies, setMovies] = useState();
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);
    const [rec, setRecs] = useState([]);

    const getMovies = async () => {

        try {

            const response = await api.get("/api/v1/movies");

            setMovies(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    const getRecommendations = async (movie) => {
        if(!movie) return;
        const genres = movie.genres;
        const rmd = [];

        movies?.map((mov) => {
            if (genres.filter((genre) => mov.genres.includes(genre)).length >= 1) {
                rmd.push(mov);
            }
        });

        //sort the movies by the highest genre match
        rmd.sort((a, b) => {
            return genres.filter((genre) => b.genres.includes(genre)).length -
                genres.filter((genre) => a.genres.includes(genre)).length;
        });
        setRecs(rmd);
    }
    const getMovieData = async (movieId) => {

        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);

            const singleMovie = response.data;

            setMovie(singleMovie);

            setReviews(singleMovie.reviewIds);

            //await getRecommendations(singleMovie);

        } catch (error) {
            console.error(error);
        }

    }



    useEffect(() => {
        getMovies();
    },[])

    return (


        <UserProvider>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Home movies={movies} recommendations={movies}/>}></Route>
                        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
                        <Route path="/Reviews/:movieId"
                               element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews}
                                                 setReviews={setReviews} rec={rec}/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/search" element={<SearchResultsPage/>}/>
                        <Route path="/allMovies" element={<Main/>}/>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Route>
                </Routes>
            </div>
        </UserProvider>
    );
}

export default App;