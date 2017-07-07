import {
	SELECT_MUSIC,
	TOGGLE_PLAY,
	UPDATE_HISTORYLIST,
	TOGGLE_HISTORYLIST,
	SET_CURRENTTIME,
	SET_TOTALTIME,
	TOGGLE_MUSICPLAYER,
	UPDATE_COLLECTIONLIST,
	CHANGE_PROGRESS
} from '../actions';

const initialState = {
	play: true,
	showHistoryList: false,
	showMusicPlayer: false,
	currentTime: 0,
	totalTime: 0,
	selectedMusic: {},
	// selectedMusic: {
	// 	title: "Super Star",
	// 	singer: "S.H.E",
	// 	album: "《Super Star》",
	// 	pic_small: "https://pic.xiami.net/images/album/img31/2931/321561469601661_1.png",
	// 	song_id: 373568,
	// 	source: "xiami",
	// 	song_url: "http://om5.alicdn.com/931/2931/32156/373568_2319965_l.mp3?auth_key=c3db16e01db23d8435f32fe3cb1e10be-1493175600-0-null",
	// 	lrc: "http://img.xiami.net/lyric/68/373568_1452699017_6454.lrc"
	// },
	historyList: [],
	collectionList: []
};

function changeMusic(state = initialState, action) {
	switch (action.type) {
		case SELECT_MUSIC:
			return Object.assign({}, state, {
				selectedMusic: action.music
			})
		case TOGGLE_PLAY:
			return Object.assign({}, state, {
				play: action.play ? action.play : !state.play
			})
		case UPDATE_HISTORYLIST:
			return Object.assign({}, state, {
				historyList: action.historyList
			})
		case TOGGLE_HISTORYLIST:
			return Object.assign({}, state, {
				showHistoryList: !state.showHistoryList
			})
		case SET_CURRENTTIME:
			return Object.assign({}, state, {
				currentTime: action.currentTime
			})
		case SET_TOTALTIME:
			return Object.assign({}, state, {
				totalTime: action.totalTime
			})
		case TOGGLE_MUSICPLAYER:
			return Object.assign({}, state, {
				showMusicPlayer: action.value
			})
		case UPDATE_COLLECTIONLIST:
			return Object.assign({}, state, {
				collectionList: action.collectionList
			})
		case CHANGE_PROGRESS:
			return Object.assign({}, state, {
				currentTime: action.currentTime
			})
		default:
			return state;
	}
}
export default changeMusic;