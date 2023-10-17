// backend/routes/api.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Favorite = require("../models/FavouriteSchema");

// // New route to get all movies from an external API
// router.get("/movies/all", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "http://www.omdbapi.com/?apikey=881cd60a&type=movie"
//     );

//     res.status(200).json({ data: response.data.Search || [], success: true });
//   } catch (error) {
//     console.error("Error fetching all movies:", error);
//     res.status(500).json({ error: "An error occurred while fetching all movies" });
//   }
// });

router.get("/movies/search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=881cd60a&s=${query}`
    );

    res.status(200).json({ data: response.data.Search || [], success: true });
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "An error occurred while searching movies" });
  }
});

router.get("/favorite", async (req, res) => {
  try {
    const favoritesMovies = await Favorite.find();
    res.status(200).json({ data: favoritesMovies, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching favorites." });
  }
});

// router.post('/favorite', storeFavorite)
router.post("/favorite", async (req, res) => {
  const { Title, Year, Type, Poster, imdbID } = req.body;
  try {
    const newFavorite = new Favorite({ Title, Year, Type, Poster, imdbID });
    const data = await newFavorite.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding to favorites." });
  }
});

module.exports = router;
