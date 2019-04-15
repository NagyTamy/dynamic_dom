const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let loadButtonEl;
let albumsDivEl;
let commentsDivEl;
let postDivEl;
let photosDivEl;
let albumDivEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const strongEl = document.createElement('button');
        strongEl.textContent = post.title;
        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        //create attribute
        const postIdAttr = post.id;
        strongEl.setAttribute('post-id', postIdAttr);


        strongEl.addEventListener('click', onLoadSinglePost);
        strongEl.addEventListener('click', onLoadComments)

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';
    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById("post").style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function getSinglePost(posts) {
    const pEl = document.createElement('p');
        // creating paragraph
     for (let i = 0; i < posts.length; i++) {
         const post = posts[i];
         const strongEl = document.createElement('strong');
         strongEl.textContent = post.title;
         const bodyEl = document.createElement('p');
         bodyEl.textContent = post.body;

         pEl.appendChild(strongEl);
         pEl.appendChild(bodyEl);
     }
        return pEl;
}

function onSinglePostReceived() {
    postDivEl.style.display = 'block';
    const text = this.responseText;
    const posts = JSON.parse(text);
    const divEl = document.getElementById('post-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(getSinglePost(posts));
}

function onLoadSinglePost() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const postId = el.getAttribute('post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSinglePostReceived);
    xhr.open('GET', BASE_URL + '/posts?id=' + postId);
    xhr.send();
}


function createCommentsList(comments) {

    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;
        const pCommentEl = document.createElement('p');
        pCommentEl.textContent = comment.body;
        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(pCommentEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;

}

function onCommentsReceived() {
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comments-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createCommentsList(comments));
}

function onLoadComments() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("posts").style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const postId = el.getAttribute('post-id');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}



function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const albumsTdEl = document.createElement('td');
    albumsTdEl.textContent = "Albums"

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(albumsTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        //creating album links

        const userIdAttr = document.createAttribute('data-user-id');
        userIdAttr.value = user.id;

        const albumButtonEl = document.createElement('button');
        albumButtonEl.textContent = 'List albums';
        albumButtonEl.setAttributeNode(userIdAttr);
        albumButtonEl.addEventListener('click', onLoadAlbums);

        const albumTdEl = document.createElement('td');
        albumTdEl.appendChild(albumButtonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumButtonEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    albumsDivEl = document.getElementById('albums');
    commentsDivEl = document.getElementById('comments');
    loadButtonEl = document.getElementById('load-users');
    postDivEl = document.getElementById('post');
    photosDivEl = document.getElementById('photos');
    albumDivEl = document.getElementById('album');
    loadButtonEl.addEventListener('click', onLoadUsers);
});

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = album.title;

        const albumIdAttr = document.createAttribute('album-id');
        albumIdAttr.value = album.id;
        strongEl.setAttributeNode(albumIdAttr);
        strongEl.setAttribute('class', 'album-link');

        strongEl.addEventListener('click', onLoadAlbumName);
        strongEl.addEventListener('click', onLoadPhotos);



        const liEl = document.createElement('li');
        liEl.appendChild(strongEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onAlbumsReceived() {
    albumsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('albums-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}

function onLoadAlbums() {
    document.getElementById("posts").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById("post").style.display = 'none';
    document.getElementById("photos").style.display = 'none';
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}


function getAlbumName(albums) {
    const pEl = document.createElement('p');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('h2');
        strongEl.textContent = album.title;

        pEl.appendChild(strongEl);
    }

    return pEl;
}

function onSingleAlbum() {
    albumDivEl.style.display = 'block';
    const text = this.responseText;
    const albums = JSON.parse(text);
    const divEl = document.getElementById('album-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(getAlbumName(albums));
}

function onLoadAlbumName() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('post').style.display = 'none';
    const el = this;
    const albumId = el.getAttribute('album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSingleAlbum);
    xhr.open('GET', BASE_URL + '/albums?id=' + albumId);
    xhr.send();
}


function createImageList(images) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < images.length; i++){
        const image = images[i];

        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', image.url);
        imgEl.setAttribute('width', '200');

        ulEl.appendChild(imgEl);
    }

    return ulEl;
}

function onImagesRecieved() {
    photosDivEl.style.display ='block';
    const text = this.responseText;
    const photos = JSON.parse(text);
    const divEl = document.getElementById('photos-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createImageList(photos));
}

function onLoadPhotos() {
    document.getElementById("albums").style.display = 'none';
    document.getElementById("comments").style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('post').style.display = 'none';
    const el = this;
    const albumId = el.getAttribute('album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onImagesRecieved);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}
