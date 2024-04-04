import { useDoSearch, useSearchContext } from '../../reducer/search';
import classes from './SearchForm.module.css';

export default function SearchForm({ searchTerm, yearStart, yearEnd }) {
	const [search, searchDispatch] = useSearchContext();

	const doSearch = useDoSearch(search, searchDispatch);

	return (
		<form
			className={classes.searchForm}
			onSubmit={(e) => {
				doSearch();
				e.preventDefault();
			}}
		>
			<div className={classes.formElement}>
				<label htmlFor="searchTerm">Artist, Song, Performers</label>
				<input
					id="searchTerm"
					type="search"
					value={searchTerm}
					onChange={(e) =>
						searchDispatch({
							action: 'set',
							parameter: 'searchTerm',
							payload: e.target.value,
						})
					}
				/>
			</div>
			<div className={classes.formElement}>
				<label htmlFor="yearStart">Year</label>
				<input
					id="yearStart"
					type="number"
					size={4}
					value={yearStart}
					onChange={(e) =>
						searchDispatch({
							action: 'set',
							parameter: 'yearStart',
							payload: e.target.value,
						})
					}
				/>{' '}
				<label htmlFor="yearEnd">to</label>
				<input
					id="yearEnd"
					type="number"
					value={yearEnd}
					size={4}
					onChange={(e) =>
						searchDispatch({
							action: 'set',
							parameter: 'yearEnd',
							payload: e.target.value,
						})
					}
				/>
			</div>
			<div className={classes.formElement}>
				<button type="submit">Search</button>
				<button
					className={classes.resetButton}
					onClick={() =>
						searchDispatch({
							action: 'reset',
						})
					}
				>
					Reset
				</button>
			</div>
		</form>
	);
}
