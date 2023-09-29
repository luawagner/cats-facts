

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
export const getRandomFact = async () => { //Pasamos el fetch a una función y luego la llamamos en el useEffect
   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    const data = await res.json();
    const { fact } = data;
    return fact;
  }
 

