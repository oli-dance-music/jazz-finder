fetchExample('Berlin');

async function fetchExample(search) {
	try {
		const response = await fetch(`http://localhost:8000/?search=${search}`);
		console.log(response);

		if (!response.ok) {
			throw new Error('sorry not there');
		}

		const jsonData = await response.json();

		console.log(jsonData);
	} catch (error) {
		console.log('problemo no problemo');
		console.log(error);
	}
}
