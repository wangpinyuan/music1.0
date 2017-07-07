import React from 'react';
import back from 'public/images/返回.png'
// redux
import {
	connect
} from 'react-redux';
import {
	toggleMusicPlayer
} from '../../actions'

class Bg extends React.Component {
	toggleMusicPlayer() {
		this.props.dispatch(toggleMusicPlayer(false));
	}
	render() {
		return (
			<div>
				<img className='bg' src={this.props.selectedMusic.pic_small}/>
				<div className='mark'></div>
				<div className='back' onClick={this.toggleMusicPlayer.bind(this)}><img src={back}/></div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedMusic: state.selectedMusic,
		showMusicPlayer: state.showMusicPlayer,
	};
}
export default connect(mapStateToProps)(Bg);