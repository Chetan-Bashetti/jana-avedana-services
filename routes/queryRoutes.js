const router = require('express').Router();

const {
	createNewQuery,
	getAllQueries,
	getQueryById,
	deleteQueryById,
	getQueryByUniqueId,
	updateQueryById
} = require('../controllers/queryControllers');

router.route('/create').post(createNewQuery);
router.route('/list').get(getAllQueries);
router.route('/list/unique').post(getQueryByUniqueId);
router.route('/list/:id').get(getQueryById);
router.route('/list/delete/:id').delete(deleteQueryById);
router.route('/list/update/:id').put(updateQueryById);

module.exports = router;
