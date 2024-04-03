import { useState } from 'react';
import classes from './Toggle.module.css';

export default function Toggle({ title, children }) {
	const [toggle, setToggle] = useState(false);
	return (
		<div className={classes.toggle}>
			<button
				className={classes.toggleButton}
				onClick={() => setToggle(!toggle)}
			>
				{toggle ? '[-]' : '[+]'} {title}
			</button>
			{toggle && <div className={classes.toggleContent}>{children}</div>}
		</div>
	);
}
