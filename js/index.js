const apiRoute = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/'

function chartController(req) {
    
   const artists = req.artists.data
   const albums = req.albums.data
   const tracks = req.tracks.data
   
   function shortener(str){
      let text
      if (str.length < '12') {
         text = str
      }else{
         text = str.substring(0, ((str.length/2)+2))+'...'
      }
      return text
   }

   function createArtistChart(artists){
      const domElement = document.querySelector('.top_artists') 
      let chart ='<a href=details.html?type='+artists.type+'&id='+artists.id+'>'
      chart +='<div class=top_tracks__details>'
      chart +='<h3 class="chart_title">'+shortener(artists.name)+'</h3>'
      chart +='<img class="charts__poster" src='+artists.picture+'>'
      chart +='</div>'
      chart +='</a>'
      domElement.innerHTML+=chart
   }
   function createAlbumChart(albums){
      const domElement = document.querySelector('.top_albums')
      let chart ='<a href=details.html?type='+albums.type+'&id='+albums.id+'>'
      chart += '<div class=top_tracks__details>'
      chart += '<h3 class="chart_title">'+shortener(albums.title)+'</h3>'
      chart += '<img class="charts__poster" src='+albums.cover+'>'
      chart += '</div>'
      chart += '</a>'  
      domElement.innerHTML += chart
   }

   function createTrackChart(tracks){      
      const domElement = document.querySelector('.top_tracks')
      let chart ='<a href=details.html?type='+tracks.type+'&id='+tracks.id+'>'
      chart += '<div class=top_tracks__details>'
      chart += '<h3 class="chart_title">'+shortener(tracks.title)+'</h3  >'
      chart += '<img class="charts__poster" src='+tracks.artist.picture+'>'
      chart += '</div>'
      chart += '</a>'
      domElement.innerHTML += chart
   }
   
   albums.forEach(album => {
      createAlbumChart(album)
   });
   tracks.forEach(track => {
      createTrackChart(track)
   });
   artists.forEach(artist => {
      createArtistChart(artist)
   });
}

fetch(apiRoute+'chart')
.then((res) => res.json())
.then((res) => {
   console.log(res)
   chartController(res)   
}) 