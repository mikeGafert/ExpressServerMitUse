let divElemt = document.getElementById('divID');
let thumbnails = divElemt.getElementsByTagName('img');

for (let index = 0; index < thumbnails.length; index++) {
    const thumbnail = thumbnails[index];
    thumbnail.addEventListener('mouseover', eventMouseOver, false);
    thumbnail.addEventListener('mouseout', eventMouseOut, false);
}

function eventMouseOver() {
    this.style.cursor = 'pointer';
    this.style.cursor = 'hand';
    this.style.borderColor = 'red';
}

function eventMouseOut() {
    this.style.cursor = 'pointer';
    this.style.borderColor = 'grey';
}

function ChangeImageOnClick(evt) {
    let mainimage = document.getElementById('mainimage');
    let senderId = evt.target.getAttribute('id');
    let senderSource = evt.target.getAttribute('src');
    let senderAlt = evt.target.getAttribute('alt');
    let sender = document.getElementById(senderId);

    sender.src = mainimage.src;
    sender.alt = mainimage.alt
    mainimage.src = senderSource;
    mainimage.alt = senderAlt;
}