import React from 'react';
// redux
import {
	connect
} from 'react-redux';
import {
	changeProgress
} from '../../actions'

class MusicProgress extends React.Component {
	constructor() {
		super();
		this.state = {
			width: 0,
			left: 0
		}
	}

	componentDidMount() {
		const width = this.refs.progress.offsetWidth;
		const left = this.refs.progress.offsetLeft;
		this.setState({
			width,
			left
		})
	}

	componentWillReceiveProps(nextProps) {
		const ratio = (this.props.currentTime / this.props.totalTime) * 100;
		this.refs.progressLoad.style.cssText = 'width:' + ratio + '%';
	}

	changeProgress(e) {
		const ratio = (e.clientX - this.state.left) / this.state.width;
		const currentTime = ratio * this.props.totalTime;
		this.props.dispatch(changeProgress(currentTime));
	}

	formatTime(time) {
		let m = parseInt(time / 60, 10);
		if (m < 10) {
			m = '0' + m;
		}
		let s = parseInt(time % 60, 10);
		if (s < 10) {
			s = '0' + s;
		}
		return (m + ':' + s)
	}

	render() {
		return (
			<div className="musicProgress">
				<div className="currentTime">{this.formatTime(this.props.currentTime)}</div>
				<div className='progress' ref='progress' onClick={this.changeProgress.bind(this)}>
					<div className='progress-bg'></div>
					<div className='progress-load' ref='progressLoad'></div>
				</div>
				<div className="totalTime">{this.formatTime(this.props.totalTime)}</div>
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
		currentTime: state.currentTime,
		totalTime: state.totalTime,
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

export default connect(mapStateToProps)(MusicProgress);