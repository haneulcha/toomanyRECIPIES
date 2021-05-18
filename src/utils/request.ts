import axios from 'axios'

const API_URL = `https://acnhapi.com/v1/houseware`

const requestAll = async () => {
    try{
    const response =  await axios.get(API_URL)
    
    if(response.status === 200){
        return response.data
    }
    
    } catch (err){
        throw err
    }
}




export { requestAll }