'use client';
import React, { useEffect, useState } from 'react';
import { SearchBar } from './searchbar';
import { Movie } from './_types/movie';
import Image from 'next/image';

export const SearchMovies = () => {
    const [movieResults, setMovieResults] = useState<Movie[]>([]);

    const onSearch = async (query: string) => {
        const res = await fetch('/search?movieQuery=' + query);
        const data: Movie[] = await res.json();
        setMovieResults(data);
    };

    return (
        <>
            <SearchBar onSearch={onSearch} placeholder="Search Movies" />

            <div className="flex flex-wrap justify-center gap-4">
                {movieResults.length > 0 &&
                    movieResults.map((movie) => {
                        return (
                            <div className="card bg-neutral-content shadow-xl basis-96" key={movie.id}>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {movie.title}
                                        {movie.release_date && (
                                            <span className="text-sm">
                                                {' '}
                                                ({new Date(movie.release_date).getFullYear()})
                                            </span>
                                        )}
                                    </h2>
                                </div>
                                <figure className="my-5">
                                    {movie.poster_path && (
                                        <Image
                                            alt={movie.title + ' poster'}
                                            src={'https://image.tmdb.org/t/p/w200' + movie.poster_path}
                                            width={200}
                                            height={300}
                                        ></Image>
                                    )}
                                </figure>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
