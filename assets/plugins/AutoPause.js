/*
  Intersection Observer sirve observar elementos y si cruzan un umbral(threshold)
  que se define dentro de un contenedor, en este caso window, IntersectionObserver nos lo notifica
  y con eso podemos hacer algo.
*/

function AutoPause(){
    this.threshold = 0.25;
    this.handlerIntersection = this.handlerIntersection.bind(this);
  }
  
  AutoPause.prototype.run = function(player){
    this.player = player;
    /*
      IntersectionObserver recibe dos parametros,
  
      handler --> Funcion que recibe el "aviso" de que hubo una interseccion en el elemento que se
      observa
      config --> objeto de configuracion
    */
    const observer = new IntersectionObserver(this.handlerIntersection, {
      /* Define un umbral, es decir que porcentaje de un elemento dentro de un contenedor tiene que interceptar
        para avisar
      */
      threshold: this.threshold
    });
    observer.observe(this.player.media);
  }
  
  /*
    Cuando IntersectionObserver llame al handler, le pasa una lista de entries, los cuales son todos los objetos
    que se están observando, un Array.
  */
  AutoPause.prototype.handlerIntersection = function(entries){
    const entry = entries[0];
    const isVisible = entry.intersectionRatio >= this.threshold;
    if(isVisible){
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  
  export default AutoPause;