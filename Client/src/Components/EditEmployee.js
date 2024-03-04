import {React, useState} from 'react'
import axios from 'axios'

const EditEmployee = ({changeComponent,editEmployee}) => {
    console.log(editEmployee,"new")
    const [name, setname] = useState(editEmployee.name);
    const [email, setemail] = useState(editEmployee.email);
    const [mobileNo, setmobileNo] = useState(editEmployee.mobileNo);
    const [designation, setDesignation] = useState(editEmployee.designation);
    const [gender, setGender] = useState(editEmployee.gender);
    const [courses, setCourses] = useState(editEmployee.course);
    const [createDate, setCreatedate] = useState(editEmployee.createDate);
    const [img, setImg] = useState('');

    const handleEditEmployee = async(event)=>{
        event.preventDefault()
        try{
            await axios.put("http://localhost:8000/updateemployee",{
                name,email,mobileNo,designation,gender,courses,createDate,img
            },{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }})
            .then(res=>{
              if(res.data==="EmployeeUpdated"){
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
            <h2>Edit Employee</h2>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value={name} required onChange={(e)=>setname(e.target.value)}/>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" value={email} required onChange={(e)=>setemail(e.target.value)}/>

      <label for="mobile">Mobile No:</label>
      <input type="text" id="mobile" name="mobile" value={mobileNo} pattern="[0-9]{10}" required onChange={(e)=>setmobileNo(e.target.value)}/>

      <label for="designation">Designation:</label>
      <select id="designation" name="designation" value={designation} required onChange={(e)=>setDesignation(e.target.value)}>
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>

      <label>Gender:</label>
      <label><input type="radio" name="gender" value="M" required checked={gender === 'M'} onChange={(e)=>setGender(e.target.value)}/> Male</label>
      <label><input type="radio" name="gender" value="F" required checked={gender === 'F'} onChange={(e)=>setGender(e.target.value)}/> Female</label>

      <label>Course:</label>
      <label><input type="checkbox" name="course" value="MCA" checked={courses.includes('MCA')} onChange={(e)=>setCourses(e.target.value)}/> MCA</label>
      <label><input type="checkbox" name="course" value="BCA" checked={courses.includes('BCA')} onChange={(e)=>setCourses(e.target.value)}/> BCA</label>
      <label><input type="checkbox" name="course" value="BSC" checked={courses.includes('BSC')} onChange={(e)=>setCourses(e.target.value)}/> BSC</label>

      <label for="img">Img Upload:</label>
      <input type="file" id="img" name="img" accept="image/jpeg, image/png" required  onChange={(e)=>setImg(e.target.files[0])}/>

      <input type="submit" value="Submit" onClick={handleEditEmployee}/>
    </form>
    </div>
  )
}

export default EditEmployee