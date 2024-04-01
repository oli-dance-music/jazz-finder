export default function FilterStatus({ count, pages }) {
	const cssClasses = `filter-status ${
		count === 0 ? 'filter-status--no-results' : ''
	}`;

	return (
		<>
			<div className={cssClasses}>{getStatusText(count, pages)}</div>
		</>
	);
}

function getStatusText(count, lastPage) {
	switch (count) {
		case 0:
			return 'Kein Film gefunden';
		case 1:
			return 'Ein Film gefunden';
		default:
			return `${count} Filme gefunden, ${lastPage} Seiten`;
	}
}
