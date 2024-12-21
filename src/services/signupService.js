import {URL} from './backendConnectionURL'

const signupService=async (formData)=>{
    const response= await fetch(`${URL}user/signup`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })

    return response
}

export default signupService