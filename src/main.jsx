import React from 'react';
import ReactDOM from 'react-dom/client';
import JazzFinder from './components/JazzFinder';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			<JazzFinder />
		</HelmetProvider>
	</React.StrictMode>
);
