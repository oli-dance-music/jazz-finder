import { useLocation } from 'wouter';
import { imageBase } from '../../movieDb';
export default function Teaser({
	id,
	title,
	original_title,
	poster_path,
	release_date,
}) {
	const posterUrl = poster_path ? `${imageBase}/w342/${poster_path}` : '';

	const [, setLocation] = useLocation();

	/* In year soll das Jahr aus release_date gespeichert werden: */
	const year = release_date ? new Date(release_date).getFullYear() : '';

	const linkTarget = `/movie/${id}`;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<article className="teaser" onClick={() => setLocation(linkTarget)}>
			<header className="teaser__header">
				<h3 className="teaser__title">
					{title} {year && <time dateTime={year}>({year})</time>}
				</h3>
				{/* Originaltitel nur anzeigen, wenn er vom Titel abweicht */}
				{title != original_title && (
					<em className="teaser__original-title">{original_title}</em>
				)}
			</header>

			<div className="teaser__poster">
				{!posterUrl && (
					<div className="teaser__poster__placeholder" aria-hidden="true">
						🎞️
					</div>
				)}
				{posterUrl && <img src={posterUrl} alt={`Filmplakat ${title}`} />}
			</div>
		</article>
	);
}
