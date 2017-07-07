import React from 'react';

export default class NoMatch extends React.Component {
	render() {
		return (
			<div className='NoMatch' style={{'flex':1,'textAlign':'center','fontSize':14,'color':'#808080','margin':20}}>
				您搜索的界面不存在
			</div>
		)
	}
}