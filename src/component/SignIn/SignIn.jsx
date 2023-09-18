import { NavLink, useActionData } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { useUserContext } from "../../UserContext";

 const SignIn = ()=>{
    const { logIn,
        handleUserName,
        handlePasswordName} = useUserContext();
    return(
        <>
            <div className={styles.signIn}>
                <h1 className={styles.title}>Sign In</h1>
                    <input onChange={handleUserName} placeholder="Enter Email" type="email"/>
                    <input onChange={handlePasswordName} placeholder="Enter Password" type="password"/>
                    <button onClick={logIn}>SignIn</button>
                <p>Or <NavLink to="/signUp">SignUp</NavLink> instead</p>
            </div>
        </>
    )
}

export default SignIn;