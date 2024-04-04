import { useEffect } from 'react';
import {
	SearchContext,
	useDoSearch,
	useSearchReducer,
} from '../../reducer/search';
import FilterForm from '../FilterForm/FilterForm';
import Loader from '../Loader';
import Pagination from '../Pagination/Pagination';
import RecordItem from '../RecordItem/RecordItem';
import RecordList from '../RecordList/RecordList';

export default function SearchPage() {
	const [search, searchDispatch] = useSearchReducer();
	const { searchResults } = search;
	const doSearch = useDoSearch(search, searchDispatch);

	useEffect(() => {
		doSearch();
	}, []);

	return (
		<SearchContext.Provider value={[search, searchDispatch]}>
			<FilterForm {...search} />
			{search.loading ? (
				<Loader />
			) : (
				<>
					{searchResults.length ? (
						<>
							<Pagination />
							<RecordList>
								{searchResults.map((item) => (
									<RecordItem
										key={item.IDX}
										url={item.URL}
										rawData={item}
										{...item.SRC}
									/>
								))}
							</RecordList>
						</>
					) : (
						<div>No Results found, please check your search</div>
					)}
				</>
			)}
		</SearchContext.Provider>
	);
}
