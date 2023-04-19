const express = require("express");
const morgan = require("morgan");
const got = require("got");
require("dotenv").config();
const app = express();
const cors = require("cors");

const { router } = require("./src/routers/booksRouter.js");

const PORT = process.env.PORT || 8081;
const thirdPartyApiKey = process.env.WEATHER_API_KEY;
const thirdPartyBaseUrl = " http://api.weatherbit.io/v2.0/current";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
// app.use(router);
app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude) {
      return res
        .status(400)
        .json({ message: "latitude parametr is mandatory" });
    }
    if (!longitude) {
      return res
        .status(400)
        .json({ message: "longitude parametr is mandatory" });
    }
    const response = await got(thirdPartyBaseUrl, {
      searchParams: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
        // lat: "46.591902",
        // lon: "30.756320",
      },
      responseType: "json",
    });
    // const weatherData = response.body.data[0];
    const [weatherData] = response.body.data;
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    // const description = weatherData.weather.description
    res.json({ city_name, description, temp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at a server launch:", err);
  }
  console.log(`Server works at port: ${PORT}`);
});
