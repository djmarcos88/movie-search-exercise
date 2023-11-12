import { NextRequest } from 'next/server';
import { Movie } from '../_types/movie';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('movieQuery');

    const res = await fetch(
        'https://api.themoviedb.org/3/search/movie?' +
            new URLSearchParams({
                query: query || '',
                include_adult: 'false',
                language: 'en_US',
                page: '1',
            }),
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.MOVIE_DB_TOKEN,
            },
        }
    );

    const data = await res.json();
    const movies: Movie[] = data.results;

    return Response.json(movies);
}
