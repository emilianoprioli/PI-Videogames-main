const axios = require("axios");
require('dotenv').config();
const {APIGENRES,APIKEY} = process.env;

const getAllGenres = async () => {
    const res = await axios.get(`${APIGENRES}?key=${APIKEY}`);
    const data = res.data;
    const genres = data.results.map((el) => el.name).sort();
    return genres;
}

module.exports = {
    getAllGenres
}