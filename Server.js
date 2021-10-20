var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json({ extended: true }));

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Exaple app listening at http://%s:%s", host, port);
});

app.post('/ergebnis', (request, response) => {
    console.log(request.body);

    var daten = JSON.parse(request.body);
    //var daten = '[{"Name":"Max","EMail":"max@mustermann.de","Termin":"2021-10-19T14:27","Gaeste":"4"},{"Name":"Emma","EMail":"Emma@watson.com","Termin":"2021-10-23T14:28","Gaeste":"2"}]';
    var daten = JSON.parse(daten);

    response.statusCode = 200;
    response.send('Der server hat ' + daten.count + ' Datensaetze erhalten');
})

app.get('/imageGallery', (request, response) => {
    let dateien = fs.readdirSync(__dirname + '/public/images');

    let website =
        `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="styles/imageGallery.css">
    </head>
    
    <body>
        <div id='bilder' align='center'>
        <img src="images/` + dateien[0] + `" 
            alt="` + dateien[0] + `"            
            id="mainimage" >
            
        <br/>
        
        <div id='divID' >\n`;

    for (let index = 1; index < dateien.length; index++) {
        website +=
            `<img src="images/` + dateien[index] + `" alt="` + dateien[index] + `" class="thumbnail" id="th` + index + `" onclick="ChangeImageOnClick(event)" ></img>`

    };

    website += `    
            </div></div>
        <script src="scripts/imageGallery.js"></script>
    </body>
    </html >`
    
    response.send(website);
})