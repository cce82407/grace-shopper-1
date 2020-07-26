const router = require('./index');
const { User, Session } = require('../db/models');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const sequelize = require('sequelize');
