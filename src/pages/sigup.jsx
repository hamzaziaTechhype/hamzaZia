import React from 'react'
import { useState } from 'react';
import { API_User_Ragister } from '../constrants/index.js';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
const Ragister = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [zip, setzip] = useState("");
  const [street, setstreet] = useState("");
  const [houseNumber, sethouseNumber] = useState("");
  const [error, setError] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const savebtnhandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("zip", zip);
    formData.append("street", street);
    formData.append("houseNumber", houseNumber);
    let isValid = true;
    if (firstName.trim() === "") {
      setfirstName("Name is required.");
      isValid = false;
    } else if (/[\d!@#$%^&*(),.?":{}|<>]/.test(firstName)) {
      setError("Name cannot contain numbers or symbols.");
      isValid = false;
    }
    if (isValid) {
      try {
        let response = await axios.post(API_User_Ragister, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          alert("Success!", "Registration Successful!", "success");
          setAddedSuccessfully(true);
          navigate('/Verifyaccount');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

return (
   <>
<div className="wrapper-login">
  <div className="inner">
    <form >
      <h3 className='text-white text-center'>Ragister</h3>
      <div className="form-holder">
        <span className="lnr lnr-user" />
        <input type="text" className="form-control mb-2" placeholder="Username" name="firstName" onChange={(e) => setfirstName(e.target.value)} />
      </div>
      <div className="form-holder">
        <span className="lnr lnr-phone-handset" />
        <input type="text" className="form-control mb-2" placeholder="Last Name" name="lastName" onChange={(e) => setlastName(e.target.value)} />
      </div>
      <div className="form-holder">
        <span className="lnr lnr-envelope" />
        <input type="text" className="form-control mb-2" placeholder="email" name="email" onChange={(e) => setemail(e.target.value)}/>
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <input type="password" className="form-control mb-2" placeholder="Password" name="password" onChange={(e) => setpassword(e.target.value)}/>
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <PhoneInput placeholder="+92 300 4000000" value={phone} onChange={setphone} />      {/* <input type="text" className="form-control mb-2" placeholder="phone" name="phone" /> */}
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <input type="text" className="form-control mb-2" placeholder="street" name="street" onChange={(e) => setstreet(e.target.value)}/>
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <input type="text" className="form-control mb-2" placeholder="zip" name="zip" onChange={(e) => setzip(e.target.value)}/>
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <input type="text" className="form-control mb-2" placeholder="houseNumber" name="houseNumber"  onChange={(e) => sethouseNumber(e.target.value)}/>
      </div>
      <button type='submit' onClick={savebtnhandler} className='btn btn-success'>
      Register
      </button>
    </form>
  </div>
</div>
   </>
  )
}

export default Ragister