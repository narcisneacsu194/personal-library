const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet.noCache());

app.listen(port, () => {
  console.log(`Server started up on port ${port}`);
});