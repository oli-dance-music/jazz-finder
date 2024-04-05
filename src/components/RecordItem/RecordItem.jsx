import classes from './RecordItem.module.css';
import Toggle from '../primitives/Toggle/Toggle';
import { useMediaContext } from '../../reducer/media';
import axios from 'redaxios';

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

	//prepare url for playing
	const xml =
		url.replace('details', 'download') +
		'/' +
		url.split('/').pop() +
		'_files.xml';
	console.log(xml);

	fetch(xml, {
		method: 'GET',
		//mode: 'no-cors',
		headers: {
			'Content-Type': 'text/xml',
		},
	})
		.then((response) => {
			console.log(response);
			response.text();
		})
		.then((data) => {
			/* const parser = new DOMParser();
			const xml = parser.parseFromString(data, 'application/xml'); */
			console.log(data);
		})
		.catch(console.error);

	/* 	axios
		.get(xml, {
			withCredentials: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
		})
		.then((response) => {
			console.log(response);
		}); */

	return (
		<div className={classes.recordItem}>
			<Toggle title={`${Artist} - ${Title} (${Date})`}>
				<div className={classes.body}>
					<button
						onClick={() =>
							mediaDispatch({
								action: 'play',
								payload: mp3,
							})
						}
					>
						Play Song in Player
					</button>
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
