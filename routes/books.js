const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

const router = express.Router();

router.post('/', verifyFirebaseToken, [
  body('googleBooksId').notEmpty().withMessage('Google Books ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('readStatus').isIn(['past', 'current', 'wishlist']).withMessage('Invalid read status'),
  body('userRating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { googleBooksId, title, authors, description, imageUrl, readStatus, userRating, userReview } = req.body;
    const book = new Book({
      googleBooksId,
      title,
      authors,
      description,
      imageUrl,
      userId: req.user.uid,
      readStatus,
      userRating,
      userReview,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ error: 'Failed to add book. Please try again.' });
  }
});

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.uid });
    res.json(books);
  } catch (error) {
    console.error('Fetch books error:', error);
    res.status(500).json({ error: 'Failed to fetch books. Please try again.' });
  }
});

router.put('/:id', verifyFirebaseToken, [
  body('readStatus').optional().isIn(['past', 'current', 'wishlist']).withMessage('Invalid read status'),
  body('userRating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('userReview').optional().isString().withMessage('Review must be a string')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { readStatus, userRating, userReview } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      { readStatus, userRating, userReview },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ error: 'Failed to update book. Please try again.' });
  }
});

router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
    if (!book) {
      console.log(`Book not found for deletion: ${req.params.id}`);
      return res.status(404).json({ error: 'Book not found' });
    }
    console.log(`Book deleted successfully: ${req.params.id}`);
    res.status(200).json({ message: 'Book deleted successfully' });  // Ensure a 200 status code
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ error: 'Failed to delete book. Please try again.' });
  }
});


module.exports = router;