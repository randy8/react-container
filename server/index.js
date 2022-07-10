const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const db = mysql.createPool({
  host: 'mysql_db', 
  user: 'randy',
  password: 'password',
  database: 'movies' 
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Home
app.get('/', (req, res) => {
  res.send('Hello')
});

app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM movie_reviews";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.post("/insert", (req, res) => {
  const movieTitle = req.body.setTitle;
  const movieReview = req.body.setReview;
  const movieRating = req.body.setRating;
  const InsertQuery = "INSERT INTO movie_reviews (movie_title, movie_review, movie_rating) VALUES (?, ?, ?)";
  db.query(InsertQuery, [movieTitle, movieReview, movieRating], (err, result) => {
    console.log(result)
  })
})

app.delete("/delete/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const DeleteQuery = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(DeleteQuery, movieId, (err, result) => {
    if (err) console.log(err);
  })
})

app.put("/update/:movieId", (req, res) => {
  const movieReview = req.body.reviewUpdate;
  const movieRating = req.body.ratingUpdate;
  const movieId = req.params.movieId;
  const UpdateQuery = "UPDATE movie_reviews SET movie_review = ?, movie_rating = ? WHERE id = ?";
  db.query(UpdateQuery, [movieReview, movieRating, movieId], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen('3001', () => { })