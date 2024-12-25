const URL=import.meta.env.VITE_API_URL


const getSharedWorkspace=async ()=>{
    const response=await fetch(`${URL}workspace/whosharewithme`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default getSharedWorkspace