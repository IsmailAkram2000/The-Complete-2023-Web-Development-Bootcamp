import express from "express"
import bodyParser from "body-parser";
import request from "request"
import path from "path"
import { fileURLToPath } from "url";
import { log } from "console";

// Get the path of the current project
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

// Initalize the app 
const app = express();

// Declare and use what needed in the app
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('Public'));

// The App Routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
    const username = req?.body?.username;
    const email = req?.body?.email;
    
    console.log(username, email)
});

// Listening on the chosen port
const PORT = 3000;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
