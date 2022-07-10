CREATE TABLE IF NOT EXISTS `movie_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_title` varchar(50) NOT NULL,
  `movie_review` varchar(50) NOT NULL,
  `movie_rating` decimal NOT NULL,
  CHECK (movie_rating BETWEEN 1 AND 5),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;