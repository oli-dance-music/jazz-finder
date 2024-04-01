const moods = ['😡', '🙁', '😐', '🙂', '🥳'];

export default function VoteDisplay({ vote, min, max, count }) {
	const voteIndex = Math.max(
		0,
		Math.ceil((vote / (max - min)) * moods.length) - 1
	);

	return (
		<div className="vote_display">
			<big>
				{vote.toFixed(1)}{' '}
				<span
					className="vote_display__image"
					role="img"
					aria-label="Stimmungsanzeige"
				>
					{moods[voteIndex]}
				</span>
			</big>
			<br />
			<small>
				<em>{count} Votes</em>
			</small>
		</div>
	);
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
