const loginService=async (fromData)=>{
    const response=await fetch("http://localhost:3000/api/user/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(fromData)
    })
    return response
}

export default loginService