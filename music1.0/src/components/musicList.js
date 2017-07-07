import React from 'react';
import 'public/less/musicList.less'
// redux
import {
	connect
} from 'react-redux';
import {
	selectMusic,
	togglePlay
} from '../actions'

class musicList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songList: props.songList || [],
			selectedMusic: {}
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			songList: nextProps.songList
		})
	}
	selectMusic(e) {
		// console.log(this.state.selectedMusic)
		e.preventDefault();
		e.stopPropagation();
		const index = parseInt(e.currentTarget.dataset.key, 10);
		this.state.selectedMusic = this.props.songList[index];
		fetch('/api/getMusicInfo', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: this.state.selectedMusic.song_id,
				source: this.state.selectedMusic.source
			})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.state.selectedMusic.song_url = data.song_url;
			this.state.selectedMusic.lrc = data.lrc;
			this.props.dispatch(selectMusic(this.state.selectedMusic));
			this.props.dispatch(togglePlay(true));
		})
	}
	render() {
		var _this = this;
		if (this.props.songList.length !== 0) {
			return (
				<div className='musicList'>
				{this.props.songList.map(function(item,index){
					return (
					<div className='musicItem' onClick={_this.selectMusic.bind(_this)} data-key={index} key={index}>
							<div className='pic'>
								<img src={item.pic_small} title={item.title}/>
							</div>
							<div className='desc'>
								<div className='title'>{item.title}</div>
								<div className='singer' title={item.singer}>{item.singer}</div>
							</div>
							<div className='album' title={item.album}>{item.album}</div>
						</div>
					)
				})}
			</div>
			)
		} else {
			return (
				<div className='notFound'>暂无查询数据</div>
			)
		}
	}
}
export default connect()(musicList);