import { useSearchContext } from '../../reducer/search';
import classes from './Pagination.module.css';
export default function Pagination({ totalResults, pageSize }) {
	const [search, searchDispatch] = useSearchContext();
	const { currentPage } = search;

	//calculate total number of pages
	const totalPages = Math.ceil(parseInt(totalResults) / parseInt(pageSize));

	function setCurrentPage(value) {
		searchDispatch({
			action: 'set',
			parameter: 'currentPage',
			payload: value,
		});
	}

	return (
		<>
			<div className={classes.filterStatus}>
				Found {totalResults} items, showing {pageSize} per page:
			</div>
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
		</>
	);
}
