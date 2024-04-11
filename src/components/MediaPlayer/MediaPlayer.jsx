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
		//if there is no playlist, we dont need to do anything
		if (!playlist.length) return;

		switch (action) {
			case 'startPlaylist':
				if (playlist.length && playlist[0].src) {
					mediaDispatch({
						action: 'play',
						payload: playlist[0],
					});
				}
				break;
			case 'next':
				mediaDispatch({
					action: 'play',
					payload: playlist[playing < playlist.length - 1 ? playing + 1 : 0],
				});
				break;
			case 'previous':
				mediaDispatch({
					action: 'play',
					payload: playlist[playing > 0 ? playing - 1 : playlist.length - 1],
				});
				break;
			case 'emptyPlaylist':
				confirmEmptyBasket();
				break;
		}
	};

	console.log('playing', playing);
	console.log('playlist[playing]', playlist[playing]);

	playlist.map((item) => console.log(item));

	return (
		<div className={classes.mediaPlayer}>
			<div className={classes.playerStatus}>
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
					<Card.Toggle disabled={playlist.length === 0}>
						Show Playlist ({playlist.length} songs)
					</Card.Toggle>
					<button
						onClick={() => handle('startPlaylist')}
						disabled={playlist.length === 0}
					>
						Start Playlist
					</button>
					<button
						onClick={() => handle('emptyPlaylist')}
						disabled={playlist.length === 0}
					>
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
		localStorage.setItem('playlist', JSON.stringify(playlist));
	}, [playlist]);
}
