import classes from './MediaPlayer.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMediaContext } from '../../reducer/media';
import List from '../primitives/List/List';
import RecordItem from '../RecordItem/RecordItem';
import { createRef, useEffect, useState } from 'react';

export default function MediaPlayer() {
	const [{ playing, playlist }, mediaDispatch] = useMediaContext();
	const [currentTrack, setTrackIndex] = useState(null);
	//const [player, setPlayer] = useState(null);
	const { Artist: artist = '', Title: title = '', src = '' } = playing || {};

	//const [loop, setLoop] = useState(false);
	//console.log(playlist);
	//console.log(currentTrack);
	//console.log(src);

	const handle = (action) => {
		switch (action) {
			case 'startPlaylist':
				if (playlist.length) {
					setTrackIndex(0);
				}
				break;
			case 'next':
				setTrackIndex((currentTrack) =>
					currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
				);
				break;
			case 'previous':
				setTrackIndex((currentTrack) =>
					currentTrack > 0 ? currentTrack - 1 : playlist.length - 1
				);
				break;
		}
	};

	//const player = createRef();
	//console.log(player);
	//if (player) player.togglePlay();

	useEffect(() => {
		console.log('current track changed');

		//skip the effect if no song is loaded
		if (!playlist.length) return;

		//console.log(player);
		//player.togglePlay();

		mediaDispatch({
			action: 'play',
			payload: playlist[currentTrack],
		});
	}, [currentTrack]);

	return (
		<div className={classes.mediaPlayeWrapper}>
			<List>
				<div>
					{playing ? (
						<>
							Playing: {artist} - {title}
						</>
					) : (
						<> No song is playing </>
					)}
				</div>
				<AudioPlayer
					customAdditionalControls={[]}
					src={src}
					showSkipControls
					onPlayError={(e) => handle('startPlaylist')}
					onClickNext={() => handle('next')}
					onClickPrevious={() => handle('previous')}
					onEnded={() => handle('next')}
					/* ref={player} */
				/>

				{playlist.map((item) => (
					<RecordItem key={item.id} {...item} />
				))}
			</List>
		</div>
	);
}
