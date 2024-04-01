export default function Pagination({ page, setPage, pages }) {
	if (!pages) {
		return false;
	}

	return (
		<div className="filter__pagination">
			<button onClick={() => setPage(1)} disabled={page == 1 && 'disabled'}>
				First
			</button>{' '}
			<button
				onClick={() => setPage(page - 1)}
				disabled={page == 1 && 'disabled'}
			>
				Previous
			</button>{' '}
			<button
				onClick={() => setPage(page + 1)}
				disabled={page == pages && 'disabled'}
			>
				Next
			</button>{' '}
			<button
				onClick={() => setPage(pages)}
				disabled={page == pages && 'disabled'}
			>
				Last
			</button>{' '}
		</div>
	);
}
