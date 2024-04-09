import classes from './RecordItem.module.css';
import Toggle from '../primitives/Toggle/Toggle';
import { useMediaContext } from '../../reducer/media';
import axios from 'redaxios';
import { useEffect, useState } from 'react';
import Card from '../primitives/Card/Card';
import { useSearchContext } from '../../reducer/search';

export default function RecordItem(recordItem) {
	const [{ playing, playlist }, mediaDispatch] = useMediaContext();
	const [, searchDispatch] = useSearchContext();
	const [mp3Url, setMp3Url] = useState(null);

	const {
		Artist: artist,
		Title: title,
		PEOPLE: performers,
		Year: year,
		//Month: month,
		//Day: day,
		Record: record,
		url,
		SRC,
		rawData,
	} = recordItem;

	const { Date: dateRaw, Performers: performersRaw } = SRC;

	useSetMp3Url(url, setMp3Url);

	//console.log(recordItem);
	//const name = 'count basie';
	//console.log(performers[name].join(', '));
	const performersMapped = Object.keys(performers).map((name) => {
		const upperCaseName = name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
			letter.toUpperCase()
		);
		const instruments = performers[name];

		return (
			<a
				key={name}
				className={classes.artistLink}
				href={encodeURIComponent(upperCaseName)}
				onClick={(e) => {
					searchDispatch({
						action: 'set',
						parameter: 'searchTerm',
						payload: upperCaseName,
					});
					e.preventDefault();
				}}
			>
				{upperCaseName} ({instruments.join(', ')})
			</a>
		);
	});

	const isInPlaylist = playlist.some(({ id }) => id === recordItem.id);
	const isPlaying = playing !== null && playlist[playing].id === recordItem.id;

	return (
		<div className={classes.recordItem}>
			<Card>
				<Card.Header>
					<button
						disabled={isPlaying || mp3Url === null ? true : false}
						onClick={() =>
							mediaDispatch({
								action: 'play',
								payload: { ...recordItem, src: mp3Url },
							})
						}
					>
						Play
					</button>
					{!isInPlaylist ? (
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
					) : (
						<button
							onClick={() =>
								mediaDispatch({
									action: 'removeFromPlaylist',
									payload: { ...recordItem, src: mp3Url },
								})
							}
						>
							Remove
						</button>
					)}
					<Card.Toggle>
						{artist} - {title} ({year})
					</Card.Toggle>
				</Card.Header>
				<Card.Body>
					<dl className={classes.recordItemDetails}>
						<dt>Performers</dt>
						<dd>{performersMapped ? performersMapped : performersRaw}</dd>
						<dt>Record Date</dt>
						<dd>
							{dateRaw} (Label: {record})
						</dd>
					</dl>
					<p>
						<a href={url} target="_blank" rel="noreferrer">
							Open on Archive.org
						</a>
					</p>
					<Toggle title="Show JSON">{JSON.stringify(rawData)}</Toggle>
				</Card.Body>
			</Card>
		</div>
	);
}

/* we call the Archive.org 
API to get the correct mp3 url for the recording and save it in a state 
(TODO check if state is the best solution here) 
*/
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
	}, [url]); //eslint-disable-line
}
