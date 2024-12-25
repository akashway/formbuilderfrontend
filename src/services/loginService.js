const URL=import.meta.env.VITE_API_URL
console.log(URL)

const loginService=async (fromData)=>{
    const response=await fetch(`${URL}user/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(fromData)
    })
    return response
}

export default loginService