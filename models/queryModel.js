const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const querySchema = new Schema(
	{
		user_name: {
			required: true,
			type: String
		},
		adhar_num: {
			required: true,
			type: String
		},
		mobile_num: {
			required: true,
			type: String
		},
		pincode: {
			required: true,
			type: String
		},
		category: {
			required: true,
			type: String
		},
		queryDesc: {
			required: true,
			type: String
		},
		unique_query_id: {
			required: true,
			type: String
		},
		status: {
			required: true,
			type: String
		}
	},
	{
		timestamps: true
	}
);

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
