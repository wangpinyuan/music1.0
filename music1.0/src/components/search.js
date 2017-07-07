import React from 'react';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
// 
import MusicList from 'components/musicList';
// 
import 'public/less/search.less';

const Search = Input.Search;

export default class SearchMusic extends React.Component {
	constructor() {
		super();
		this.state = {
			songList: []
		}
	}
	searchMusic(value) {
		fetch('/api/search', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				value: value
			})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({
					songList: data
				})
				// console.log(this.state.songList)
		})
	}
	render() {
		return (
			<div className='search'>
				<Search
					size="large"
				    placeholder="搜索歌曲、歌单、专辑"
				    onSearch={value => this.searchMusic(value)}
				  />
				<MusicList songList={this.state.songList}/>
			</div>
		)
	}
}