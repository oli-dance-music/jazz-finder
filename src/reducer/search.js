import { createContext, useContext, useReducer } from 'react';
import axios from 'redaxios';

export const SearchContext = createContext(null);

export function useSearchContext() {
	return useContext(SearchContext);
}

function searchReducer(search, message) {
	switch (message.action) {
		case 'set':
			return { ...search, [message.parameter]: message.payload };
		case 'reset':
			return getInitialSearch();
	}
}

export function useSearchReducer() {
	return useReducer(searchReducer, null, getInitialSearch);
}

export function getInitialSearch() {
	return {
		searchTerm: '',
		yearStart: '',
		yearEnd: '',
		loading: false,
		searchResults: [],
		totalResults: 0,
		currentPage: 1,
		pageSize: 10,
		totalPages: 0,
	};
}

export function useDoSearch(
	{ searchTerm, yearStart, yearEnd, currentPage, pageSize },
	searchDispatch
) {
	function setLoading(value) {
		searchDispatch({ action: 'set', parameter: 'loading', payload: value });
	}
	return () => {
		setLoading(true);

		const fetchData = async () => {
			try {
				//accessing mock api that is hosted serverless on the same url
				const apiUrl = `${new URL(window.location.href).origin}/api/recordings`;
				const params = {
					searchTerm,
					yearStart,
					yearEnd,
					pageSize,
					currentPage,
				};
				const { data } = await axios.get(apiUrl, {
					params,
				});
				searchDispatch({
					action: 'set',
					parameter: 'searchResults',
					payload: data.results,
				});
				searchDispatch({
					action: 'set',
					parameter: 'totalResults',
					payload: data.total_results,
				});
				searchDispatch({
					action: 'set',
					parameter: 'totalPages',
					payload: data.total_pages,
				});
				setLoading(false);
			} catch (error) {
				console.log(`Error: ${error}`);
				setLoading(false);
			}
		};
		fetchData();
	};
}
