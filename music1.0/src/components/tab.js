import React from 'react';
import {
	NavLink
} from 'react-router-dom'
// 
import '../public/less/tab.less'
export default class Tab extends React.Component {
	render() {
		return (
			<div className='tab'>
				<NavLink activeClassName="active" to='/discover'>推荐</NavLink>
				<NavLink activeClassName="active" to='/search'>搜索</NavLink>
				<NavLink activeClassName="active" to='/collection'>收藏</NavLink>
			</div>
		)
	}
}