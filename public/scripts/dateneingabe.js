let inputElements = document.getElementsByTagName('input');

function eventInputBlur(sender) {
    if (sender.value) {
        document.getElementById(sender.id).style.background = 'lightgreen';
    }
}

function nameCheck(sender) {
    let name = sender.value.trim();
    let regex = /^([a-zß-ü]+(['-][a-zß-ü]+)?\s?)*?$/i;

    if (!regex.test(name)) {
        //alert("This is not a valid name!")
        document.getElementById(sender.id).style.background = 'red';
    }
    else {
        eventInputBlur(sender);
    }
}

function emailCheck(sender) {
    let mail = sender.value.trim();
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(mail)) {
        //alert('This is not a valid email address!');
        document.getElementById(sender.id).style.background = 'red';
    }
    else {
        eventInputBlur(sender);
    }
}

function checkValidDate(sender) {
    let date = Date.parse(sender.value);
    if (isNaN(date) && date != null) {
        //alert('This is not a valid date!')
        document.getElementById(sender.id).style.background = 'red';
    }
    else {
        eventInputBlur(sender);
    }
}

function nrCheck(sender) {
    let nr = sender.value.trim();
    let regex = /[^0-9]/g;
    nr = nr.replace(regex, '');
    if (isNaN(nr)) {
        //alert('This is not a valid number!')
        document.getElementById(sender.id).style.background = 'red';
    }
    else {
        eventInputBlur(sender);
    }
    document.getElementById(sender.name).value = nr;
}

var zeilenZaehler = 1;
function addRow() {

    var table = document.getElementById('eingabeTabelle');

    var row = document.createElement('tr');
    var nr = document.createElement('td');
    var name = document.createElement('td');
    var email = document.createElement('td');
    var termin = document.createElement('td');
    var gaeste = document.createElement('td');

    var nameInput = document.createElement('input');
    var emailInput = document.createElement('input');
    var terminInput = document.createElement('input');
    var gaesteInput = document.createElement('input');

    nameInput.type = 'text';
    emailInput.type = 'email';
    terminInput.type = 'datetime-local';
    gaesteInput.type = 'number';

    nameInput.name = 'name' + zeilenZaehler;
    emailInput.name = 'mail' + zeilenZaehler;
    terminInput.name = 'date' + zeilenZaehler;
    gaesteInput.name = 'gaeste' + zeilenZaehler;

    nameInput.id = 'name' + zeilenZaehler;
    emailInput.id = 'mail' + zeilenZaehler;
    terminInput.id = 'date' + zeilenZaehler;
    gaesteInput.id = 'gaeste' + zeilenZaehler;


    nameInput.setAttribute('onblur', 'nameCheck(this)');
    emailInput.setAttribute('onblur', 'emailCheck(this)');
    terminInput.setAttribute('onblur', 'checkValidDate(this)');
    var today = new Date().toISOString();
    terminInput.setAttribute('min', today);
    gaesteInput.setAttribute('onblur', 'nrCheck(this)');

    name.appendChild(nameInput);
    email.appendChild(emailInput);
    termin.appendChild(terminInput);
    gaeste.appendChild(gaesteInput);

    row.appendChild(nr);
    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(termin);
    row.appendChild(gaeste);

    table.appendChild(row);

    nr.innerHTML = zeilenZaehler++;
}

function send() {
    var daten = [];

    for (let index = 1; index <= zeilenZaehler - 1; index++) {
        daten.push({
            Name: document.getElementById('name' + index).value,
            EMail: document.getElementById('mail' + index).value,
            Termin: document.getElementById('date' + index).value,
            Gaeste: document.getElementById('gaeste' + index).value
        })
    }

    // for (let index = 0; index < zeilenZaehler - 1; index++) {
    //     let zeile = tabelle.children[index + 1];

    //     daten.push({
    //         Name: zeile.children[1].children[0].value,
    //         EMail: zeile.children[2].children[0].value,
    //         Termin: zeile.children[3].children[0].value,
    //         Gaeste: zeile.children[4].children[0].value
    //     })
    // }

    //console.log(daten);


    var xhr = new XMLHttpRequest;

    xhr.open('POST', '/ergebnis', false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    // xhr.onreadystatechange = () => {
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         alert(xhr.response)
    //     }
    // }

    var jsonString = JSON.stringify(daten);
      
    xhr.send(jsonString);

    console.log(jsonString);
    //console.log(xhr.status);

    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert(xhr.response)
    }
}