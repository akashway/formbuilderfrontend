const URL=import.meta.env.VITE_API_URL



const fetchFolderService = async () => {
    const response = await fetch(`${URL}folder`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

const addFolder=async (folderData)=>{
    const response=await fetch(`${URL}folder/addfolder`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`${localStorage.getItem('token')}`
        },
        body:JSON.stringify(folderData)
    })
    return response
}

const fetchFileInsideUserService=async()=>{
    const response=await fetch(`${URL}folder`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })

    return response
}

export {fetchFolderService,addFolder,fetchFileInsideUserService}