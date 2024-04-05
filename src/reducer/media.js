import { createContext, useContext, useReducer } from 'react';

export const MediaContext = createContext(null);

export function useMediaContext() {
	return useContext(MediaContext);
}

export function mediaReducer(media, message) {
	switch (message.action) {
		case 'play':
			//console.log(message.payload);
			return { ...media, playing: message.payload };
	}
}

export function useMediaReducer() {
	return useReducer(mediaReducer, null, getInitialMedia);
}

export function getInitialMedia() {
	return {
		playing: '',
	};
}
