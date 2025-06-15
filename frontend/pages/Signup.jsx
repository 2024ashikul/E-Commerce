import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [verify , setVerify] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const [code, setCode] =useState(null);
  const navigate = useNavigate();
  const handleSubmit = async() => {
    console.log("handling the submit");
    
    try {
      const res = await axios.post('http://192.168.0.102:3000/signup', form);

      console.log(res.data);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  function submitVCode(){
    const email = form.email;
    fetch('http://192.168.0.102:3000/verifycode',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({code,email})
    })
    .then((res) => res.json())
    .then((data) => {console.log(data);if(data.message == 'success') handleSubmit() ; })
    .catch((err) => console.log(err));
  }

  const handleVerify = async e =>{
    e.preventDefault();
    const email = form.email;
    console.log(email);
    fetch('http://192.168.0.102:3000/sendverificationcode',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({email})
    })
    .then((res) => res.json())
    .then((data) => {setVerify(true);console.log(data)})
    .catch((err) => console.log(err));
    setVerify(true);
  }

  console.log({verify,handleVerify});

  return (
    
    <div className='flex flex-col relative items-center'>
      <div>
      <form onSubmit={handleVerify}  method='POST' className={`items-center justify-center flex flex-col mt-20  p-10 ${verify && 'blur-sm'}`}>
        <div className=" flex flex-col px-10 py-5 bg-white rounded-lg shadow-lg">
          <h2 className="align-middle text-center pb-8 text-shadow-blue-500">Create a new account</h2>
          

          <div className="flex items-center gap-4 mb-6" >
            <label htmlFor="name" className='w-40 text-left'>
            Name
            </label>
            
            <input name="name" type="text"
            
            className='flex-1 w-96 px-3 py-2 rounded-md  border focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Name" value={form.name} onChange={handleChange} 

            required /> 
            
          </div>

          <div className="flex items-center gap-4 mb-6" >
            <label htmlFor="username" className='w-40 text-left'>
            Username
            </label>
            
            <input name="username" type="text"
            
            className='flex-1 w-96 px-3 py-2 rounded-md  border focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Username" value={form.username} onChange={handleChange} 

            required /> 
            
          </div>

          <div className="flex items-center gap-4 mb-6" >
            <label htmlFor="email" className='w-40 text-left'>
            Email
            </label>
            
            <input name="email" type="email"
            
            className='flex-1 w-96 px-3 py-2 rounded-md  border focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Email" value={form.email} onChange={handleChange} 

            required /> 
            
          </div>

          <div className='flex items-center gap-4 mb-6'>
            <label htmlFor="password" className='w-40 text-left'>
              Password
            </label>
            
            <input name="password" 
            
            type="password" className='flex-1 w-96 px-3 py-2 rounded-md border' placeholder="Password" value={form.password} onChange={handleChange} required />
          
          </div>
          
          
          <div className="flex justify-center ">
          <button
            type="submit"
            className="
            w-2/3 px-3 py-1
            rounded-md 
            bg-blue-600 
            text-white 
            hover:bg-blue-700 
            hover:rounded-2xl
            transition"
            
          >
            
            Sign Up
          </button>
        </div>
          
          
        </div>
      </form>
    {
        verify &&
        <div className=" blur-none absolute top-20 bg-green-500  justify-center items-center flex flex-col mt-20  py-10 px-20 border rounded-2xl ml-28 ">
          <p className='text-3xl'>Tell me the verification code</p>
          <input name='verifycode' placeholder='Verification code' className='w-0.8 text-center rounded-2xl p-2 bg-white mb-2'></input>
          <button className='p-2' onClick={submitVCode} onChange={(e)=>setCode(e.target.value)}>Verify</button>
          <p>Did not receive? Resend One</p>
      </div>
      }
      <div className='flex flex-col'>
        
        <p className='text-indigo-800 text-center text-2xl'> Have an account ? </p>
        <div className='flex justify-center '>
          <button className='justify-center items-center border w-1/5 px-5 py-1 text-white bg-gray-400 hover:scale-110 transition-transform hover:bg-blue-600'> 
            <Link to={'/login'} style={{textDecoration : 'none',color : 'white'}}>Log In </Link>
          </button>
        </div>
      </div>
      </div>

    </div>

  
  )
}

{/* <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form> */}