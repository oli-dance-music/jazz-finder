import { useRef } from 'react';
import { useSearchContext } from '../../reducer/search';
import classes from './SearchForm.module.css';

export default function SearchForm({ searchTerm, yearStart, yearEnd }) {
	const [, searchDispatch] = useSearchContext();

	/* 
		TODO: I thought we need to use uncontrolled inputs because 
		we only want to change the state once the form is submitted
		This becomes a problem when I update searchTerm state through 
		another component (eg. recordItem), then the input doesnt update
		maybe find a way to use controlled inputs or to update it via an effect
	*/
	const searchTermRef = useRef(searchTerm);
	const yearStartRef = useRef(yearStart);
	const yearEndRef = useRef(yearEnd);

	return (
		<form
			className={classes.searchForm}
			onSubmit={(e) => {
				searchDispatch({
					action: 'set',
					parameter: 'searchTerm',
					payload: searchTermRef.current.value,
				});
				searchDispatch({
					action: 'set',
					parameter: 'yearStart',
					payload: yearStartRef.current.value,
				});
				searchDispatch({
					action: 'set',
					parameter: 'yearEnd',
					payload: yearEndRef.current.value,
				});
				e.preventDefault();
			}}
		>
			<ul>
				<li>
					Use "," to search for multiple terms, eg. "Dinah,Honeysuckle Rose"
					finds all instances of both songs{' '}
				</li>
				<li>
					Use "+" to search for a combination of multiple terms, eg. "Fats
					Waller+Honeysuckle Rose" finds all instances of HoneySuckle Rose with
					Fats Waller
				</li>
			</ul>
			<div className={classes.formElement}>
				<label htmlFor="searchTerm">Artist, Song, Performers</label>
				<input id="searchTerm" ref={searchTermRef} defaultValue={searchTerm} />
			</div>
			{
				<div className={classes.formElement}>
					<label htmlFor="yearStart">Year</label>
					<input
						id="yearStart"
						ref={yearStartRef}
						defaultValue={yearStart}
						type="number"
						size={4}
					/>
					<label htmlFor="yearEnd">to</label>
					<input
						id="yearEnd"
						ref={yearEndRef}
						defaultValue={yearEnd}
						type="number"
						size={4}
					/>
				</div>
			}
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
