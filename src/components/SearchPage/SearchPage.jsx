import { useState } from 'react';
import { useSearchContext, useSearchHook } from '../../reducer/search';
import Loader from '../primitives/Loader/Loader';
import Pagination from '../Pagination/Pagination';
import RecordItem from '../RecordItem/RecordItem';
import List from '../primitives/List/List';
import SearchForm from '../SearchForm/SearchForm';

import classes from './SearchPage.module.css';

export default function SearchPage() {
	//we init the searchReducer and spread the search object into variables
	const [search] = useSearchContext();
	const { pageSize } = search;

	//we use a state that mirrors the response object from the API
	const [
		{ results: searchResults, total_results: totalResults },
		setSearchResults,
	] = useState({ results: [], total_results: 0 });

	//state of the site loading
	const [loading, setLoading] = useState(false);

	//this implements an effect that updates search result when a search parameter changes
	useSearchHook({ search, setSearchResults, setLoading });

	return (
		<div className={classes.searchPage}>
			<SearchForm {...search} />
			{loading ? (
				<Loader />
			) : (
				<>
					{searchResults.length ? (
						<>
							<Pagination totalResults={totalResults} pageSize={pageSize} />
							<List>
								{searchResults.map((item) => (
									<RecordItem
										key={item.IDX}
										id={item.IDX}
										url={item.URL}
										rawData={item}
										{...item}
									/>
								))}
							</List>
						</>
					) : (
						<div
							style={{
								textAlign: 'center',
								fontSize: '2rem',
								fontWeight: 'bold',
							}}
						>
							No Results found, please check your search
						</div>
					)}
				</>
			)}
		</div>
	);
}
