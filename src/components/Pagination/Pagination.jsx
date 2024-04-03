import classes from './Pagination.module.css';
export default function Pagination({
	currentPage,
	setCurrentPage,
	totalPages,
}) {
	if (!totalPages) {
		return false;
	}

	return (
		<div className={classes.pagination}>
			<button
				onClick={() => setCurrentPage(1)}
				disabled={currentPage == 1 && 'disabled'}
			>
				{'|<'}
			</button>
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage == 1 && 'disabled'}
			>
				{'<'}
			</button>
			<span className={classes.currentPage}>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage == totalPages && 'disabled'}
			>
				{'>'}
			</button>
			<button
				onClick={() => setCurrentPage(totalPages)}
				disabled={currentPage == totalPages && 'disabled'}
			>
				{'>|'}
			</button>
		</div>
	);
}
