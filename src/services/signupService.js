const signupService=async (formData)=>{
    const response= await fetch("http://localhost:3000/api/user/signup",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    return response
}

export default signupService