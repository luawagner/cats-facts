import { useEffect, useState } from "react";
import "./App.css";
import { getRandomFact } from "./services/facts";
import { useCatImage } from "./hooks/useCatImage";

//const CAT_ENDPOINT_IMG_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMG_URL = "https://cataas.com/";
//Revisar las APIS y buscar los endpoints que necesitamos antes de hacer el fetch



function App() {
  const [fact, setFact] = useState();
  const { imageUrl } = useCatImage({ fact }); //Extrae el valor de imageUrl del custom hook

  //Cuando escribamos el useEffect siempre escribir primero el aray vacío(dependencias)
  // y luego la función para evitar errores.
  useEffect(() => {
    getRandomFact().then(setFact);
  }, []); //Llamamos a la función del fetch

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

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
