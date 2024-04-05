import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'redaxios';

export const SearchContext = createContext(null);

export function useSearchContext() {
	return useContext(SearchContext);
}

//this handles all the search form changes
function searchReducer(search, message) {
	switch (message.action) {
		case 'set':
			return { ...search, [message.parameter]: message.payload };
		case 'reset':
			return getInitialSearch();
	}
}

//this handles the searchResult
//const [searchResults, setSearchResults] = useState([]);

export function useSearchReducer() {
	return useReducer(searchReducer, null, getInitialSearch);
}

export function getInitialSearch() {
	return {
		searchTerm: '',
		yearStart: '',
		yearEnd: '',
		currentPage: 1,
		pageSize: 10,
	};
}

export function useSearchHook({ search, setSearchResults, setLoading }) {
	const { searchTerm, yearStart, yearEnd, currentPage, pageSize } = search;

	//do search once in the beginning without parameters to load all recordings (paginated)
	useEffect(() => {
		setLoading(true);
		let ignore = false; // setup variable to ignore api calls if there is a newer search request

		const fetchData = async () => {
			try {
				//accessing mock api that is hosted serverless on the same url
				const apiUrl = `${
					new URL(window.location.href).origin
				}/api/recordings?searchTerm=${searchTerm}`;

				const params = {
					//searchTerm, disabled: if sending searchTerm as a param, it will not work, since the escaping of the space
					yearStart,
					yearEnd,
					pageSize,
					currentPage,
				};
				const { data } = await axios.get(apiUrl, {
					params,
				});

				//if ignore is set, we ignore the data, because a newer request is in progress
				if (ignore) {
					return;
				}
				console.log(data);
				setSearchResults(data);

				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
				setLoading(false);
			}
		};
		fetchData(); //doSearch(search, searchDispatch);

		//set a return function that sets ignore true
		return () => (ignore = true);
	}, [searchTerm, yearStart, yearEnd, currentPage, pageSize]); // eslint-disable-line
}
