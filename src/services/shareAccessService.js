import {URL} from './backendConnectionURL'


const shareAccessService=async (data)=>{
    const response=await fetch(`${URL}shareaccess`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`${localStorage.getItem('token')}`
        },
        body:JSON.stringify(data)
    })
    return response
}
export default shareAccessService