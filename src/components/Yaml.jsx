import yaml from 'js-yaml';
//import { fs } from 'fs';
import yaml_file from '../JAZZSET_AUTO_UNCLEANED.yaml';
import axios from 'redaxios';
import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function Yaml() {
	const [jazzData, setJazzData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				//axios
				const { data: markDownData } = await axios.get(yaml_file);

				//console.log(markDownData);

				const data = await yaml.loadAll(markDownData);
				console.log('loaded...');
				console.log(data);
				setJazzData(data);
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		fetchData();
	}, []); //the loaded shouldnt change, since it is based on a static file, so we only load it once when initializing the app

	if (loading) {
		return <Loader />;
	}

	if (!jazzData.length) {
		return <div>No Data Received...</div>;
	}

	jazzData.length && console.log(jazzData[0]);

	const {
		Artist,
		Title,
		Date: RecordDate,
		Performers,
		Label_Record,
	} = jazzData[0].SRC;

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
						src={jazzData[0].URL.replace('details', 'embed')}
						width={500}
						height={50}
						webkitallowfullscreen="true"
						mozallowfullscreen="true"
						allowFullScreen
					></iframe>
					<p>RAW data:</p>
					<p>
						<code>{JSON.stringify(jazzData[0], null, '<br/>')}</code>
					</p>
				</div>
			</div>
		</>
	);
}
