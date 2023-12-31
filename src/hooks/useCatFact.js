import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export function useCatFact()  {
    const [fact, setFact] = useState();
    
    const refreshFact = () => {
      getRandomFact().then(setFact); //llamamos a la función del fetch que está en services.
    }
    useEffect(refreshFact, []); 
  return { fact, refreshFact } //Retorno el fact y también la función que me permite actualizar el fact
  }
  