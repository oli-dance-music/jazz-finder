import SearchPage from './SearchPage/SearchPage';

export default function JazzFinder() {
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Jazz Finder</h1>
			<SearchPage />
			<div
				style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}
			>
				&copy; {new Date().getFullYear()} Oliver Fuhrmann
			</div>
		</>
	);
}
