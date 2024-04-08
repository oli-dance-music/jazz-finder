import classes from './MediaPlayer.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMediaContext } from '../../reducer/media';

export default function MediaPlayer() {
	const [media] = useMediaContext();

	const {
		Artist: artist = '',
		Title: title = '',
		src = null,
	} = media.playing || {};

	return (
		<div className={classes.mediaPlayeWrapper}>
			<div>
				{media.playing ? (
					<>
						Playing: {artist} - {title}
					</>
				) : (
					<> No song is playing </>
				)}
			</div>
			<AudioPlayer
				autoPlay
				src={src}
				onPlay={() => console.log('onPlay')}
				// other props here
			/>
		</div>
	);
}
