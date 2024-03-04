import {React, useState} from 'react'
import './style/Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate=useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin=async(event)=>{
        event.preventDefault()
        try{
            await axios.post("http://localhost:8000/signin",{
                username,password
            })
            .then(res=>{
              if(res.data!="UserNotExist"){
                document.cookie=username
                navigate("/dashboard")
              }
              else if(res.data==="UserNotExist"){
                alert("Wrong username or password")
              }
            })
            .catch(e=>{
              console.log(e)
            })
        }
    catch(e){
        console.log(e)
    }}
    const handleSignup=async(event)=>{
        navigate("/signup")
    }
  return (
    <div class="container1">
    <h2>Login</h2>
    <form >
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)} required/>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>

      <input type="submit" value="Login" onClick={handleLogin}/>
      <button class="signup-button" onClick={handleSignup}>SignUp</button>
    </form>
  </div>
  )
}

export default Login