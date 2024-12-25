const URL=import.meta.env.VITE_API_URL

const fetchFileOfCurrentUser=async ()=>{
    const response=await fetch(`${URL}file`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })

    return response
}


const fetchFileOfSelectedFolder=async (folderName)=>{
    const response=await fetch(`${URL}file/${folderName}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })

    return response
}

const addFile=async (data)=>{
    const response=await fetch(`${URL}file/addFile`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body:JSON.stringify(data)
    })

    return response
}

export {fetchFileOfCurrentUser,fetchFileOfSelectedFolder,addFile}