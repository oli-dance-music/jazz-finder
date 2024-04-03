import { useState } from 'react';
import allRecordings from '../../node-server/JazzData.json';

export default function useRecordings() {
	const [filteredRecordings, setFilteredRecordings] = useState(allRecordings);

	return filteredRecordings.slice(0, 20);
}
