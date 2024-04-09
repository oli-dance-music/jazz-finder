import { Helmet } from 'react-helmet-async';

//currently not working properly and not being used

/* import { createContext, useContext, useState } from 'react';

export const HeaderContext = createContext(null);
export function useHeaderContext() {
	return useContext(HeaderContext);
}

export function useHeaderTitle() {
	return useState('Jazz Finder');
} */

export default function Header() {
	const title = 'Jazz Finder';

	return (
		<div>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
		</div>
	);
}
