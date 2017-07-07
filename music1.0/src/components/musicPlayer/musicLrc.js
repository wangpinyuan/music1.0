import React from 'react';
// redux
import {
	connect
} from 'react-redux';
class MusicLrc extends React.Component {
	constructor() {
		super();
		this.state = {
			deg: 0,
			rotate: null
		}
	}
	componentWillReceiveProps(nextProps) {

		if (this.props.selectedMusic.song_id !== nextProps.selectedMusic.song_id) {
			clearInterval(this.state.rotate);
			this.setState({
				deg: 0
			})
		}

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
	}
	render() {
		return (
			<div className="musicLrc">
				<img ref='image' className='rotation' src={this.props.selectedMusic.pic_small}/>	
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		play: state.play,
		selectedMusic: state.selectedMusic
	};
}

export default connect(mapStateToProps)(MusicLrc);