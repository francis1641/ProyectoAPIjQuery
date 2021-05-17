var numPagina=1, referenciaFuncion;


function peticionBusiness() {
  if(referenciaFuncion!=peticionBusiness){
    numPagina=1;
  }
  document.getElementById("maestro").innerHTML="";
  loadDoc("https://newsapi.org/v2/top-headlines?page="+numPagina+"&pageSize=15&country=us&category=business&apiKey=5e976ef6430f49e08d17ea33c7605f41");
  referenciaFuncion=peticionBusiness;
}

function peticionEntertainment() {
  if(referenciaFuncion!=peticionEntertainment){
    numPagina=1;
  }
  document.getElementById("maestro").innerHTML="";
  loadDoc("https://newsapi.org/v2/top-headlines?page="+numPagina+"&pageSize=15&country=us&category=entertainment&apiKey=5e976ef6430f49e08d17ea33c7605f41");
  referenciaFuncion=peticionEntertainment;
}

function peticionGeneral() {
  if(referenciaFuncion!=peticionGeneral){
    numPagina=1;
  }
  document.getElementById("maestro").innerHTML="";
  loadDoc("https://newsapi.org/v2/top-headlines?page="+numPagina+"&pageSize=15&country=us&category=general&apiKey=5e976ef6430f49e08d17ea33c7605f41");
  referenciaFuncion=peticionGeneral;
}

function peticionHealth() {
  if(referenciaFuncion!=peticionHealth){
    numPagina=1;
  }
  document.getElementById("maestro").innerHTML="";
  loadDoc("https://newsapi.org/v2/top-headlines?page="+numPagina+"&pageSize=15&country=us&category=health&apiKey=5e976ef6430f49e08d17ea33c7605f41");
  referenciaFuncion=peticionHealth;
}

function peticionBuscador()
{
  if(referenciaFuncion!=peticionBuscador){
    numPagina=1;
  }
  document.getElementById("maestro").innerHTML="";
  evento= window.event;
  leidoDelInput= evento.target.value;
if(leidoDelInput!=""){
  loadDoc("https://newsapi.org/v2/everything?q="+leidoDelInput+"&page"+numPagina+"&pageSize=15&apiKey=5e976ef6430f49e08d17ea33c7605f41");
}
else{
  
}
    referenciaFuncion=peticionBuscador;
}

function cambiarPagina(){
    numPagina++;
    referenciaFuncion();
}
/*
function loadDoc(url) {

  url="https://api.allorigins.win/raw?url="+encodeURIComponent(url);
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 1){
        document.getElementById("miimagen").style.display="inline";
      }

      if (this.readyState == 4 && this.status == 200) {   
        document.getElementById("miimagen").style.display="none";
        misDatos= JSON.parse(this.responseText);;
        for(let i=0;i<misDatos.articles.length;i++){
        crearCard(misDatos.articles[i]);
        }
        
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
*/
function loadDoc(url){
  $.ajax({
    url: "https://api.allorigins.win/raw?url="+encodeURIComponent(url),
    beforeSend: function() {
      
      $("#miimagen").attr("style", "display: inline");
    }
  })
    .done(function( misDatos ) {
    
        console.log( "Sample of data:", misDatos);
        $("#miimagen").attr("style", "display: none");
      // misDatos= JSON.parse(this.responseText);
       //hacer con ajax el bucle for  
        for(let i=0;i<misDatos.articles.length;i++){
        crearCard(misDatos.articles[i]);
      } 
    });
}


//

function mostrarTitulo(datos){
    div=document.createElement("div");
    document.body.appendChild(div);
    for(i=0;i<datos.articles.length;i++){
        li=document.createElement("li");
        li.innerHTML= datos.articles[i].title;
        div.appendChild(li);

    }
}

function crearCard(noticia){

  divpadre=document.createElement("div");
  divpadre.setAttribute("class", "w3-container-noticia");
  divpadre.setAttribute("id", "w3-container");

  img=document.createElement("img");
  if(noticia.urlToImage==null)
    img.setAttribute("src", "img/imagennodisponible.png");
  else 
    img.setAttribute("src", noticia.urlToImage); 
  boton=document.createElement("button");
  boton.addEventListener("click",()=>mostrarDetalle(noticia),false )
  boton.innerHTML="Más información";
  titulo=document.createElement("h3");
  titulo.innerHTML= noticia.title; 

  divpadre.appendChild(titulo);
  divpadre.appendChild(img);
  divpadre.appendChild(boton);
  maestro= document.getElementById("maestro");
  maestro.appendChild(divpadre);
}


 function mostrarDetalle(articulo)
 {
    modal = document.getElementById("modalDetalle");
    if(articulo.author==null)
      modal.children[0].children[0].children[1].innerHTML= "No hay autor";
    else 
      modal.children[0].children[0].children[1].innerHTML= articulo.author;
    
      if(articulo.content==null)
        modal.children[0].children[0].children[2].innerHTML= "No hay contenido";
      else 
        modal.children[0].children[0].children[2].innerHTML= articulo.content;
    
      if(articulo.description==null)
        modal.children[0].children[0].children[2].innerHTML= "No hay descripcion";
      else 
        modal.children[0].children[0].children[2].innerHTML= articulo.description;
      modal.children[0].children[0].children[3].innerHTML= articulo.description;
      modal.children[0].children[0].children[4].innerHTML= articulo.publishedAt;
      modal.children[0].children[0].children[5].href= articulo.url;
  
    //modal.innerHTML = articulo.author;
    modal.style.display = "block";

 }

 window.onload = () =>{

   loadDoc("https://newsapi.org/v2/everything?q=game&pageSize=15&apiKey=5e976ef6430f49e08d17ea33c7605f41");
   
 }

