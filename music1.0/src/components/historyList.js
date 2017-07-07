import React from 'react';
import 'public/less/historyList.less';
import back from '../public/images/返回白.png'
// redux
import {
	connect
} from 'react-redux';
import {
	selectMusic,
	toggleHistoryList
} from '../actions'

class HistoryList extends React.Component {
	componentWillReceiveProps(newProps) {
		if (newProps.showHistoryList) {
			this.refs.historyList.style.cssText = "height:100%"
		} else {
			this.refs.historyList.style.cssText = "height:0"
		}
	}
	toggleHistoryList(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.dispatch(toggleHistoryList());
	}
	selectMusic(e) {
		e.preventDefault();
		e.stopPropagation();
		const index = parseInt(e.currentTarget.dataset.key, 10);
		this.props.dispatch(selectMusic(this.props.historyList[index]));
	}
	render() {
		return (
			<div className='historyList' ref='historyList'>
				<div className='back' onClick={this.toggleHistoryList.bind(this)}>
					<img src={back}/>
				</div>
				<div className='title'>历史播放列表</div>
				{this.props.historyList.map((item,index)=>{
					return (
						<div className='item' data-key={index} key={index} onClick={this.selectMusic.bind(this)}>
							<div className='name'>{item.title}</div>
							<div className='singer'>{item.singer}</div>
						</div>
					)
				})}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		// play: state.play,
		showHistoryList: state.showHistoryList,
		// selectedMusic: state.selectedMusic,
		historyList: state.historyList
	};
}

export default connect(mapStateToProps)(HistoryList);