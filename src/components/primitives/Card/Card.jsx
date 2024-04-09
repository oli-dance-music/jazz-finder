import { createContext, useContext, useState } from 'react';
import classes from './Card.module.css';

export const CardContext = createContext(null);

const Card = ({ children }) => {
	const [toggle, setToggle] = useState(false);

	return (
		<CardContext.Provider value={[toggle, setToggle]}>
			<div className={classes.card}>{children}</div>
		</CardContext.Provider>
	);
};

const Header = (props) => (
	<div className={classes.cardHeader}>{props.children}</div>
);
Card.Header = Header;

const Toggle = (props) => {
	const [toggle, setToggle] = useContext(CardContext);
	return (
		<button
			className={classes.toggleButton}
			onClick={() => setToggle(!toggle)}
			disabled={props.disabled}
		>
			{toggle ? '[-]' : '[+]'}
			{props.children}
		</button>
	);
};
Card.Toggle = Toggle;

const Body = (props) => {
	const [toggle] = useContext(CardContext);

	return (
		<>{toggle && <div className={classes.cardBody}>{props.children}</div>}</>
	);
};
Card.Body = Body;

export default Card;
