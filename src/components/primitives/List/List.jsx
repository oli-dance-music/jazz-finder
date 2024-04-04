import classes from './List.module.css';

export default function List({ children }) {
	return <div className={classes.list}>{children}</div>;
}
