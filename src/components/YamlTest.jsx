const jsonUrl = '../../node-server/JazzData.json';

import axios from 'redaxios';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import ReactJson from 'react-json-view';

export default function YamlTest() {
	const [jazzData, setJazzData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				//axios
				const { data } = await axios.get(jsonUrl);
				console.log('loaded...');
				console.log(data);
				setJazzData(data);
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		fetchData();
	}, []); //the loaded data shouldn't change, since it is based on a static file, so we only load it once when initializing the app

	if (loading) {
		return <Loader />;
	}

	if (!jazzData.length) {
		return <div>No Data Received...</div>;
	}

	const exampleData = jazzData[0];

	const {
		Artist,
		Title,
		Date: RecordDate,
		Performers,
		Label_Record,
	} = exampleData.SRC;

	return (
		<>
			<div>
				<p>Found {jazzData.length} items, Example:</p>
				<dl className="movie__details">
					<dt>Artist</dt>
					<dd>{Artist}</dd>
					<dt>Title</dt>
					<dd>{Title}</dd>
					<dt>Performers</dt>
					<dd>{Performers}</dd>
					<dt>Recorded</dt>
					<dd>
						{RecordDate} ({Label_Record})
					</dd>
				</dl>
				<div>
					<iframe
						title="Example"
						src={exampleData.URL.replace('details', 'embed')}
						width={500}
						height={50}
						webkitallowfullscreen="true"
						mozallowfullscreen="true"
						allowFullScreen
					></iframe>
					<p>RAW data:</p>
					<ReactJson src={exampleData} />
				</div>
			</div>
		</>
	);
}
