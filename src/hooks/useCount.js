import { useState } from 'react';

export function useCount(max, init = 0, min = 0, step = 1) {
	const [count, setCount] = useState(checkValidNumber(init, min, max));

	const setCountSafely = (val) => {
		setCount(Math.max(Math.min(max, val), min));
	};

	const isMax = count >= max;
	const isMin = count <= min;

	const increment = () => {
		setCountSafely(count + step);
	};
	const decrement = () => {
		setCountSafely(count - step);
	};
	const reset = () => {
		setCountSafely(init);
	};

	return {
		count,
		increment,
		decrement,
		setCount: setCountSafely,
		reset,
		isMax,
		isMin,
	};
}

function checkValidNumber(number, min, max) {
	if (typeof number !== 'number' || Number.isNaN(number)) {
		throw new Error('Parameter is not a number');
	}
	if (number < min) {
		throw new Error(`Parameter is below minimum value of ${min} `);
	}
	if (number > max) {
		throw new Error(`Parameter is above maximum value of ${max} `);
	}

	return number;
}

/* 

Schafft einen State moodIndex, der den Array-Index enhält, der für die Ausgabe
des Emojis verwendet wird. Startwert soll 2 sein.
Schreibt dann drei kleine Hilfsfunktionen increment, decrement und reset,
wobei reset den Index auf den Startwert setzen soll, und die beiden anderen Funktionen
den Wert nur bis zum Maximal- bzw. Minimalwert verändern sollen.
Bonus: Die Schlechter und Besser-Buttons sollen disabled sein, wenn das
jeweilige Limit erreicht ist. 

Der nächste Schritt wäre dann die Abstraktion in einen eigenen useCount-Hook.
Der Hook soll Startwert, Minimalwert, Maximalwert und Schrittgröße (mit
default 1) erhalten. Der Hook soll ein Objekt mit den Werten bzw. Funktionen count,
increment, decrement, setCount, reset, isMax und isMin zurückgeben.

*/
