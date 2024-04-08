import React, { createContext, useContext, useState } from 'react';

export const CardContext = createContext(null);

const Card = ({ children }) => {
	const [toggle, setToggle] = useState(false);

	const subComponentList = Object.keys(Card);

	const subComponents = subComponentList.map((key) => {
		return React.Children.map(children, (child) =>
			child.type.name === key ? child : null
		);
	});

	return (
		<CardContext.Provider value={[toggle, setToggle]}>
			<div className="card">{subComponents.map((component) => component)}</div>
		</CardContext.Provider>
	);
};

const Header = (props) => <div className="card-header">{props.children}</div>;
Card.Header = Header;

const Toggle = (props) => {
	const [toggle, setToggle] = useContext(CardContext);
	return (
		<button onClick={() => setToggle(!toggle)}>
			{toggle ? '[-]' : '[+]'}
			{props.children}
		</button>
	);
};
Card.Toggle = Toggle;

const Body = (props) => {
	const [toggle] = useContext(CardContext);

	return <>{toggle && <div className="card-body">{props.children}</div>}</>;
};
Card.Body = Body;

export default Card;
