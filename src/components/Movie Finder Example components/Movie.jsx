import { useEffect, useState } from 'react';
import { fetchMovieDb, imageBase } from '../../movieDb';
import Loader from '../Loader';
import VoteDisplay from './VoteDisplay';

export default function Movie({ params }) {
	const { id } = params;
	const [movieData, setMovieData] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	/* Hier die Filmdaten laden und in movieData speichern.
	https://developers.themoviedb.org/3/movies/get-movie-details
	*/

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				//axios
				const { data } = await fetchMovieDb(`movie/${id}`, {});

				setMovieData(data);
			} catch (error) {
				setErrorMessage(
					'Ein Problem beim Laden der Daten ist aufgetreten. Bitte versauchen Sie die Seite neu zu laden'
				);
				console.log(error);
			}
		};

		//do the search
		fetchMovie();
	}, [id]);

	if (errorMessage) {
		return (
			<div className="error-message">
				<strong>{errorMessage}</strong>
			</div>
		);
	}

	if (!movieData) {
		return <Loader />;
	}

	const {
		title,
		original_title,
		release_date,
		overview,
		runtime,
		genres,
		poster_path,
		vote_average,
		vote_count,
	} = movieData;
	const posterUrl = poster_path ? `${imageBase}/w342/${poster_path}` : '';

	return (
		<article className="movie">
			<title>{title}</title>
			<h1 className="movie__title">
				{title}
				{title !== original_title && (
					<>
						<br />
						<span style={{ fontSize: '80%' }}>
							<em className="movie__original-title">Orig.: {original_title}</em>
						</span>
					</>
				)}
			</h1>
			<div className="grid">
				<div className="movie__poster">
					{!posterUrl && (
						<div className="movie__poster__placeholder" aria-hidden="true">
							🎞️
						</div>
					)}
					{posterUrl && <img src={posterUrl} alt={`Filmplakat ${title}`} />}
				</div>
				<div>
					<h3 style={{ marginTop: 0 }}>Details</h3>
					<dl className="movie__details">
						<dt>Datum</dt>
						<dd>{new Date(release_date).toLocaleDateString()}</dd>
						<dt>Dauer</dt>
						<dd>{runtime} Min.</dd>
						<dt>{genres.length == 1 ? 'Genre' : 'Genres'}</dt>
						<dd>{genres.map(({ name }) => name).join(', ')}</dd>
						<dt>Rating</dt>
						<dd>
							<VoteDisplay
								vote={vote_average}
								min={0}
								max={10}
								count={vote_count}
							/>
						</dd>
					</dl>
				</div>
			</div>
			{overview && <p className="movie__overview">{overview}</p>}
		</article>
	);
}
