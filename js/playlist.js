const apiRoute ='https://cors-anywhere.herokuapp.com/https://api.deezer.com/'
const domElement =document.querySelector('.playlist__tracks') 
console.log(window.sessionStorage);
const playlist =JSON.parse(window.sessionStorage.getItem('playlist')) || [];

playlist.forEach(track_id => {
   fetch(apiRoute+'/track/'+track_id)
   .then(res => res.json())
   .then(res=>{      
      domElement.innerHTML+=
      '<audio controls><source src='+res.preview+' type=></audio>'
   })
});