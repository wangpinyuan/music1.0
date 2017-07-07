export const SELECT_MUSIC = 'SELECT_MUSIC';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const UPDATE_HISTORYLIST = 'UPDATE_HISTORYLIST';
export const TOGGLE_HISTORYLIST = 'TOGGLE_HISTORYLIST';
export const SET_CURRENTTIME = 'SET_CURRENTTIME';
export const SET_TOTALTIME = 'SET_TOTALTIME';
export const TOGGLE_MUSICPLAYER = 'TOGGLE_MUSICPLAYER';
export const UPDATE_COLLECTIONLIST = 'UPDATE_COLLECTIONLIST';
export const CHANGE_PROGRESS = 'CHANGE_PROGRESS';

export function selectMusic(music) {
	return {
		type: SELECT_MUSIC,
		music
	}
}
export function togglePlay(play) {
	return {
		type: TOGGLE_PLAY,
		play
	}
}
export function updateHistoryList(historyList) {
	return {
		type: UPDATE_HISTORYLIST,
		historyList
	}
}
export function toggleHistoryList() {
	return {
		type: TOGGLE_HISTORYLIST
	}
}
export function toggleMusicPlayer(value) {
	return {
		type: TOGGLE_MUSICPLAYER,
		value
	}
}
export function setCurrentTime(currentTime) {
	return {
		type: SET_CURRENTTIME,
		currentTime
	}
}
export function setTotalTime(totalTime) {
	return {
		type: SET_TOTALTIME,
		totalTime
	}
}
export function updateCollectionList(collectionList) {
	return {
		type: UPDATE_COLLECTIONLIST,
		collectionList
	}
}
export function changeProgress(currentTime) {
	return {
		type: CHANGE_PROGRESS,
		currentTime
	}
}