import React,{useState} from 'react'
import "./Register.scss";
// import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router';
import type { IRegisterForm } from '../../interfaces/users';
import { register } from '../../api/auth';

const Register = () => {
  const initialState = {userName:"",email:"",password:"", firstName:"", lastName:"",image:""};
  const [registerForm,setRegisterForm] = useState<IRegisterForm>(initialState);
  const navigate = useNavigate();
  const resetForm = () => setRegisterForm(initialState);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(registerForm);
      resetForm();
      navigate("/login")
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="registerePage">
      <form className="cover" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='inputsWrapper'>
        <input type="text" placeholder="firstName" onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} value={registerForm.firstName} required/>
        <input type="text" placeholder="lastName" onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} value={registerForm.lastName} required/>
        </div>
        <input type="text" placeholder="userName" onChange={(e) => setRegisterForm({...registerForm, userName: e.target.value})} value={registerForm.userName} required/>
        <input type="text" placeholder="E-Mail"  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} value={registerForm.email} required/>
        <input type="password" placeholder="password"  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} value={registerForm.password} required/>
        <button type='submit' className="signup-btn">Sign Up</button>

        <div className="alt-signup">
          <div className="google"></div>
        </div>
      </form>
    </div>
  );
};

export default Register