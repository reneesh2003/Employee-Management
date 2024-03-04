import {React, useState} from 'react'
import './style/Signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleSignup=async(event)=>{
        event.preventDefault()
        try{
            await axios.post("http://localhost:8000/signup",{
                username,email,password
            })
            .then(res=>{
              if(res.data!="UserExist"){
                navigate("/Login")
              }
              else if(res.data==="UserExist"){
                alert("Email already used")
              }
            })
            .catch(e=>{
              console.log(e)
            })
        }
    catch(e){
        console.log(e)
    }
    }
    const handleSignin=async(event)=>{
        navigate("/")
    }
  return (
    <div class="container2">
    <h2>Signup</h2>
    <form >
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)} required/>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" onChange={(e)=>setemail(e.target.value)} required/>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>

      <input type="submit" value="Signup" onClick={handleSignup}/>
      <button class="signup-button" onClick={handleSignin}>Login</button>
    </form>
  </div>
  )
}

export default Signup