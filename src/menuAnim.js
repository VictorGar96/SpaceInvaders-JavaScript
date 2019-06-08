
// Booleano que controla si el menú esta o no abierto
var openMenu = false;
var sound    = false;
// Varaibles que referencian a los elemento del html
var menu     = document.getElementsByTagName("ul")[0];
var image    = document.getElementById("pause"   )   ;
var playB    = document.getElementById("caja1"   )   ;
var exit     = document.getElementById("caja3"   )   ;
var _sound   = document.getElementById("caja2"   )   ;
  

// añadimos el evento deseado a  las variables creadas anteriormente
 image.addEventListener("click", Menu       );
 playB.addEventListener("click", Menu       );
  exit.addEventListener("click", closeWindow);
_sound.addEventListener("click", Sound      );

_sound.textContent = "Sound: On";

 // Función para abrir y cerrar el menú
function Menu()
{
    // En caso verdadero:
    if(openMenu)
    {
        menu.style.top = "0px";
        image.src      = "./assets/Hopstarter-Soft-Scraps-Button-Close.png";
        !gamePaused;
    }
    else
    {
        
        menu.style.top = "-385px";
        image.src      = "./assets/Pause_.png";
        gamePaused;
    }

    openMenu   = !openMenu;
    gamePaused = !gamePaused;
}

// Cerrar el menu
function closeWindow()
{
   alert("La ventana se va a cerrar.");
   window.close(); 
}

// Activar/desactivar Sonido
function Sound()
{
    if(sound)
        _sound.textContent = "Sound: On";
 
    else
        _sound.textContent = "Sound: Off";

    sound = !sound;
}

