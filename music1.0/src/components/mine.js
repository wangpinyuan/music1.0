import React from 'react';
// 
import MusicList from 'components/musicList'
// 
import 'public/less/mine.less'

export default class Mine extends React.Component {
	render() {
		return (
			<div className='mine'>
				<MusicList />
			</div>
		)
	}
}