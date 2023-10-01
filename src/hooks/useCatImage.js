import { useEffect, useState } from "react";
const CAT_PREFIX_IMG_URL = "https://cataas.com/";
//custom hook
//le pasamos el fact como objeto para que sea más extensible, es una buena práctica
//por si en el futuro queremos agregar más parámetros.
export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState();
  
    //Hacemos otro useEffect que vigile el cambio de estado de 'fact'
    //Cuando haya un fact nuevo que haga el fetch para buscar la imagen.
    useEffect(() => {
      if (!fact) return;
      //como inicialmente el estado de fact es null, le indicamos que si no hay fact retorne.
      //El estado de fact va a cambiar luego de renderizarse el componente y podrá ejecutarse este efecto
      const threeFirstWords = fact.split(" ", 3).join(" ");
      console.log(threeFirstWords);
      fetch(
        `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
      )
        .then((res) => res.json())
        .then((response) => {
          const { url } = response;
          setImageUrl(url);
        });
    }, [fact]);
    return { imageUrl: `${CAT_PREFIX_IMG_URL}${imageUrl}` };
  }
  //Devuelve un objeto con el string de la url de la imagen + el prefijo
  //Esta lógica puedo reutilizarla en otros componentes, 
  //Al pasarla a un custom hook la quitamos de la lógica interna del componente App