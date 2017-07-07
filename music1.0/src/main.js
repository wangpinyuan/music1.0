import React from 'react';
import ReactDOM from 'react-dom';
// import {
// 	HashRouter as Router,
// 	Route,
// 	Switch,
// 	Redirect
// } from 'react-router-dom';
// redux
import {
	createStore
} from 'redux';
import {
	Provider,
	connect
} from 'react-redux';
// import {
// 	SELECT_MUSIC
// } from './actions';
import changeMusic from './reducers';
// 
import App from './app.js';
// import Tab from 'components/tab.js';
// import Player from 'components/player.js';
// import Discover from 'components/discover.js';
// import SearchMusic from 'components/search.js';
// import Mine from 'components/Mine.js';
// import NoMatch from 'components/NoMatch.js';
// 
import './public/less/reset.less'
import 'public/less/app.less'
// todo delete
// import MusicPlayer from 'components/musicPlayer'

let store = createStore(changeMusic);

export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
			<App />
			</Provider>
		)
	}
}

ReactDOM.render(
	<Root />,
	document.getElementById('app')
)