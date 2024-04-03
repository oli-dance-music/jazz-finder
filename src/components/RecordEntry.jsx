import ReactJson from 'react-json-view';

export default function RecordEntry({
	Artist,
	Title,
	Performers,
	RecordDate,
	Label_Record,
	rawData,
}) {
	return (
		<div className="record-entry">
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
			<iframe
				title="Example"
				src={rawData.URL.replace('details', 'embed')}
				width={500}
				height={50}
				webkitallowfullscreen="true"
				mozallowfullscreen="true"
				allowFullScreen
			></iframe>
			<div>
				<input
					type="checkbox"
					id="toggle-raw-data"
					onChange={(event) => {
						const toggleContent = event.target.nextElementSibling;
						toggleContent.style.display = event.target.checked
							? 'block'
							: 'none';
					}}
				/>
				<label htmlFor="toggle-raw-data">RAW data</label>
				<div className="toggle-content" style={{ display: 'none' }}>
					<ReactJson src={rawData} />
				</div>
			</div>
		</div>
	);
}
