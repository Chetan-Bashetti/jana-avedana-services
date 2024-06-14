const asyncHandler = require('express-async-handler');
const Query = require('../models/queryModel');

const createNewQuery = asyncHandler(async (req, res) => {
	let data = req.body;
	let newQuery = await Query.create({
		unique_query_id: data.mobile_num + data.adhar_num.substring(8, 12),
		...data
	});
	if (newQuery) {
		res.status(200).send({
			message: 'Query raised successfully, We will get back to you shortly',
			data: newQuery
		});
	} else {
		res.status(400);
		throw new Error('Please fill all the fields');
	}
});

const getAllQueries = asyncHandler(async (req, res) => {
	let allQueries = await Query.find().sort({ createdAt: -1 });
	if (allQueries.length) {
		res.status(200).send({
			count: allQueries.length,
			data: allQueries
		});
	} else {
		res.status(400);
		throw new Error('No Queries found');
	}
});

const getQueryById = asyncHandler(async (req, res) => {
	let query = await Query.findById({
		_id: req.params.id
	});
	if (query) {
		res.status(200).send({
			data: query
		});
	} else {
		res.status(404).send({
			message: 'query not found'
		});
	}
});

const deleteQueryById = asyncHandler(async (req, res) => {
	const query = await Query.findById({
		_id: req.params.id
	});
	if (query) {
		await query.deleteOne();
		res.status(200).send({
			message: `query removed successfully`
		});
	} else {
		res.status(404).send({
			message: 'query not found'
		});
	}
});

const getQueryByUniqueId = asyncHandler(async (req, res) => {
	let { mobile_num, adhar_num } = req.body;
	if (!mobile_num) {
		res.status(404);
		throw new Error({
			message: 'Please enter your mobile number'
		});
	}

	const query = await Query.findOne({
		unique_query_id: mobile_num + adhar_num.substring(8, 12)
	});
	if (query) {
		res.status(200).send({
			data: query
		});
	} else {
		res.status(404).send({
			message: 'query not found'
		});
	}
});

const updateQueryById = asyncHandler(async (req, res) => {
	const query = await Query.findById(req.params.id);
	const { adhar_num, user_name, mobile_num, pincode, category, queryDesc } =
		req.body;

	if (adhar_num === '')
		return res.status(500).send({ message: 'Food item name cannot be empty' });
	if (user_name === '')
		return res
			.status(500)
			.send({ message: 'Food item user_name cannot be empty' });
	if (mobile_num === '')
		return res
			.status(500)
			.send({ message: 'Food item category cannot be empty' });

	if (query) {
		query.adhar_num = adhar_num || query.adhar_num;
		query.user_name = user_name || query.user_name;
		query.mobile_num = mobile_num || query.mobile_num;
		query.pincode = pincode ? pincode : query.pincode;
		query.category = category ? category : query.category;
		query.queryDesc = queryDesc ? queryDesc : query.queryDesc;
		query.unique_query_id =
			mobile_num || adhar_num
				? mobile_num + adhar_num.substring(8, 12)
				: query.unique_query_id;

		await query.save();
		res.status(200).send({
			message: 'Query details updated',
			data: query
		});
	} else {
		res.status(404).send({
			message: 'Query not found'
		});
	}
});

module.exports = {
	createNewQuery,
	getAllQueries,
	getQueryById,
	deleteQueryById,
	getQueryByUniqueId,
	updateQueryById
};
