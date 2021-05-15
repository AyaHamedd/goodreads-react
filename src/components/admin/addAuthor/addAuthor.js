import {  useEffect, useState } from "react";
import axios from 'axios';
import './addAuthor.css'
import ErrorComponent from "../../reusableComponents/ErrorComponent";

// import { Redirect } from 'react-router-dom';



function AddAuthor(props) {
  const [formData, setFormData] = useState(props.label === "add" ?  {
    firstname : "", 
    lastname : "" , 
    dob : "" , 
    avatar : '' , 
    role : "author"


  } : {
    id : props.myObject.id,
    firstname : props.myObject.firstname, 
    lastname : props.myObject.lastname , 
    //  dob : props.myObject.DOB , 
    role : "author"
    // selectedFile : ''



  })


const errorMessages = {

  firstname:  'firstname is required and must be more than 2 characters',
  lastname:  'lastname is required and must be more than 2 characters',
  dob:  "date of birth is required",
  avatar:  "you must upload avatar"



}
const [isValid , setIs] = useState( props.label === "add" ? 
  {
  
    firstname:  false,
    lastname:  false,
    dob:  false,
    avatar:  false,


} : {

  firstname:  true,
    lastname:  true,
    dob:  true,
    avatar:  true,



}
)
useEffect(() => {
  if (formData.firstname !== '' && formData.firstname.length > 2) {
    setIs({...isValid,  firstname :true })
    

   
  }

  

  if (formData.lastname !== '' && formData.lastname.length > 2) {
    setIs({...isValid,  lastname :true })
  }


  if (formData.dob !== '' && props.label=== "add") {
    setIs({...isValid,  dob :true })
  }
  if ( props.label !== "add") {
    setIs({...isValid,  dob :true })
  }
  
 


  if (formData.avatar !== ''  && props.label=== "add") {
    setIs({...isValid,  avatar :true })
  }
  if ( props.label !== "add") {
    setIs({...isValid,  avatar :true })
  }

}, [formData])



 
  return (
    <div className=" d-flex flex-column min-vh-100 align-items-center justify-content-center bg-success">
      <form className="form row  align-items-center justify-content-center w-50 p-3 bg-light rounded-3">
      <div className=" justify-content-center ">
                  <div className="form-group  " >
                  <label >FIRST NAME</label>
                  <input type="text" className="form-control"
                  value={formData.firstname}  
                  onChange={(event)=>{

                      setFormData({...formData,firstname : event.target.value})

                  }}
                  
                  placeholder="enter your first name"/>

{ !isValid.firstname  &&  props.label == "add" ? 

<ErrorComponent > {errorMessages.firstname}</ErrorComponent> : ""

}
{ formData.firstname.trim() === "" &&  props.label !== "add"  ? 

<ErrorComponent > {errorMessages.firstname}</ErrorComponent> : ""

}
                    </div>
                    <div className="form-group " >

                  <label >last name</label>
                  <input type="text"
                  value={formData.lastname}  
                  onChange={(event)=>{

                      setFormData({...formData,lastname : event.target.value})

                  }}
                   className="form-control"  placeholder="enter your last name"/>

{ !isValid.lastname &&  props.label == "add" ? 

<ErrorComponent > {errorMessages.lastname}</ErrorComponent> : ""

}
{ (formData.lastname.trim() === "" &&  props.label !== "add" )  ? 

<ErrorComponent > {errorMessages.lastname}</ErrorComponent> : ""

}
                  </div>
                  <div className="form-group " >
                  <label >DATE OF BIRTH</label>
                  <input type="date"
                  value={formData.DOB}  
                  onChange={(event)=>{

                      setFormData({...formData,dob : event.target.value})

                  }}
                  
                  className="form-control"  />
                  { !isValid.dob  ? 

<ErrorComponent > {errorMessages.dob}</ErrorComponent> : ""

}
                    </div>
                  <div className="m-3">
                  <label >Choose a profile picture:</label>
                  <input type="file"
                        id="avatar" name="avatar"
                        accept="image/png, image/jpeg"
                        className="form-control-file"
                        // value={formData.selectedFile}
                        onChange={(event)=>{
                          setFormData({
                            ...formData , 
                            avatar: event.target.files[0],
                          })
                        }}
                        ></input>
                   { !isValid.avatar  ? 

<ErrorComponent > {errorMessages.avatar}</ErrorComponent> : ""

}
                  </div>
        </div>
        <button type="submit" className="btn btn-primary "  style={{width:70}}
          onClick={(event)=>{ 
            

                event.preventDefault() ; 

                if ( isValid.firstname && isValid.lastname &&  isValid.dob &&  isValid.avatar  )
                {

                  console.log("mydata" , formData) 
                  const mydata = new FormData() 
                  for (const [key, value] of Object.entries(formData)) {
                    mydata.append(key, value)
                }
  
  
  
                if(props.label === "add" )
                {
                  axios.post('http://localhost:3001/authors/' , mydata)
                  .then((response)=>{
  
                      console.log("item added successfully")
                      props.clicked("author")
                      // return <Redirect to='/' />
  
  
                      })
  
  
                }else{
                  console.log("item mydata ",formData )
  
                  axios.patch('http://localhost:3001/authors/' + props.myObject._id , mydata)
                  .then((response)=>{
  
                      console.log("item updated  successfully")
                      props.clicked("author")
                      // return <Redirect to='/' />
  
  
                      })
  
  
  
                }



                }

          
          
          }}
        >{props.label} </button>
      </form>
   </div>
  );
}

export default AddAuthor;





