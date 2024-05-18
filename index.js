const express = require("express");
const app = express();
const debug = require('debug')('app:main')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => debug(`listening on port ${PORT}`));
