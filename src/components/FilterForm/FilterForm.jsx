import classes from './FilterForm.module.css';
import { useSearchContext } from '../JazzFinder';

export default function FilterForm({ searchTerm, year }) {
	const searchDispatch = useSearchContext();

	return (
		<form
			className={classes.filterForm}
			onSubmit={(e) => {
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
							action: 'setSearchTerm',
							payload: e.target.value,
						})
					}
				/>
			</div>
			<div className={classes.formElement}>
				<label htmlFor="year">Year</label>
				<input
					id="year"
					type="number"
					value={year}
					onChange={(e) =>
						searchDispatch({
							action: 'setYear',
							payload: e.target.value,
						})
					}
				/>
			</div>
		</form>
	);
}
