const express = require('express');
const path = require('path');
const db = require('./MOCK_DATA.json');
const app = express();

app.use(express.json());

async function getSeat(first, last) {
    try {
        console.log(first);
        for (const entry of db) {
            if (entry.first_name === first && entry.last_name === last) {
                console.log('test');
                console.log(`FOUND, ID ${entry.id}`);
                return [entry.floor, entry.seat]
            }
        }
    } catch(e) {
        return e;
    }
    return undefined;
}

app.post('/search', async (req, res) => {
    console.log(`first name ${req.body.first}`);
    console.log(`last name ${req.body.last}`);
    let result = await getSeat(req.body.first, req.body.last);
    let location = { floor: result[0], seat: result[1] };
    res.setHeader("Content-type", "application/json");
    res.send(JSON.stringify({location}));
});

app.use('/', express.static(path.join(__dirname + '/public')));
app.listen(3000, () => console.log('running server'));
