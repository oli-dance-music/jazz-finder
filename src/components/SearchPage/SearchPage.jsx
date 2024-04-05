import { useEffect } from 'react';
import {
	SearchContext,
	doSearch,
	useSearchReducer,
} from '../../reducer/search';
import Loader from '../primitives/Loader/Loader';
import Pagination from '../Pagination/Pagination';
import RecordItem from '../RecordItem/RecordItem';
import List from '../primitives/List/List';
import SearchForm from '../SearchForm/SearchForm';

import classes from './SearchPage.module.css';

export default function SearchPage() {
	const [search, searchDispatch] = useSearchReducer();
	const { searchResults } = search;

	//do search once in the beginning without parameters to load all recordings (paginated)
	useEffect(() => {
		doSearch(search, searchDispatch);
	}, []); // eslint-disable-line

	return (
		<SearchContext.Provider value={[search, searchDispatch]}>
			<div className={classes.searchPage}>
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
			</div>
		</SearchContext.Provider>
	);
}
