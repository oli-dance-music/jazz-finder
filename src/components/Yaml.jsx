import yaml from 'js-yaml';
//import { fs } from 'fs';
import yaml_file from '../JAZZSET_AUTO_UNCLEANED.yaml';
import axios from 'redaxios';
import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function Yaml() {
	const [jazzData, setJazzData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				//axios
				const { data: markDownData } = await axios.get(yaml_file);

				//console.log(markDownData);

				const data = await yaml.loadAll(markDownData);
				console.log('loaded...');
				//console.log(data);
				setJazzData(data);
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		};
		fetchData();
	}, []); //the loaded shouldnt change, since it is based on a static file, so we only load it once when initializing the app

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<p>Found {jazzData.length} items, Example:</p>
					<p>
						<code>{JSON.stringify(jazzData[0])}</code>
					</p>
					<button onClick={() => setCount(count + 1)}>Count {count}</button>
				</div>
			)}
		</>
	);
}
