import {createContext, useContext, useState } from "react";
import { db } from "./firebaseInit";
import { addDoc, collection, doc, updateDoc , getDocs} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const useUserContext = ()=>{
      const value = useContext(userContext);
      return value;
}
 
export const UserProvider = ({children})=>{
    const [checkUser , setCheckUser] = useState(false);
    const [cart , setCart] = useState([]);
    const [order , setOrder] = useState([]);
    const [userId , setUserId] = useState("");

    // SIGN UP 
    const [password , setPassword] = useState("");
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const navigate = useNavigate();

    const newUser = (name,email,password)=>{
        const user= {
              name : name,
              email : email,
              password : password,
              cart : [],
              order: [],
        }
        const useRef = collection(db, "users");
        const docRef = addDoc(useRef , user);
        setCheckUser(true);
   }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const signUp = ()=>{
          if(name.trim()==="" || email.trim()==="" || password.trim()===""){
              toast.error("enter valid details");
          } else {
              newUser(name,email,password);
              navigate('/');
          }
    }

    // LOG OUT
    const logOut = async ()=>{
        const useRef = doc(db,"users",userId);
        await updateDoc(useRef, {
            order: order,
            cart: cart
        });
        setCheckUser(false);
        toast.success("logout successfully");
    }

       //check authentication
       const authenticateUser = async (email, password) => {
        let isFound = false;
        const users = collection(db, "users");
        const querySnapshot = await getDocs(users);
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email && doc.data().password === password) {
                console.log(doc.id);
                setUserId(doc.id);
                setOrder(doc.data().order);
                setCart(doc.data().cart);
                isFound = true
                setCheckUser(true);
                console.log("auth", isFound);
            }
            else if (doc.data().email !== email && doc.data().password !== password) {
            }
        })
        if (isFound) {
            return true;
        }
        else {
            return false;
        }
    }
        
    //SIGH IN
    const [userName, setUserName] = useState("");
    const [logInPass , setLogInPass] = useState("");
    const handlePasswordName = (e) => {
        setLogInPass(e.target.value);
    }
    const handleUserName = (e) => {
        setUserName(e.target.value);
    }
    const logIn = ()=>{
        if(userName.trim()==="" || logInPass.trim()===""){
            toast.error("enter valid details");
        } else {
            authenticateUser(userName,logInPass);
            navigate('/');
        }
    }

    // ADD TO CART 
    // const addToCart = ()=>{
    
    // }
     
  return(
    <userContext.Provider value={{
         newUser,
         signUp,
         handleEmailChange,
         handleNameChange,
         handlePasswordChange,
         logOut,
         logIn,
         handleUserName,
         handlePasswordName,
         setCart,
         setOrder,
         order,
         cart,
         checkUser
         }} >
            
        {children} </userContext.Provider>

    )
}


// //IMPORT HOOK AND CONTEXT
// import {
//       useState,
//       useContext,
//       createContext
//   } from 'react'
  
//   //IMPORT DATABASE
//   import { db } from './firebaseInit';
  
//   //IMPORT FIREBASE KEYWORDS
//   import {
//       addDoc,
//       collection,
//       getDocs,
//       updateDoc,
//       doc
//   } from 'firebase/firestore';
  
//   //GETTING TOAST
//   import { toast } from 'react-toastify';

//   import { useNavigate } from 'react-router-dom';
  
//   //CREATE CONTEXT
//   const userContext = createContext();
  
//   //USE CUSTOM HOOK
//   export const useUserContext = () => {
//       const value = useContext(userContext);
//       return value;
//   }
  
//   //USE CUSTOM CONTEXT
//   export const UserProvider = ({ children }) => {
  
//       //authentication
//       const [authenticate, setAuthenticate] = useState(false);
  
//       //make user info
//       const [userCart, setUserCart] = useState([]);
//       const [userOrder, setUserOrder] = useState([]);
//       const [userId, setUserId] = useState("");

//       const [name, setName] = useState("");
//       const [email, setEmail] = useState("");
//       const [password, setPassword] = useState("");
  
//       //get date
//       const currentDate = new Date();
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth() + 1;
//       const date = currentDate.getDate();
  
   
  
//       //add new user
//       const newUser = (name, email, password) => {
//           const user = {
//               name: name,
//               email: email,
//               password: password,
//               cart: [],
//               orders: []
//           }
//           const useRef = collection(db, "users");
//           const docRef = addDoc(useRef, user);
//           setAuthenticate(true);
//           toast.success("New User Created Successfully")
//       }
  
//       //logout user
//       const logout = async () => {
//           console.log(userId);
//           const useRef = doc(db, "users", userId);
        //   await updateDoc(useRef, {
        //       orders: userOrder,
        //       cart: userCart
        //   });
//           setAuthenticate(false);
//           toast.success("Log out Successfully");
//       }
  
//       //set use cart
//       const setCartUser = (cart) => {
//           setUserCart(cart);
//       }
  
//       // checkout
//       const checkOut = () => {
//           let orderDate = date.toString() + '-' + month.toString() + '-' + year.toString();
//           let newOrder = { date: orderDate, order: userCart };
//           setUserOrder([newOrder, ...userOrder])
//           setUserCart([]);
//           toast.success("Items Purchased Successfully");
//       };
  
//       //remove from cart
//       const removeFromCart = (id) => {
//           let updatedCart = userCart.filter((product) => product.id !== id)
//           setUserCart(updatedCart);
//           toast.error("Item delated Successfully")
//       }

//     const navigate = useNavigate();
//     //target user name
//     const handleUsernameChange = (e) => {
//         setName(e.target.value);
//     }
//     //target user password
//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     }
//     //target user email
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     }
//     const signup = () => {
//       if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
//           toast.error("Please Enter Name, Username and Password");
//       }
//       else {
//           newUser(name, email, password);
//           navigate("/")
//       }
//   }
//       return (
//           <userContext.Provider value={{
//                   handleEmailChange,
//                   handlePasswordChange,
//                   handleUsernameChange,
//                   signup,
//               authenticate,
//               authenticateUser,
//               newUser,
//               logout,
//               setCartUser,
//               removeFromCart,
//               checkOut,
//               userCart,
//               setUserCart,
//               userOrder
//           }}>
//               {children}
//           </userContext.Provider>
//       )
//   }