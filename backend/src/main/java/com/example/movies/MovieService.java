package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId) {
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public List<Movie> searchMovies(String title) {
        return movieRepository.findMoviesByTitleContaining(title);
    }

    public List<Movie> searchRecomandation(Movie movie) {
        List<String> wordList = filter(movie);
        List<Movie> recomendedMovies = new ArrayList<>();
        for(Movie film : movieRepository.findAll()){
            int contor = 0;
            List<String> filmTitle = filter(film);
            if(!(film.equals(movie))){
                for(String gen : film.getGenres()){
                    for(String genre : movie.getGenres()){
                        if(gen.equals(genre)){
                            contor++;
                        }
                    }
                }
                if(contor >= 3){
                    recomendedMovies.add(film);
                }
                for(String word : wordList){
                    for(String cuvant : filmTitle){
                        if(word.equals(cuvant)){
                            recomendedMovies.add(film);
                        }
                    }
                }
            }
        }
        return recomendedMovies.stream().distinct().toList();
    }

    public List<String> filter(Movie movie){
        String title = movie.getTitle();
        String[] wordArray = title.split("\\s+");
        List<String> wordList = Arrays.asList(wordArray);

        for (int i = 0; i < wordList.size(); i++) {
            wordList.set(i, wordList.get(i).replace(":", ""));
        }
        return wordList;
    }
}
