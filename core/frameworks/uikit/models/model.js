var _ = require('lodash');

module.exports = {
	name: 'model',
	extend: function(child) {
		return _.extend({}, this, child);
	}
};