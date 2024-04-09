import classes from './MediaPlayer.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMediaContext } from '../../reducer/media';
import List from '../primitives/List/List';
import RecordItem from '../RecordItem/RecordItem';
import { useEffect } from 'react';
import Card from '../primitives/Card/Card';
import useConfirm from '../../hooks/useConfirm';
//import { useHeaderContext } from '../Header';
import { Helmet } from 'react-helmet-async';

export default function MediaPlayer() {
	const [{ playing, playlist }, mediaDispatch] = useMediaContext();

	/* const [title, setTitle] = useHeaderContext(); */

	useLocalStorage(playlist);

	const confirmEmptyBasket = useConfirm(
		'Are you sure you want to empty the playlist?',
		() => {
			mediaDispatch({
				action: 'emptyPlaylist',
			});
		}
	);

	const handle = (action) => {
		switch (action) {
			case 'startPlaylist':
				if (playlist.length) {
					mediaDispatch({
						action: 'playing',
						payload: 0,
					});
				}
				break;
			case 'next':
				mediaDispatch({
					action: 'playing',
					payload: playing < playlist.length - 1 ? playing + 1 : 0,
				});
				break;
			case 'previous':
				mediaDispatch({
					action: 'playing',
					payload: playing > 0 ? playing - 1 : playlist.length - 1,
				});
				break;
			case 'emptyPlaylist':
				confirmEmptyBasket();
				break;
		}
	};

	return (
		<div className={classes.mediaPlayer}>
			<div>
				{playing !== null ? (
					<>
						<Helmet>
							<title>🎵 {playlist[playing].Title} - Jazz Finder</title>
						</Helmet>
						Playing: {playlist[playing].Artist} - {playlist[playing].Title}
					</>
				) : (
					<> No song is playing </>
				)}
			</div>

			<AudioPlayer
				customAdditionalControls={[]}
				src={playing !== null ? playlist[playing].src : ''}
				showSkipControls
				onPlayError={() => handle('startPlaylist')}
				onClickNext={() => handle('next')}
				onClickPrevious={() => handle('previous')}
				onEnded={() => handle('next')}
			/>
			<Card>
				<Card.Header>
					<Card.Toggle>Show Playlist ({playlist.length} songs)</Card.Toggle>
					<button onClick={() => handle('emptyPlaylist')}>
						Empty Playlist
					</button>
				</Card.Header>
				<Card.Body>
					<List>
						{playlist.map((item) => (
							<RecordItem key={item.id} {...item} />
						))}
					</List>
				</Card.Body>
			</Card>
		</div>
	);
}

function useLocalStorage(playlist) {
	useEffect(() => {
		console.log('playlist changed');
		console.log(playlist);
		localStorage.setItem('playlist', JSON.stringify(playlist));
	}, [playlist]);
}
