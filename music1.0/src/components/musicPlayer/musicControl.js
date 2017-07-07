import React from 'react';
// 
import go from 'public/images/播放48.png'
import stop from 'public/images/暂停48.png'
import list from 'public/images/音乐列表.png'
import previous from 'public/images/上一首.png'
import next from 'public/images/下一首.png'
import collection from 'public/images/收藏.png'
import alreadyCollection from 'public/images/已收藏.png'
// redux
import {
	connect
} from 'react-redux';
import {
	selectMusic,
	togglePlay,
	updateHistoryList,
	toggleHistoryList,
	setCurrentTime,
	setTotalTime,
	updateCollectionList
} from '../../actions'
class MusicControl extends React.Component {
	togglePlay(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch(togglePlay());
	}
	toggleHistoryList(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch(toggleHistoryList());
	}
	preventMusic(e) {
		e.preventDefault();
		e.stopPropagation();
		var index = this.props.selectedMusic.history;
		var total = this.props.historyList.length;
		if (index == 0) {
			// console.log(this.props.historyList[total - 1])
			this.props.dispatch(selectMusic(this.props.historyList[total - 1]));
		} else {
			// console.log(this.props.historyList[index - 1])
			this.props.dispatch(selectMusic(this.props.historyList[index - 1]));
		}
		this.props.dispatch(togglePlay(true));

	}
	nextMusic(e) {
		e.preventDefault();
		e.stopPropagation();
		var index = this.props.selectedMusic.history;
		var total = this.props.historyList.length;
		if (index == total - 1) {
			this.props.dispatch(selectMusic(this.props.historyList[0]));
		} else {
			this.props.dispatch(selectMusic(this.props.historyList[index + 1]));
		}
		this.props.dispatch(togglePlay(true));
	}
	collectMusic(e) {
		e.preventDefault();
		e.stopPropagation();
		let collectionList = JSON.parse(localStorage.getItem('collectionList')) || [];
		this.updateCollection(this.props.selectedMusic, collectionList)
			.then((arr) => {
				localStorage.setItem('collectionList', JSON.stringify(arr));
				this.props.dispatch(updateCollectionList(arr));
			})
	}
	updateCollection(music, arr) {
		return new Promise((resolve, reject) => {
			if (arr.length === 0) {
				arr.push(music);
				resolve(arr);
				return;
			}
			for (var i = 0; i < arr.length; i++) {
				if (music.song_id === arr[i].song_id) {
					arr.splice(i, 1);
					resolve(arr);
					return;
				}
			}
			arr.push(music);
			resolve(arr);
			return;
		})
	}
	componentWillMount() {
		let collectionList = JSON.parse(localStorage.getItem('collectionList')) || [];
		this.props.dispatch(updateCollectionList(collectionList));
	}
	hadCollection(music) {
		for (var i = 0; i < this.props.collectionList.length; i++) {
			if (music.song_id == this.props.collectionList[i].song_id) {
				return true;
			}
		}
		return false;
	}
	render() {
		return (
			<div className="musicControl">
				<div className='collection'><img src={this.hadCollection(this.props.selectedMusic) ? alreadyCollection : collection} onClick={this.collectMusic.bind(this)}/></div>
				<div className='previous' onClick={this.preventMusic.bind(this)}><img src={previous}/></div>
				<div className='go' onClick={this.togglePlay.bind(this)}><img src={this.props.play ? stop : go}/></div>
				<div className='next' onClick={this.nextMusic.bind(this)}><img src={next}/></div>
				<div className='list' onClick={this.toggleHistoryList.bind(this)}><img src={list}/></div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		play: state.play,
		selectedMusic: state.selectedMusic,
		historyList: state.historyList,
		collectionList: state.collectionList
	};
}

export default connect(mapStateToProps)(MusicControl);