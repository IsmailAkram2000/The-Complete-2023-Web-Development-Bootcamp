import express from "express"
import https from "https"

const app = express();

app.get('/', (req, res) => {
    const url = 'https://restcountries.com/v3.1/name/egypt';

    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const countryData = JSON.parse(data);
            res.send('Egypt Population is ' + countryData[0].population);
        });
    })
});

app.listen(3000, function() {
    console.log("Listening on port 3000.");
});


