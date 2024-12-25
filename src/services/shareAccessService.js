const URL=import.meta.env.VITE_API_URL


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