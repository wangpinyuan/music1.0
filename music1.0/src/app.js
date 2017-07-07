import React from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
// redux
// import {
// 	createStore
// } from 'redux';
// import {
// 	Provider,
// 	connect
// } from 'react-redux';
// import {
// 	SELECT_MUSIC,
// 	selectMusic
// } from './actions';
import changeMusic from './reducers';
// 
import Tab from 'components/tab.js';
import Player from 'components/player.js';
import Discover from 'components/discover.js';
import SearchMusic from 'components/search.js';
import Collection from 'components/collection.js';
import Mine from 'components/Mine.js';
import HistoryList from 'components/historyList.js';
import NoMatch from 'components/NoMatch.js';
// 
import './public/less/reset.less'
import 'public/less/app.less'
// todo delete
import MusicPlayer from 'components/musicPlayer'

// let store = createStore(changeMusic);

export default class App extends React.Component {

	render() {
		return (
			<Router>
				<div className='app'>
					<Tab/>
					<Switch>
						<Redirect exact path='/' to='discover' />
						<Route exact path='/discover' component={Discover} />
						<Route exact path='/search' component={SearchMusic} />
						<Route exact path='/collection' component={Collection} />
						<Route component={NoMatch}/>
					</Switch> 
					<Player/>
					<HistoryList/>
					<MusicPlayer/>
				</div>
			</Router>
		)
	}
}