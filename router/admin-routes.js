const express = require('express');
const { default: router } = require('./aboutRoutes');
const routes = express.Router();


router.route('/user').get()