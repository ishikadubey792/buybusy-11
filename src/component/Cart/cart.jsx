import { NavLink, Navigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import styles from "./cart.module.css";

const Cart = () => {
        const {cart , setCart , checkUser , order , setOrder} = useUserContext();
        const removeFromCart = (id)=>{
        const updatedCart = cart.filter((item)=> item.id !== id);
        setCart(updatedCart);
    }
    if(!checkUser){
        return(
            <Navigate to="/" replace={true}/>
        )
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const purchasing = ()=>{
        let orderDate = date.toString()+ "/" + month.toString() + "/" + year.toString();
         setOrder([{date: orderDate , order: cart }, ...order]);
         setCart([]);
    }
  return (
    <>
      <aside className={styles.filter}>
        <h2>Total Price : &#x20B9;  {cart.reduce((total, product) => total + product.price*product.count, 0)}/- </h2>

        <NavLink to="/order" onClick={purchasing} className={styles.purchase}>Purchase</NavLink>
      </aside>

      <div className={styles.outerContainer}>
        {cart.map((item) => ( 
          <div key={item.id} className={styles.singleCard}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt="img" />
            </div>
            <div className={styles.titleContainer}>
              <p>{item.title}</p>
            </div>
            <div className={styles.priceContainer}>
              <p>&#x20B9; {item.price}</p>
            </div>
            <div className={styles.btnContainer}>
              <button onClick={()=>removeFromCart(item.id)} className={styles.cart}>Remove From Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cart;
