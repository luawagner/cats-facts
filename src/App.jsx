import { useEffect, useState } from "react";
import "./App.css";
import { getRandomFact } from "./services/facts";


//const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMG_URL = "https://cataas.com/";
//Revisar las APIS y buscar los endpoints que necesitamos antes de hacer el fetch

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();


  //Cuando escribamos el useEffect siempre escribir primero el aray vacío(dependencias)
  // y luego la función para evitar errores.
  useEffect(()  => {
   getRandomFact().then(setFact)
  }, []); //Llamamos a la función del fetch

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

  
const handleClick = async () => {
const newFact = await getRandomFact()
setFact(newFact)
}

  return (
    <>
      <h1>App de gatitos</h1>
    <button onClick={handleClick}>Get new fact</button>
      {
        fact && <p>{fact}</p> // Renderizado condicional}
      }
      {imageUrl && (
        <img
          style={{ maxWidth: "320px" }}
          src={`${CAT_PREFIX_IMG_URL}${imageUrl}`}
          alt={`Image extracted using the three words for ${fact}`}
        />
      )}
    </>
  );
}

export default App;
