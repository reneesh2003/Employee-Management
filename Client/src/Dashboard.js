import './style/Dashboard.css'
import Home from './Components/Home'
import EmployeeList from './Components/EmployeeList'
import CreateEmployee from './Components/CreateEmployee'
import {React, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EditEmployee from './Components/EditEmployee'

const Dashboard = () => {
    const [componentToUse,changeComponent] = useState("home")
    const [editEmployee,setEditEmployee] = useState("hello")

    const navigate=useNavigate()
    const handleLogout=async(event)=>{
        navigate("/")
    }
    const [employees,setEmployees]=useState()

    const handleemployees= async () =>{
        try{
            await axios.get("http://localhost:8000/employees",)
            .then(res=>{
                setEmployees(res.data)
            })
            .catch(e=>{
              console.log(e)
            })
        }
        catch(e){
            console.log(e)
        }
      }
      useEffect(() => {
        handleemployees();
      }, [componentToUse]);
  return (
    <div>
        <nav>
    <div class="logo">Logo</div>
    <div>
      <a href="#" onClick={()=>changeComponent("home")}>Home</a>
      <a href="#" onClick={()=>changeComponent("employeeList")}>Employee List</a>
      <span>{document.cookie}</span>
      <a href="#" onClick={handleLogout}>Logout</a>
    </div>
  </nav>

  <div class="welcome">Welcome to Admin Panel</div>

  <div class="container3">
    {componentToUse==="home"?<Home/>:componentToUse==="employeeList"?<EmployeeList employees={employees} setEditEmployee={setEditEmployee} changeComponent={changeComponent}/>:componentToUse==="createEmployee"?<CreateEmployee changeComponent={changeComponent}/>:<EditEmployee changeComponent={changeComponent} editEmployee={editEmployee}/>}
  </div>
    </div>
  )
}

export default Dashboard