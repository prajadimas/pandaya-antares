const axios = require('axios')
const io = require('socket.io-client')
require('dotenv').config()

const socket = io('http://127.0.0.1:50105')
socket.on('connect', function () {
	socket.emit('client', 'pandaya-antares')
	socket.on('data', (data) => {
		console.log('Data', data)
		axios({
			method: 'POST',
			baseURL: 'https://platform.antares.id:8443/~/antares-cse/',
			url: '/' + process.env.DEVICEID,
			headers: {
				'X-M2M-Origin': process.env.USERID + ':' + process.env.USERKEY,
				'Content-Type': 'application/json;ty=4',
				'Accept': 'application/json'
			},
			data: {
				'm2m:cin': {
					'con': JSON.stringify(data)
				}
			}
		})
		.then((res) => {
			console.log('Result: ', res)
		})
		.catch((err) => {
			console.error(err)
		})
	})
})
socket.on('disconnect', function () {
	console.log('Disconnected from Main Process')
})


