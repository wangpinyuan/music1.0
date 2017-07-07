var express = require('express');
var https = require('https');
var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var musicApi = require('music-api');
var apiRoutes = express.Router();


// 推荐榜 
function getHotList() {
	return new Promise((resolve, reject) => {
		var songList = [];
		musicApi.getPlaylist('netease', {
			id: '3778678',
			raw: false
		}).then((data) => {
			var data = data['songList'];
			getSongList(data, songList, 'netease');
			resolve(songList);
		})
	})
}
// 热歌轮播图
function getHotPic() {
	var url = 'http://music.baidu.com/';
	return new Promise((resolve, reject) => {

		http.get(url, function(res) {
			var chunks = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				chunks += chunk;
			})
			res.on('end', function() {
				var $ = cheerio.load(chunks);
				var imgList = $('#js-random-focus').find('img');
				var imgLists = [];
				for (var i = 0; i < 3; i++) {
					imgLists.push(imgList[i].attribs['data-narrow']);
				}
				resolve(imgLists);
			})
		})
	})
}

// 搜索
function searchMusic(value) {
	return new Promise((resolve, reject) => {
		var songList = [];
		musicApi.searchSong('all', {
				key: value,
				limit: 5,
				page: 1,
				raw: false
			})
			.then((response) => {
				var data = response['xiami']['songList'];
				getSongList(data, songList, 'xiami');
				return response
			})
			.then((response) => {
				var data = response['qq']['songList'];
				getSongList(data, songList, 'qq');
				return response
			})
			.then((response) => {
				var data = response['netease']['songList'];
				getSongList(data, songList, 'netease');
				resolve(songList);
			})
	})
}

function getSongList(data, songList, source) {
	for (var i = 0; i < data.length; i++) {
		var songItem = {};
		songItem.title = data[i].name;
		songItem.singer = data[i].artists[0].name;
		songItem.album = '《' + data[i].album.name + '》';
		songItem.pic_small = data[i].album.cover;
		songItem.song_id = data[i].id;
		songItem.source = source;
		songList.push(songItem)
	}
}

apiRoutes.get('/hotList', (req, res) => {
	getHotList().then((data) => {
		res.json(data)
	})
})

apiRoutes.get('/hotPic', (req, res) => {
	getHotPic().then((data) => {
		res.json(data);
	}).catch((err) => {
		res.send(err);
	})
})

apiRoutes.post('/search', (req, res) => {
	var value = req.body.value;
	searchMusic(value).then((data) => {
		res.json(data);
	})
});

apiRoutes.post('/getMusicInfo', function(req, res) {
	var source = req.body.source;
	var id = req.body.id;
	musicApi.getSong(source, {
		id: id.toString()
	}).then((data) => {
		res.json({
			song_url: data.url,
			lrc: data.lyric
		})
	})
})

module.exports = apiRoutes;

// TODO
// 百度音乐暂时无法播放mp3
// 以下三个基于百度音乐
// function getHotList() {
// 	var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type=1&offset=0&size=20';
// 	var chunks = '';
// 	var songList;
// 	var result = [];
// 	return new Promise((resolve, reject) => {
// 		http.get(url, function(res) {
// 			res.setEncoding('utf8');
// 			res.on('data', function(chunk) {
// 				chunks += chunk;
// 			})
// 			res.on('end', function() {
// 				songList = JSON.parse(chunks)['song_list'];
// 				for (let i = 0; i < songList.length; i++) {
// 					result[i] = {};
// 					result[i].title = songList[i].title;
// 					result[i].singer = songList[i].author;
// 					result[i].album = '《' + songList[i].album_title + '》';
// 					result[i].lrc = songList[i].lrclink;
// 					result[i].pic_small = songList[i].pic_small;
// 					result[i].pic_big = songList[i].pic_big;
// 					result[i].song_id = songList[i].song_id;
// 					result[i].source = 'baidu';
// 				}
// 				resolve(result)
// 			})
// 		})

// 	})
// }
// function searchMusicByBaidu(value, songList) {
// 	var url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=android&version=5.6.5.0&method=baidu.ting.search.merge&format=json&query=' + encodeURI(value) + '&page_no=1&page_size=5&type=-1&data_source=0&use_cluster=1';
// 	var chunks = '';
// 	return new Promise((resolve, reject) => {
// 		http.get(url, function(res) {
// 			res.setEncoding('utf8');
// 			res.on('data', function(chunk) {
// 				chunks += chunk;
// 			})
// 			res.on('end', function() {
// 				song_list = JSON.parse(chunks)['result']['song_info']['song_list'];
// 				for (let i = 0; i < song_list.length; i++) {
// 					var songItem = {};
// 					songItem.title = song_list[i].title;
// 					songItem.singer = song_list[i].author;
// 					songItem.album = '《' + song_list[i].album_title + '》';
// 					songItem.lrc = song_list[i].lrclink;
// 					songItem.pic_small = song_list[i].pic_small;
// 					songItem.song_id = song_list[i].song_id;
// 					songItem.source = 'baidu';
// 					songList.push(songItem);
// 				}
// 				resolve(songList)
// 			})
// 		})
// 	})
// }

// function searchDetailsByBaidu(id) {
// 	var url = 'http://music.baidu.com/data/music/links?songIds=' + id;
// 	var chunks = '';
// 	return new Promise((resolve, reject) => {
// 		http.get(url, function(res) {
// 			res.on('data', function(chunk) {
// 				chunks += chunk;
// 			})
// 			res.on('end', function() {
// 				chunks = JSON.parse(chunks);
// 				resolve(chunks['data']['songList'][0]);
// 			})
// 		})
// 	})
// }