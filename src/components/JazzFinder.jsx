import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import Loader from './Loader';
import axios from 'redaxios';
import RecordList from './RecordList/RecordList';
import Pagination from './Pagination/Pagination';
import RecordItem from './RecordItem/RecordItem';
import FilterForm from './FilterForm/FilterForm';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export const SearchContext = createContext(null);
export function useSearchContext() {
	return useContext(SearchContext);
}

export default function JazzFinder() {
	//const urlObj = new URL(window.location.href);

	/* 	const [searchTerm, setSearchTerm] = useState(
		urlObj.searchParams.get('search') ?? ''
	);
 */
	const [search, searchDispatch] = useReducer(
		searchReducer,
		null,
		getInitialSearch
	);

	function searchReducer(search, message) {
		switch (message.action) {
			case 'setSearchTerm':
				return { ...search, searchTerm: message.payload };
			case 'setYear':
				return { ...search, year: message.payload };
			case 'setPage':
				return { ...search, page: message.payload }; //this will not make sure that the page exists
		}
	}

	function getInitialSearch() {
		return {
			searchTerm: '',
			year: '',
		};
	}

	const [searchResults, setSearchResults] = useState([]);

	const [loading, setLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(20);
	const totalPages = Math.ceil(totalResults / pageSize);

	const debouncedSearch = useDebouncedValue(search, 600);

	useSearch(
		debouncedSearch,
		setLoading,
		setSearchResults,
		setTotalResults,
		currentPage,
		setCurrentPage,
		pageSize
	);

	if (loading) {
		return <Loader />;
	}

	return (
		<SearchContext.Provider value={searchDispatch}>
			<div>
				<FilterForm {...search} />

				{loading ? (
					<Loader />
				) : (
					<>
						<p>
							Found {totalResults} items, showing {pageSize} per page:
						</p>

						{Array.isArray(searchResults) && searchResults.length && (
							<>
								<Pagination
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									totalPages={totalPages}
								/>
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
						)}
					</>
				)}
			</div>
		</SearchContext.Provider>
	);
}

function useSearch(
	debouncedSearch,
	setLoading,
	setSearchResults,
	setTotalResults,
	currentPage,
	setCurrentPage,
	pageSize
) {
	useEffect(() => {
		setLoading(true);
		console.log('loading...');
		const fetchData = async () => {
			try {
				//axios
				const { data } = await axios.get(
					'http://localhost:3000/api/recordings',
					{
						params: {
							searchTerm: debouncedSearch.searchTerm,
							year: debouncedSearch.year,
							page_size: pageSize,
							page: currentPage,
						},
					}
				);
				console.log('loaded!');
				console.log(data);
				setSearchResults(data.results);
				setTotalResults(data.total_results);
				setCurrentPage(data.current_page);
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
				setLoading(false);
			}
		};
		fetchData();
	}, [debouncedSearch, currentPage]);
}
