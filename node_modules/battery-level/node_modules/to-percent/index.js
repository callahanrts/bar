'use strict';

module.exports = function (val) {
	if (typeof val !== 'number' || val < 0 || val > 1) {
		throw new Error('Expected a number between 0 and 1');
	}

	return Math.round(val * 100);
};
