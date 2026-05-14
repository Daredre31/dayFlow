import { useEffect, useState } from "react";
import { getStorage, saveTostorage } from "../Storage/savetostorage";

export const useLocalStorage = (key, pairs) => {

   const [value, setValue] = useState(() =>
      getStorage(key, pairs)
   )

   useEffect(() => {
      saveTostorage(key, value)
   }, [key, value])

   return [value, setValue]
}