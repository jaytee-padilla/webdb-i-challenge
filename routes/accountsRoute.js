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
			res.status(500).json({message: 'Error accessing accounts in database'});
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
			res.status(500).json({message: 'Error accessing accounts in database'});
		});
});

// POST
// add new account
router.post('/', (req, res) => {
	const accInfo = req.body;

	// if req.body.name is not included or if req.body.name is an empty string, throw an error
	if(!accInfo.name || accInfo.name.length < 1) {
		return res.status(400).json({message: 'New account info must include name'});
	}

	if(!accInfo.budget) {
		return res.status(400).json({message: 'New account info must include budget'});
	}

	db('accounts').insert(accInfo)
		.then(success => {
			res.status(201).json({message: 'New account created successfully'});
		})
		.catch(error => {
			res.status(500).json({message: 'There was a problem adding new account to the server'});
		});
});

// DELETE
// delete specific account by id
router.delete('/:id', (req, res) => {

	db('accounts')
		.where('id', req.params.id).first()
		.del()
		.then(account => {
			if(account) {
				res.status(200).json({message: 'Account deleted successfully'});
			} else{
				res.status(404).json({message: 'That account ID does not exist'});
			}
		})
		.catch(error => {
			res.status(500).json({message: 'Error accessing accounts in database'});
		});
});

// PUT
// update specific account by id

module.exports = router;