import React from 'react';
import 'public/less/player.less'
import go from '../public/images/播放.png'
import stop from '../public/images/暂停.png'
import list from '../public/images/音乐列表.png'
// redux
import {
	connect
} from 'react-redux';
import {
	togglePlay,
	updateHistoryList,
	toggleHistoryList,
	setCurrentTime,
	setTotalTime,
	toggleMusicPlayer
} from '../actions'

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			historyList: [],
			rotate: null,
			deg: 0
		}
	}
	componentDidMount() {
		if (Boolean(this.props.selectedMusic.length)) {
			this.refs.player.style.cssText = 'height:55px;'
		}
		var _this = this;
		setInterval(function() {
			if (!_this.refs.audio) {
				return;
			} else {
				_this.props.dispatch(setCurrentTime(_this.refs.audio.currentTime))
				_this.props.dispatch(setTotalTime(_this.refs.audio.duration))
			}
		}, 1000)
	}
	componentWillReceiveProps(nextProps) {

		// 是否渲染player？
		if (nextProps.selectedMusic) {
			this.refs.player.style.cssText = 'height:55px;'
		}

		// 更新historyList
		this.pushData(nextProps.selectedMusic, this.state.historyList)
			.then((arr) => {
				this.props.dispatch(updateHistoryList(arr));
			})

		// 旋转
		if (nextProps.play) {
			const _this = this;
			clearInterval(this.state.rotate);
			this.state.rotate = setInterval(function() {
				_this.refs.image.style.transform = 'rotate(' + _this.state.deg + 'deg)';
				_this.setState({
					deg: _this.state.deg + 0.1
				})
			}, 10)
		} else {
			clearInterval(this.state.rotate);
		}

		/*解决 -> 多首歌切换时旋转bug*/
		if (this.props.selectedMusic.song_id !== nextProps.selectedMusic.song_id) {
			clearInterval(this.state.rotate);
			this.setState({
				deg: 0
			})
		}

		// audio播放？
		if (!this.refs.audio) {
			return;
		}
		if (nextProps.play) {
			// this.refs.audio.currentTime = nextProps.currentTime;
			this.refs.audio.play();
		} else {
			this.refs.audio.pause()
		}

		// 只有拖动进度条时 才调用audio接口
		// 不然播放会卡顿
		if (Math.abs(this.refs.audio.currentTime - nextProps.currentTime) > 10) {
			this.refs.audio.currentTime = nextProps.currentTime;
		}
	}
	componentDidUpdate() {
		var _this = this;
		setTimeout(function() {
			_this.props.dispatch(setTotalTime(_this.refs.audio.duration))
		}, 1000)

	}
	togglePlay(e) {
		e.preventDefault();
		e.stopPropagation();
		if (!this.refs.audio) {
			return;
		}
		this.props.dispatch(togglePlay());
	}
	pushData(item, arr) {
		return new Promise((resolve, reject) => {
			if (arr.length == 0) {
				item.history = parseInt(arr.length, 10);
				arr.push(item);
				return;
			}
			for (var i = 0; i < arr.length; i++) {
				if (item.song_id === arr[i].song_id) {
					resolve(arr);
					return;
				}
			}
			item.history = parseInt(arr.length, 10);
			arr.push(item);
			resolve(arr);
		})
	}
	toggleHistoryList(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.props.historyList.length != 0) {
			this.props.dispatch(toggleHistoryList());
		}
	}
	toggleMusicPlayer(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch(toggleMusicPlayer(true));
	}
	render() {
		return (
			<div className='player' ref='player' onClick={this.toggleMusicPlayer.bind(this)}>
				<div className='img'>
					<img ref='image' src={this.props.selectedMusic.pic_small}/>
				</div>	
				<div className='desc'>
					<div className='title'>{this.props.selectedMusic.title}</div>
					<div className='singer'>{this.props.selectedMusic.singer}</div>
				</div>	
				<div className='play' onClick={this.togglePlay.bind(this)}>
					<img src={this.props.play ? stop : go} />
				</div>	
				<div className='list' onClick={this.toggleHistoryList.bind(this)}>
					<img src={list} />
				</div>	
				{/* 防止媒体加载失败，获取值之前不渲染audio */
					this.props.selectedMusic.song_url ? 
					<audio ref='audio' loop='loop' autoPlay='autoplay' src={this.props.selectedMusic.song_url}>
					</audio> : 
					<div></div>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		play: state.play,
		showHistoryList: state.showHistoryList,
		selectedMusic: state.selectedMusic,
		historyList: state.historyList,
		showMusicPlayer: state.showMusicPlayer,
		currentTime: state.currentTime
	};
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		selectMusic: () => dispatch(selectMusic()),
// 		updateHistoryList: () => dispatch(updateHistoryList()),
// 		togglePlay: () => dispatch(togglePlay()),
// 		toggleHistoryList: () => dispatch(toggleHistoryList()),
// 	}
// }

export default connect(mapStateToProps)(Player);