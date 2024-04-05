import classes from './Grid.module.css';

export default function Grid({ children }) {
	return <div className={classes.grid}>{children}</div>;
}
