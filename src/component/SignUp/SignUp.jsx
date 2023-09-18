import styles from "./signUp.module.css";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
import { useUserContext } from "../../UserContext";

const SignUp = ()=>{
    const {signUp,handleEmailChange,handleNameChange,handlePasswordChange} = useUserContext();
  
    return(
        <>
            <div className={styles.signIn}>
                <h1 className={styles.title}>Sign Up</h1>
                    <input onChange={(e) => handleNameChange(e)} placeholder="Enter Name" type="text"/>
                    <input onChange={(e) => handleEmailChange(e)} placeholder="Ener Email" type="email"/>
                    <input onChange={(e) => handlePasswordChange(e)} placeholder="Enter Password" type="password"/>
                    <button onClick={signUp}>SignUp</button>
                <p>Or <NavLink to="/signIn" >SignIn</NavLink> instead</p>
            </div>

           
        </>
    )
}

export default SignUp;