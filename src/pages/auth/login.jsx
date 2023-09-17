import { useState } from 'react';
import MedipalPicture from '../../medipalpicture.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate=useNavigate();

    async function handleLogin() {
        try {
            var response = await axios.get("http://localhost:8000/login",
                {
                    params: {
                        email: email,
                        password: password
                    }
                }
            );
            const data=response.data;
            alert(data.message);
            if(data.message=="Logged In"){
                localStorage.setItem("sessionid",data.sessionid);
                localStorage.setItem("email",data.email);
                localStorage.setItem("firstName",data.first_name);
                localStorage.setItem("lastName",data.last_name);
                window.location.reload();
            }
        }
        catch (e) {
            alert(e);
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="h-screen w-full flex flex-col justify-center items-center">


            <img className="w-24" src={MedipalPicture} alt="logo" />
            <input value={email} onChange={((newVal)=>{setemail(newVal.target.value);})} placeholder="Please enter your email" className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-10" />
            <input value={password} onChange={(newVal)=>{setpassword(newVal.target.value);}} type="password" placeholder="Please enter your password" className="w-96 px-4 py-2 rounded-md text-sm border-[2px] border-gray mt-2" />

            <button type="submit" className='text-white bg-blue-600 text-sm px-4 py-2 rounded-md mt-5 hover:scale-105 transition-all duration-300'>Login</button>

            <div className='text-sm text-gray mt-10'>Don't have an account? <button onClick={()=>{navigate("/signup")}} className='text-blue-500 font-bold'>Signup</button></div>

        </form>
    );
}

export default Login;