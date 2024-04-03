import React from 'react';
import ReactDOM from 'react-dom/client';
//import MoviesFinder from './components/Movie Finder Example components/MoviesFinder';
import JazzFinder from './components/JazzFinder';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<h1 style={{ textAlign: 'center' }}>Jazz Finder</h1>
		<JazzFinder />
		<div style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
			...more coming soon...
		</div>
	</React.StrictMode>
);
