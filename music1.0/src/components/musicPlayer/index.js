import React from 'react';
// 
import MusicInfo from './musicInfo.js'
import MusicLrc from './musicLrc.js'
import MusicProgress from './musicProgress.js'
import MusicControl from './musicControl.js'
import Bg from './bg.js'
// 
import 'public/less/musicPlayer.less'
// redux
import {
	connect
} from 'react-redux';

class MusicPlayer extends React.Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.showMusicPlayer) {
			this.refs.musicPlayer.style.cssText = "height:100%"
		} else {
			this.refs.musicPlayer.style.cssText = "height:0"
		}
	}

	render() {
		return (
			<div className='musicPlayer' ref='musicPlayer'>
				<MusicInfo />
				<MusicLrc />
				<MusicProgress />
				<MusicControl />
				<Bg />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		showMusicPlayer: state.showMusicPlayer
	};
}
export default connect(mapStateToProps)(MusicPlayer);