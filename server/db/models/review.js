const { UUID, UUIDV4, INTEGER, TEXT } = require('sequelize');
const { db } = require('../db');

const Review = db.define('Review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  starRating: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    },
    allowNull: false,
  },
  reviewTitle: {
    type: TEXT,
    allowNull: false,
  },
  reviewText: {
    type: TEXT,
    allowNull: false,
  }
})

module.exports = Review 