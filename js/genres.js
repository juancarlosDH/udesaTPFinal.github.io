const apiRoute = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/'
  
let queryString = location.search 
let searchParams = new URLSearchParams(queryString) 
let id = searchParams.get("id")
let type = searchParams.get('type') 
const domContainer = document.querySelector('.genres_container')

function genresController(req) {
   createGenres(req)
}

function createGenres(obj){
   obj.data.forEach(element => {
     let gallery = '<a href =details.html?type='+element.type+'&id='+element.id+'><div class="genre">'
     gallery += '<h2>'+element.name+'</h2>'
     gallery += '<img src='+element.picture_medium+'>'
     gallery += '</div></a>'
     domContainer.innerHTML += gallery
   });
}

fetch(apiRoute+'genre')
.then(res => res.json())
.then(res =>{
   console.log(res)
   genresController(res)
})
