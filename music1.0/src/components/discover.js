import React from 'react';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style';
// 
import MusicList from 'components/musicList.js'
// 
import 'public/less/discover.less'
export default class Discover extends React.Component {
	constructor() {
		super();
		this.state = {
			songList: [],
			picList: []
		}
	}
	componentWillMount() {
		fetch('/api/hotList', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({
				songList: data
			})
		}).catch((err) => {
			console.log('fetch err:' + err)
		})
		fetch('/api/hotPic', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.setState({
				picList: data
			})
		})
	}

	render() {
		// console.log(this.state.songList)
		return (
			<div className='discover'>
				<Carousel autoplay>
					<div>
						<img className='carouselImg' src={this.state.picList[0]} />
					</div>
					<div>
						<img className='carouselImg' src={this.state.picList[1]} />
					</div>
					<div>
						<img className='carouselImg' src={this.state.picList[2]} />
					</div>
				 </Carousel> 
				<MusicList songList={this.state.songList}/>
			</div>
		)
	}

}