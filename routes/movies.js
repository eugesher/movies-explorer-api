const router = require('express').Router();

const {
  validateRequestHeaders,
  validateCreateMovieRequest,
  validateDeleteMovieRequest,
} = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', validateRequestHeaders, getMovies);
router.post('/', validateCreateMovieRequest, createMovie);
router.delete('/:movieId', validateDeleteMovieRequest, deleteMovie);

module.exports = router;
