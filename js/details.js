// API
const apiRoute = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/'
// GET PARAMS 
const queryString = location.search 
const searchParams = new URLSearchParams(queryString) 
let id = searchParams.get("id")
let type = searchParams.get('type')
// DOM ELEMENTS 
const domDescription = document.querySelector('.hero_details__description')
const domImage = document.querySelector('.image_poster')
let img
// PLAYLIS INIT
const playlist =JSON.parse(window.sessionStorage.getItem('playlist')) || [];
// REDIRECTIONS
if (!id||!type) {
   alert('No tenes permiso para entrar aqui...')
   window.location.replace('./index.html')
}

function detailsController(data) {
    switch (data.type) {
      case 'album':
         createAlbum(data)
         break;
      case 'track':
         createTrack(data)
         break;
      case 'genre':
         createGenre(data)
         break;
      default: 
         createArtist(data)
         break;
   }
} 

function createGenre(data) {
   console.log(data);
   img = data.picture_big
   domImage.src = img
   
   let artistTitle = "<h2>Artists:</h2>"
   domDescription.innerHTML = artistTitle

   fetch(apiRoute+'genre/'+data.id+'/artists ')
   .then(res => res.json())
   .then(res => {
         res.data.forEach(element => {
           let artistList = '<a href=details.html?type='+element.type+'&id='+element.id+'>'+element.name+'</a>'
           domDescription.innerHTML += artistList
         });
      }
   )
}

function createAlbum(data) {
   img = data.cover_big
   domImage.src = img
   let details ='<section class="album_header"><h2>Title: '+data.title+'</h2></section>'
   
   details += '<section class="album_info"><a href=details.html?type='+data.artist.type+'&id='+data.artist.id+'><span class="release_date track-info__bag--bg">Artist: </span>'+data.artist.name+'</a>'
   
   details += '<a href=details.html?type='+data.genres.data[0].type+'&id='+data.genre_id+'><span class="release_date track-info__bag--bg">Genre: </span>'+data.genres.data[0].name+'</a>'
   
   details +='<span class="release_date track-info__bag--bg">Release date: '+data.release_date+'</span></section>'
   domDescription.innerHTML = details
}

function createArtist(data) {
   img = data.picture_big
   domImage.src = img
   
   let details ='<div class="details_header"><h2>'+data.name+'</h2>'
   details +='<img src="./img/i_followers.png" class="fans"/><span>'+data.nb_fan+'</span></div>'
   
   details +='<section class="artist_top"><h3>Top tracks</h3>'
   
   fetch(apiRoute+data.type+'/'+data.id+'/top?limit=5')
   .then(res=>res.json())
   .then(res=>{      
      res.data.forEach(track => {
         details+='<a href=./details.html?type='+track.type+'&id='+track.id+'>'+track.title+' </a>' 
      })
      details +='</section>'
      domDescription.innerHTML = details
   })
}

function createTrack(data) {
   img = data.artist.picture_big
   domImage.src = img
   let details ='<section class="track_header"><h2>'+data.title+'</h2>'
   details +='<span id='+data.id+' class="star-track">add to playlist</span></section>'
   details += '<section class="track_info"><a href=details.html?type='+data.album.type+'&id='+data.album.id+'><span class="track-info__bag--bg">Album:</span>'+data.album.title+'</a>'
   details +='<span class="release_date track-info__bag--bg">Release-date'+data.release_date+'</span></section>'
   domDescription.innerHTML = details

   document.querySelector('.star-track').addEventListener('click', function (e) {
      addToPlaylist(e.target)
   })
}


function addToPlaylist(track) {
   if (playlist.indexOf(track.id)=== -1) {
      playlist.push(track.id)       
   }
   window.sessionStorage.setItem('playlist',JSON.stringify(playlist))  
}

fetch(apiRoute+type+'/'+id)
.then(res => res.json())
.then(res =>{
   console.log(res)
   detailsController(res)
})
