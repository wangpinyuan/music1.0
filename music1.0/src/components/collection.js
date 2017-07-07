import React from 'react';
// 
import MusicList from 'components/musicList';
// 
import 'public/less/search.less';
// redux
import {
	connect
} from 'react-redux';

class Collection extends React.Component {
	constructor() {
		super();
		this.state = {
			songList: JSON.parse(localStorage.getItem('collectionList'))
		}
	}
	componentWillReceiveProps(newProps) {
		this.state.songList = JSON.parse(localStorage.getItem('collectionList'));
	}
	render() {
		return (
			<div className='search'>
				<MusicList songList={this.state.songList}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		collectionList: state.collectionList
	};
}
export default connect(mapStateToProps)(Collection);