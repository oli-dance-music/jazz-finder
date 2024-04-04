import { useEffect } from 'react';
import {
	SearchContext,
	useDoSearch,
	useSearchReducer,
} from '../../reducer/search';
import FilterForm from '../FilterForm/FilterForm';
import Loader from '../primitives/Loader/Loader';
import Pagination from '../Pagination/Pagination';
import RecordItem from '../RecordItem/RecordItem';
import List from '../primitives/List/List';

export default function SearchPage() {
	const [search, searchDispatch] = useSearchReducer();
	const { searchResults } = search;
	const doSearch = useDoSearch(search, searchDispatch);

	useEffect(() => {
		doSearch();
	}, [doSearch]);

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
							<List>
								{searchResults.map((item) => (
									<RecordItem
										key={item.IDX}
										url={item.URL}
										rawData={item}
										{...item.SRC}
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
		</SearchContext.Provider>
	);
}
