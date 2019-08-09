const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./client/dist'));

app.get('/', (req, res) => res.send('Hello from server'));

app.listen(3000, () => console.log('Connect 4 Hosted on port 3000'));