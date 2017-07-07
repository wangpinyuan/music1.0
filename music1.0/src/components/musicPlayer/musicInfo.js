import React from 'react';
// redux
import {
	connect
} from 'react-redux';

class MusicInfo extends React.Component {
	render() {
		return (
			<div className="musicInfo">
				<div className='title'>{this.props.selectedMusic.title}</div>
				<div className='singer'>- {this.props.selectedMusic.singer} -</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedMusic: state.selectedMusic
	};
}

export default connect(mapStateToProps)(MusicInfo);