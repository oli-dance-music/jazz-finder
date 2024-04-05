import classes from './RecordItem.module.css';
import Toggle from '../primitives/Toggle/Toggle';
import { useMediaContext } from '../../reducer/media';
import axios from 'redaxios';
import { useEffect, useState } from 'react';

export default function RecordItem({
	Artist,
	Title,
	Performers,
	Date,
	Label_Record,
	url,
	rawData,
}) {
	const [, mediaDispatch] = useMediaContext();
	const [mp3Url, setMp3Url] = useState(null);

	useEffect(() => {
		//prepare url for playing
		const apiUrl = url.replace('details', 'metadata');
		const mp3Path = url.replace('details', 'download');

		const fetchData = async () => {
			try {
				axios.get(apiUrl).then((res) => {
					const mp3Url =
						mp3Path +
						'/' +
						res.data.files.find(({ format }) => format === 'VBR MP3').name;
					setMp3Url(mp3Url);
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [url]);

	return (
		<div className={classes.recordItem}>
			<Toggle title={`${Artist} - ${Title} (${Date})`}>
				<div className={classes.body}>
					{mp3Url && (
						<button
							onClick={() =>
								mediaDispatch({
									action: 'play',
									payload: mp3Url,
								})
							}
						>
							Play Song in Player, please
						</button>
					)}
					<p>
						<a href={url} target="_blank" rel="noreferrer">
							Open on Archive.org
						</a>
					</p>
					<p>{Performers}</p>
					<p>{Label_Record}</p>
					{/* <div>
						<iframe
							title={`${Artist} - ${Title}`}
							src={url.replace('details', 'embed')}
							width={500}
							height={35}
							webkitallowfullscreen="true"
							mozallowfullscreen="true"
							allowFullScreen
						></iframe>
					</div> */}
					<Toggle title="Show JSON">{JSON.stringify(rawData)}</Toggle>
				</div>
			</Toggle>
		</div>
	);
}
