const express = require('express');
const path = require('path');
const db = require('./MOCK_DATA.json');
const app = express();

// for setting heroku port
const PORT = process.env.PORT || 3000
app.use(express.json());


async function getSeat(first, last) {
    try {
        for (const entry of db) {
            if (entry.first_name.toLowerCase() === first.toLowerCase()
                && entry.last_name.toLowerCase() === last.toLowerCase()) {
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

// serve static files
app.use('/', express.static(path.join(__dirname + '/public')));

app.listen(PORT, () => console.log('running server'));
