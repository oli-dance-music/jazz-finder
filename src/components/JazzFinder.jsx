import { MediaContext, useMediaReducer } from '../reducer/media';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import SearchPage from './SearchPage/SearchPage';
import Grid from './primitives/Grid/Grid';

export default function JazzFinder() {
	const [media, mediaDispatch] = useMediaReducer();

	return (
		<MediaContext.Provider value={[media, mediaDispatch]}>
			<h1 style={{ textAlign: 'center' }}>Jazz Finder</h1>
			<MediaPlayer />
			<SearchPage />
			<div
				style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}
			>
				&copy; {new Date().getFullYear()} Oliver Fuhrmann
			</div>
		</MediaContext.Provider>
	);
}
