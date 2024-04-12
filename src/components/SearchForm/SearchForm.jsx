import { useEffect, useState } from 'react';
import { useSearchContext } from '../../reducer/search';
import classes from './SearchForm.module.css';

export default function SearchForm() {
	const [{ searchTerm, yearStart, yearEnd }, searchDispatch] =
		useSearchContext();

	const [searchTermInput, setSearchTermInput] = useState(searchTerm);
	useEffect(() => {
		setSearchTermInput(searchTerm);
	}, [searchTerm]);

	const [yearStartInput, setYearStartInput] = useState(yearStart);
	useEffect(() => {
		setYearStartInput(yearStart);
	}, [yearStart]);

	const [yearEndInput, setYearEndInput] = useState(yearEnd);
	useEffect(() => {
		setYearEndInput(yearEnd);
	}, [yearEnd]);

	return (
		<form
			className={classes.searchForm}
			onSubmit={(e) => {
				searchDispatch({
					action: 'set',
					parameter: 'searchTerm',
					payload: searchTermInput,
				});
				searchDispatch({
					action: 'set',
					parameter: 'yearStart',
					payload: yearStartInput,
				});
				searchDispatch({
					action: 'set',
					parameter: 'yearEnd',
					payload: yearEndInput,
				});
				e.preventDefault();
			}}
		>
			<ul>
				<li>
					Use &quot;,&quot; to search for multiple terms, eg.
					&quot;Dinah,Honeysuckle Rose&quot; finds all instances of both songs
				</li>
				<li>
					Use &quot;+&quot; to search for a combination of multiple terms, eg.
					&quot;Fats Waller+Honeysuckle Rose&quot; finds all instances of
					HoneySuckle Rose with Fats Waller
				</li>
			</ul>
			<div className={classes.formElement}>
				<input
					id="searchTerm"
					value={searchTermInput}
					onChange={(e) => setSearchTermInput(e.target.value)}
				/>
			</div>
			{
				<div className={classes.formElement}>
					<label htmlFor="yearStart">Year</label>
					<input
						id="yearStart"
						value={yearStartInput}
						onChange={(e) => setYearStartInput(e.target.value)}
						type="number"
						size={4}
					/>
					<label htmlFor="yearEnd">to</label>
					<input
						id="yearEnd"
						value={yearEndInput}
						onChange={(e) => setYearEndInput(e.target.value)}
						type="number"
						size={4}
					/>
				</div>
			}
			<div className={classes.formElement}>
				<button type="submit">Search</button>
				<button
					className={classes.resetButton}
					onClick={(e) => {
						searchDispatch({
							action: 'reset',
						});
						e.preventDefault();
					}}
				>
					Reset
				</button>
			</div>
		</form>
	);
}
