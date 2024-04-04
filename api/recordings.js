import allRecordings from './data.json' assert { type: 'json' };

export default function handler(request, response) {
	const {
		searchTerm = '',
		year = '',
		currentPage = 1,
		pageSize = 20,
	} = request.query;

	// Array mit Einträgen bzw. leerer Array, falls searchTerm leer ist
	const filteredRecordings = getRecordings(searchTerm, year);

	return response.json(
		buildResponse(filteredRecordings, currentPage, pageSize)
	);
}

function getRecordings(searchTerm = '', year = '') {
	const regExp = new RegExp(searchTerm, 'i');

	let filteredRecordings = allRecordings;

	if (searchTerm.length) {
		filteredRecordings = filteredRecordings.filter(
			({ Title, Artist, SRC }) =>
				regExp.test(Title) || regExp.test(Artist) || regExp.test(SRC.Performers)
		);
	}
	if (year.length) {
		filteredRecordings = filteredRecordings.filter(({ Year }) => Year == year);
	}
	return filteredRecordings;
}

function buildResponse(recordings, currentPage = 1, pageSize = 10) {
	const lastPage = Math.ceil(recordings.length / pageSize);
	//if the current page is too high, set it to the last existing page, if it is too low set it to 1
	currentPage = Math.max(1, Math.min(currentPage, lastPage));

	const start = (currentPage - 1) * pageSize;
	const end = start + pageSize;
	return {
		results: recordings.slice(start, end),
		current_page: currentPage,
		page_size: pageSize,
		total_results: recordings.length,
		total_pages: lastPage,
	};
}
