const express = require('express');
const path = require('path');
const db = require('./MOCK_DATA.json');
const app = express();

app.use(express.json());

async function getSeat(first, last) {
    try {
        for (const entry of db) {
            if (entry.first_name === first && entry.last_name === last) {
                return [entry.floor, entry.seat]
            }
        }
    } catch(e) {
        return e;
    }
    return undefined;
}

app.post('/search', async (req, res) => {
    let result = await getSeat(req.body.first, req.body.last);

    if (result === undefined) {
        res.status(404).send({message: "seat not found" });
    }
    else {
        let location = { floor: result[0], seat: result[1] };
        res.setHeader("Content-type", "application/json");
        res.send(JSON.stringify({location}));
    }
});

app.use('/', express.static(path.join(__dirname + '/public')));
app.listen(80, () => console.log('running server'));
