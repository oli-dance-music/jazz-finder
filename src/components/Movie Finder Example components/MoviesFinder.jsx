import { Suspense, lazy } from 'react';
import Movie from './Movie';
import SearchPage from './SearchPage';
import { Link, Route } from 'wouter';
import Loader from '../Loader';

export default function MoviesFinder() {
	const title = 'Filmdatenbank';

	const ContactPage = lazy(() => import('../ContactPage'));

	return (
		<div className="movies-finder">
			<title>{title}</title>
			<nav className="main-navigation">
				<Link to="/" className={(active) => (active ? 'active' : '')}>
					Movie Finder
				</Link>
				<Link to="/contact" className={(active) => (active ? 'active' : '')}>
					Contact
				</Link>
			</nav>
			<Route path="/" component={SearchPage} />
			<Suspense fallback={<Loader />}>
				<Route path="/contact" component={ContactPage} />
			</Suspense>
			<Route path="/movie/:id" component={Movie} />
		</div>
	);
}
