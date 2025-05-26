import express from 'express';
import path from 'path';

const port = 80

const dirname = import.meta.dirname;

const app = express();

app.use('/', express.static('static'))
app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'static', 'index.html'))
})

app.listen(port, () => {
    console.log('Running on your domain!');
})
