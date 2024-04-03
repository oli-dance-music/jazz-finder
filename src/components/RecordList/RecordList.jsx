import classes from './RecordList.module.css';

export default function RecordList({ children }) {
	return <div className={classes.recordList}>{children}</div>;
}
