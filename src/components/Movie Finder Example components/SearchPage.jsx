import { useEffect, useState } from 'react';

import defaultMovies from '../../defaultMovies';
import { fetchMovieDb } from '../../movieDb';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

import MovieTeasers from './MovieTeasers';
import FilterForm from './FilterForm';
import FilterStatus from './FilterStatus';
import Loader from '../Loader';
import Pagination from './Pagination';

export default function SearchPage() {
	const urlObj = new URL(window.location.href);

	const [searchTerm, setSearchTerm] = useState(
		urlObj.searchParams.get('search') ?? ''
	);
	const [movies, setMovies] = useState(defaultMovies);
	const [totalResults, setTotalResults] = useState(0);
	const [page, setPage] = useState(urlObj.searchParams.get('page') ?? 1);

	const pageSize = 20; //is set through API cannot be changed
	const pages = Math.ceil(totalResults / pageSize);

	const debouncedSearch = useDebouncedValue(searchTerm, 600);
	const [loading, setLoading] = useState(false);

	useMoviesSearch(
		debouncedSearch,
		page,
		setMovies,
		setLoading,
		setTotalResults
	);

	return (
		<>
			<FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{searchTerm.length < 2 && (
				<div className="filter-status">
					Type two letters to search for your favorite movies. Here are some
					examples:
				</div>
			)}
			{loading ? (
				<Loader />
			) : (
				<>
					{movies !== defaultMovies && (
						<>
							<FilterStatus count={totalResults} pages={pages} />
							<Pagination page={page} setPage={setPage} pages={pages} />
						</>
					)}
					<MovieTeasers movies={movies} totalResults={totalResults} />
					{movies !== defaultMovies && (
						<>
							<Pagination page={page} setPage={setPage} pages={pages} />
						</>
					)}{' '}
				</>
			)}{' '}
		</>
	);
}

function useMoviesSearch(
	debouncedSearch,
	page,
	setMovies,
	setLoading,
	setTotalResults
) {
	useEffect(() => {
		let ignore = false;

		const url = new URL(window.location.href);

		//not sure if we need to
		url.searchParams.delete('search');
		if (debouncedSearch.length >= 2)
			url.searchParams.set('search', debouncedSearch);

		url.searchParams.delete('page');
		if (page > 1) {
			url.searchParams.set('page', page);
		}

		window.history.replaceState({}, '', url.href);

		if (debouncedSearch.length < 2) {
			setMovies(defaultMovies);
			return;
		}

		//loading preview

		setLoading(true);

		const fetchMovies = async () => {
			try {
				//axios
				const { data } = await fetchMovieDb('search/movie', {
					params: { query: debouncedSearch, page },
				});

				if (ignore) {
					return;
				}

				const { results, total_results } = data;

				setMovies(results);
				setTotalResults(total_results);
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};

		//do the search
		fetchMovies();

		//set a return function that sets ignore true
		return () => (ignore = true);
	}, [debouncedSearch, page]);
}

/* 
1. Nutzt den useDebouncedValue-Hook, um mit 600 Millisekunden Verzögerung
den Wert von searchTerm in eine Variable namens debouncedSearchTerm zu
speichern.
2. Nutzt fetchMovieDB, um die zu debouncedSearchTerm passenden Filme 
zu laden, debouncedSearchTerm mindestens zwei Buchstaben enthält.
Bei einem kürzeren String sollen die defaultMovies angezeigt werden.
https://developers.themoviedb.org/3/search/search-movies
3. Speichert die geladenen Filme in movies
4. Zeigt zwischen FilterForm und MovieTeasers die Komponente FilterStatus an,
aber nur dann, wenn nicht die defaultMovies angezeigt werden.

*/
