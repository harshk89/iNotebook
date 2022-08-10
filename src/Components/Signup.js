import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success) {
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken)
        navigate("/login", { replace: true });
        props.showAlert("Account created successfully", "success");
      }
      else {
        props.showAlert("User already exists!", "danger");
      }
  };

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div className="container">
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" onChange={onChange} required/>
        </div>  
        <button disabled={credentials.cpassword!==credentials.password || credentials.password.length<5} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
