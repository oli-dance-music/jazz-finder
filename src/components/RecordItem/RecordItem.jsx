import classes from './RecordItem.module.css';
import Toggle from '../primitives/Toggle/Toggle';

export default function RecordItem({
	Artist,
	Title,
	Performers,
	Date,
	Label_Record,
	url,
	rawData,
}) {
	return (
		<div className={classes.recordItem}>
			<Toggle title={`${Artist} - ${Title} (${Date})`}>
				<div className={classes.body}>
					<span>{Performers}</span>
					<span>{Label_Record}</span>
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
			</Toggle>
		</div>
	);
}
