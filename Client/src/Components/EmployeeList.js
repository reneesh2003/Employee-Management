import {React, useEffect,useState} from 'react'
import axios from 'axios'

const EmployeeList = ({changeComponent,setEditEmployee,employees}) => {
    const [search,setSearch] = useState('')
    const [filterEmployees,setFilterEmployees] = useState(employees)
    const [sortEmployees,setSortEmployees] = useState(employees)



    

    const handleDisplay= ()=>{
        setFilterEmployees(sortEmployees.filter(employee => {
            // Check if any of the employee properties contain the search term
            return Object.values(employee).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
            );
        }));
        console.log(filterEmployees)
    }

    useEffect(()=>handleDisplay()
        ,[search]
    )

    const handleEmailSort = ()=>{
       setSortEmployees(employees.sort((a, b) => a.email.localeCompare(b.email)))
       handleDisplay()
    }

    const handleNameSort = ()=>{
        setSortEmployees(employees.sort((a, b) => a.name.localeCompare(b.name)))
        handleDisplay()
    }

    const handleIDSort = ()=>{
        setSortEmployees(employees.sort((a, b) => a._id.localeCompare(b._id)))
        handleDisplay()

    }
    
    const handleCreateDateSort = ()=>{
        setSortEmployees(employees.sort((a, b) => new Date(a.createDate) - new Date(b.createDate)))
        handleDisplay()
    }

    const handleEdit=(employee)=>{
        console.log(employee);
        setEditEmployee(employee);
        changeComponent("EditEmployee")
    }
    const handleDelete = async(event,email)=>{
        event.preventDefault()
        console.log(email,"new")
        try{
            await axios.delete("http://localhost:8000/deleteemployee",{
                data: { email }
            })
            .then(res=>{
              if(res.data==="EmployeeDeleted"){
                changeComponent("employeeList")
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
  return (
    <div>
         <h2>Employee List</h2>
    <div class="search-container">
        <p>*Click on Email,Name,ID,CreateDate column to sort</p>
      <input type="text" placeholder="Enter Search Keyword" onChange={(e)=>setSearch(e.target.value)}/>
      <button class="create-button">Search</button>
      <button class="create-button" onClick={()=>changeComponent("createEmployee")}> Create Employee</button>
      <span>Total Count: {employees.length}</span>
    </div>
    <table>
      <thead>
        <tr>
          <th onClick={()=>handleIDSort()}>Unique Id</th>
          <th>Image</th>
          <th onClick={()=>handleNameSort()}>Name</th>
          <th onClick={()=>handleEmailSort()}>Email</th>
          <th>Mobile No</th>
          <th>Designation</th>
          <th>Gender</th>
          <th>Course</th>
          <th onClick={()=>handleCreateDateSort()}>Create Date</th>
          <th>Action</th>
        </tr>
      </thead>
      {filterEmployees.map((employee,key)=>(
        <tbody key={employee._id}>
        <tr>
          <td>{employee._id}</td>
          <td><img height={100} width={100} src={"data:image/png;base64,"+employee.img} ></img></td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.mobileNo}</td>
          <td>{employee.designation}</td>
          <td>{employee.gender}</td>
          <td>{employee.course}</td>
          <td>{employee.createDate}</td>
          <td><button class="create-button" onClick={()=>handleEdit(employee)}>Edit</button> <button class="create-button" onClick={(e)=>{handleDelete(e,employee.email)}}>Delete</button></td>
        </tr>
      </tbody>
      ))}
      
    </table>
    </div>
  )
}

export default EmployeeList