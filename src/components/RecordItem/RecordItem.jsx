import classes from './RecordItem.module.css';
import Toggle from '../primitives/Toggle/Toggle';
import { useMediaContext } from '../../reducer/media';
import axios from 'redaxios';
import { useEffect, useState } from 'react';
import Card from '../primitives/Card/Card';

export default function RecordItem(recordItem) {
	const [, mediaDispatch] = useMediaContext();
	const [mp3Url, setMp3Url] = useState(null);

	const {
		Artist: artist,
		Title: title,
		Performers,
		Year: year,
		Date: date,
		Label_Record,
		url,
		rawData,
	} = recordItem;
	useSetMp3Url(url, setMp3Url);

	return (
		<div className={classes.recordItem}>
			<Card>
				<Card.Header>
					<button
						onClick={() =>
							mediaDispatch({
								action: 'play',
								payload: { ...recordItem, src: mp3Url },
							})
						}
					>
						Play
					</button>
					<button
						onClick={() =>
							mediaDispatch({
								action: 'addToPlaylist',
								payload: { ...recordItem, src: mp3Url },
							})
						}
					>
						Add
					</button>
					<button
						onClick={() =>
							mediaDispatch({
								action: 'removeFromPlaylist',
								payload: { ...recordItem, src: mp3Url },
							})
						}
					>
						Remove
					</button>{' '}
					<Card.Toggle>
						{artist} - {title} ({year})
					</Card.Toggle>
				</Card.Header>
				<Card.Body>
					<p>
						<a href={url} target="_blank" rel="noreferrer">
							Open on Archive.org
						</a>
					</p>
					<p>{Performers}</p>
					<p>{Label_Record}</p>

					<Toggle title="Show JSON">{JSON.stringify(rawData)}</Toggle>
				</Card.Body>
			</Card>
			{/* 
			<Toggle title={`${artist} - ${title} (${date})`}>
				<div className={classes.body}>
					<p>
						<a href={url} target="_blank" rel="noreferrer">
							Open on Archive.org
						</a>
					</p>
					<p>{Performers}</p>
					<p>{Label_Record}</p>
					 <div>
						<iframe
							title={`${Artist} - ${Title}`}
							src={url.replace('details', 'embed')}
							width={500}
							height={35}
							webkitallowfullscreen="true"
							mozallowfullscreen="true"
							allowFullScreen
						></iframe>
					</div> 
					<Toggle title="Show JSON">{JSON.stringify(rawData)}</Toggle>
				</div>
			</Toggle> */}
		</div>
	);
}

function useSetMp3Url(url, setMp3Url) {
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
}
