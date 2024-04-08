import { createContext, useContext, useReducer } from 'react';

export const MediaContext = createContext(null);

export function useMediaContext() {
	return useContext(MediaContext);
}

export function mediaReducer(media, message) {
	//check if song is already in playlist
	const AddToPlaylist = !media.playlist.some(
		({ id }) => id === message.payload.id
	);
	switch (message.action) {
		case 'play':
			console.log(message.payload);

			return {
				...media,
				playing: message.payload,
				playlist: AddToPlaylist
					? [...media.playlist, message.payload]
					: media.playlist,
			};
		case 'addToPlaylist':
			return {
				...media,
				playlist: AddToPlaylist
					? [...media.playlist, message.payload]
					: media.playlist,
			};
		case 'removeFromPlaylist':
			return {
				...media,
				playlist: media.playlist.filter(({ id }) => id !== message.payload.id),
			};
	}
}

export function useMediaReducer() {
	return useReducer(mediaReducer, null, getInitialMedia);
}

/* 
TYPE recordItem {
..recordItem,
src: string,
}

*/

export function getInitialMedia() {
	return {
		playing: null,
		playlist: [],
	};
}
