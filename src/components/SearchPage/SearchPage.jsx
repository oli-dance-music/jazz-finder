import { useEffect } from 'react';
import {
	SearchContext,
	useDoSearch,
	useSearchReducer,
} from '../../reducer/search';
import Loader from '../primitives/Loader/Loader';
import Pagination from '../Pagination/Pagination';
import RecordItem from '../RecordItem/RecordItem';
import List from '../primitives/List/List';
import SearchForm from '../SearchForm/SearchForm';

export default function SearchPage() {
	const [search, searchDispatch] = useSearchReducer();
	const { searchResults } = search;
	const doSearch = useDoSearch(search, searchDispatch);

	useEffect(() => {
		doSearch();
	}, [doSearch]);
	}, [doSearch]);

	return (
		<SearchContext.Provider value={[search, searchDispatch]}>
			<SearchForm {...search} />
			{search.loading ? (
				<Loader />
			) : (
				<>
					{searchResults.length ? (
						<>
							<Pagination />
							<List>
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
