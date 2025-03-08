const express = require('express');
const examiner = require('./examiner');
const run = require('./ai');
const app = express();
const cors = require('cors');
app.use(cors());    
const port = process.env.port || 4000;

app.use(express.json());
app.use((req,res,next)=> {
    console.log(req.url);
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/ai', async (req, res) => {
    console.log(req.body);
    const prompt = req.body;

    const aians = await run(prompt);

    res.send(aians);
});

app.post('/examiner', async (req, res) => {
    console.log(req.body);
    const {questions, options} = req.body;

    const aians = await examiner(questions, options);

    res.send(aians);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

