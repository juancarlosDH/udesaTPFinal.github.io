const apiRoute = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/'
  
let queryString = location.search 
let searchParams = new URLSearchParams(queryString) 
let search = searchParams.get("q") 
const domContainer = document.querySelector('.results_container')
const spinner = document.querySelector('.wrapper-spinner');

function resultsController(req) {
   createResult(req)
}

function createResult(obj){
   // Remove spinner
   
   obj.data.forEach(element => {
      let gallery = '<a href =details.html?type='+element.type+'&id='+element.id+'><div class="genre">'
      gallery += '<h2>'+shortener(element.title)+'</h2>'
      gallery += '<img src='+element.artist.picture_medium+'>'
      gallery += '</div></a>'
      domContainer.innerHTML += gallery
   });
   spinner.style.display = "none";
}

function shortener(str){
   let text
   if (str.length < '12') {
      text = str
   }else{
      text = str.substring(0, (str.length/2))+'...'
   }
   return text
}

fetch(apiRoute+'search?q='+search)
.then(res=>res.json())
.then(res=> {
   console.log(res)
   resultsController(res)   
})