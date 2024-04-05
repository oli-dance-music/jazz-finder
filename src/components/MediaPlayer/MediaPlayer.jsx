//import classes from './MediaPlayer.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMediaContext } from '../../reducer/media';

export default function MediaPlayer() {
	const [media] = useMediaContext();

	console.log(media);

	return (
		<AudioPlayer
			autoPlay
			src={media.playing}
			onPlay={() => console.log('onPlay')}
			// other props here
		/>
	);
}
