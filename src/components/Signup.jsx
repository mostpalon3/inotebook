import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})

  let navigate = useNavigate();

  const handleSubmit= async(e)=>{
      e.preventDefault();
      const {name,email,password} = credentials;//yha pehle hee nikal diya credentials se
      const response = await fetch ( 
          `http://localhost:5001/api/auth/createuser`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({ name,email,password }),
          }
        );
        const json = await response.json();
        if (json.success){
          //redirect and save the auth token
          localStorage.setItem('token',json.authToken)
          navigate("/")
          props.showAlert("Account Created Successfully","success")
        }else{
          props.showAlert("Invalid Details","danger")
        }
  }
  const onChange = (e) => {
      setCredentials({ ...credentials , [e.target.name]: e.target.value }); // Updates the respective field with its current value based on the input name.
    };
    //onSubmit use krne ka sabse bada fayeda ye hai kee ham min length aur required jaisi chiz use kar skte hai in buiult browser ka validation mil jata hai

  return (
    <div className='mt-2'>
      <h2 className="my-2">Create an account to use iNotebook</h2>
     <form onSubmit={handleSubmit}>
  <div className="form-group mb-3">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your name"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} placeholder="Password"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} placeholder="Confirm Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup;

