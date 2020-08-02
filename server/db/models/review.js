const { UUID, UUIDV4, INTEGER } = require('sequelize');
const { db } = require('../db');

const Review = db.define('Review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  value: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    },
    allowNull: false,
  }
})

module.exports = Review 