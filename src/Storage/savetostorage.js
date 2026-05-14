export const getStorage = (key , valuefallback) => {
    
    try {
       const item = localStorage.getItem(key , valuefallback) ;
       return item ? JSON.parse(item) : valuefallback
    } catch (error) {
       console.log("there is error whle loading from the strage" , error) 
    }
}

export const saveTostorage = (key , value) => {
    try {
        localStorage.setItem(key , JSON.stringify(value))
    } catch (error) {
        console.error(error)
    }
}

export const deleteFromStorage = (key , value) =>{
    try {
        localStorage.removeItem(key)
    } catch (error) {
     console.error(error)   
    }
}