import styles from "./Navbar.module.css";
import home from "./images/home.png";
import order from "./images/order.png";
import cart from "./images/cart.png";
import signIn from "./images/signIn.png";
import { NavLink } from "react-router-dom";
import logOutImg from "./images/logout.png";
import { useUserContext } from "../../UserContext";

const Navbar = () => {
  const { checkUser, logOut} = useUserContext();
  // const checkUser = false;
  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <h5 className={styles.buyBusy}>Busy Buy</h5>
        </div>
        <div className={styles.btnContainer}>
          {checkUser ? (
            <>
              <NavLink to="/" className={styles.singleBtn}>
                <img src={home} alt="img" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/order" className={styles.singleBtn}>
                <img src={order} alt="img" />
                <span>My order</span>
              </NavLink>
              <NavLink to="/cart" className={styles.singleBtn}>
                <img src={cart} alt="img" />
                <span>My cart</span>
              </NavLink>
              <NavLink onClick={()=>{logOut()}} to="/" className={styles.singleBtn}>
                <img src={logOutImg} alt="img" />
                <span>Log Out</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={styles.singleBtn}>
                <img src={home} alt="img" />
                <span>Home</span>
              </NavLink>

              <NavLink to="/signIn" className={styles.singleBtn}>
                <img className={styles.signIn} src={signIn} alt="img" />
                <span>SignIn</span>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
