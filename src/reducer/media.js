import { createContext, useContext, useReducer } from 'react';

export const MediaContext = createContext(null);

export function useMediaContext() {
	return useContext(MediaContext);
}

export function mediaReducer(media, message) {
	// fir emptying playlist we dont need the logic afterwards
	if (message.action === 'emptyPlaylist') {
		return {
			playing: null,
			playlist: [],
		};
	}
	//check if song is already in playlist
	let playlistIndex = media.playlist.findIndex(
		({ id }) => id === message.payload.id
	);
	const AddToPlaylist = playlistIndex < 0;

	switch (message.action) {
		case 'play':
			//if song is not in playlist, we add it and set the index to playlist.length
			if (AddToPlaylist) {
				playlistIndex = media.playlist.length;
			}
			return {
				playing: playlistIndex,
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
				playing:
					media.playing &&
					media.playlist[media.playing].id === message.payload.id
						? null
						: media.playing,
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
	let playlist = null;

	console.log('initial playlist');

	try {
		playlist = JSON.parse(localStorage.getItem('playlist'));
		playlist = Array.isArray(playlist) ? playlist : [];
	} catch {
		console.log('Fehlerhafte Daten. Resetting playlist');
		playlist = [];
	}

	console.log(playlist);

	return {
		playing: null,
		playlist,
	};
}
