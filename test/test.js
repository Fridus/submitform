
'use strict';
const fn = require('../');
const data = require('./values');
setTimeout(function () {
	fn(data, {
		action: '/result',
		method: 'GET'
	});
}, 1);
