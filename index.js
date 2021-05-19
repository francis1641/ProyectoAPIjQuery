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

       //hacer con ajax el bucle for  
        for(let i=0;i<misDatos.articles.length;i++){
        crearCard(misDatos.articles[i]);

        //mostrarTitulo(misDatos);
      } 
    });
}

//

function mostrarTitulo(datos){

  /*div=document.createElement("div");
  document.body.appendChild(div);*/
  midiv=$("<div></div>");
  //$("body").append("<div ></div>")
  $.each(datos.articles, (i)=>{
  midiv.append("<li>"+datos.articles[i].title+"</li>");
});

/*   for(i=0;i<datos.articles.length;i++){
      /*li=document.createElement("li");
      li.innerHTML= datos.articles[i].title;
      midiv.append("<li>"+datos.articles[i].title+"</li>");

  } */
  midiv.appendTo("body");
}

function crearCard(noticia){

  divpadre=$("<div class='w3-container-noticia' id='w3-container'></div>");
  //divpadre=document.createElement("div");

  img=$("<img class='imgpadre'></img>");
  boton=$("<button class='botonpadre'></button>");
  titulo=$("<h3></h3>");


  divpadre.appendTo($("#maestro"));
  titulo.appendTo($("#w3-container"));
  img.appendTo($("#w3-container"));
  boton.appendTo($("#w3-container"));

  //divpadre.setAttribute("class", "w3-container-noticia");
  //divpadre.setAttribute("id", "w3-container");

  //img=document.createElement("img");
  if(noticia.urlToImage==null){
    //img.setAttribute("src", "img/imagennodisponible.png");
    $("imgpadre").attr("src", "img/imagennodisponible.png");
  }
  else{
    //img.setAttribute("src", noticia.urlToImage); 
    $("imgpadre").attr("src", noticia.urlToImage);
  }

  //boton=document.createElement("button");
  //boton.addEventListener("click",()=>mostrarDetalle(noticia),false );
  $("botonpadre").click(mostrarDetalle(noticia));

  boton.innerHTML="Más información";
  //titulo=document.createElement("h3");
  titulo.innerHTML= noticia.title; 

  //divpadre.append(titulo);
  //divpadre.append(img);
  //divpadre.append(boton);
  //$("#maestro").append(divpadre);
  //maestro= document.getElementById("maestro");
  // maestro.append(divpadre);
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

