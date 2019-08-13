const express = require('express');
const router = express.Router();

// database access using knex
const db = require('../data/dbConfig');

// CRUD
// GET
// get list of accounts
router.get('/', (req, res) => {
	db('accounts')
		.then(accounts => {
			res.status(200).json(accounts);
		})
		.catch(error => {
			res.status(500).json({message: 'Error getting posts from database'});
		});
});

// get specific account by ID
router.get('/:id', (req, res) => {
	db('accounts').where({id: req.params.id}).first()
		.then(account => {
			if(account) {
				res.status(200).json(account);
			} else{
				res.status(404).json({message: 'That account ID does not exist'})
			}
		})
		.catch(error => {
			res.status(500).json({message: 'Error getting posts from database'});
		});
});

// POST
// add new account

// DELETE
// delete specific account by id

// PUT
// update specific account by id

module.exports = router;