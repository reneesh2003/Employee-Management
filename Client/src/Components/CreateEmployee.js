import {React, useState} from 'react'
import axios from 'axios'

const CreateEmployee = ({changeComponent}) => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [courses, setCourses] = useState([]);
    const [img, setImg] = useState(null);

    const handleCreateEmployee=async(event)=>{
        event.preventDefault()
        try{
            await axios.post("http://localhost:8000/createemployee",{
                name,email,mobileNo,designation,gender,courses,img
            },{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }})
            .then(res=>{
              if(res.data==="EmployeeAdded"){
                changeComponent("employeeList")
              }
              else if(res.data==="EmployeeExist"){
                alert("Employee already used")
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
            <h2>Create Employee</h2>
    <form >
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required onChange={(e)=>setname(e.target.value)}/>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required onChange={(e)=>setemail(e.target.value)}/>

      <label for="mobile">Mobile No:</label>
      <input type="text" id="mobile" name="mobile" pattern="[0-9]{10}" required onChange={(e)=>setmobileNo(e.target.value)}/>

      <label for="designation">Designation:</label>
      <select id="designation" name="designation" required onChange={(e)=>setDesignation(e.target.value)}>
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>

      <label>Gender:</label>
      <label><input type="radio" name="gender" value="M" required onChange={(e)=>setGender(e.target.value)}/> Male</label>
      <label><input type="radio" name="gender" value="F" required onChange={(e)=>setGender(e.target.value)}/> Female</label>

      <label>Course:</label>
      <label><input type="checkbox" name="course" value="MCA" onChange={(e)=>setCourses(e.target.value)}/> MCA</label>
      <label><input type="checkbox" name="course" value="BCA" onChange={(e)=>setCourses(e.target.value)}/> BCA</label>
      <label><input type="checkbox" name="course" value="BSC" onChange={(e)=>setCourses(e.target.value)}/> BSC</label>

      <label for="img">Img Upload:</label>
      <input type="file" id="img" name="img" accept="image/jpeg, image/png" required onChange={(e)=>setImg(e.target.files[0])}/>

      <input type="submit" value="Submit" onClick={handleCreateEmployee}/>
    </form>
    </div>
  )
}

export default CreateEmployee