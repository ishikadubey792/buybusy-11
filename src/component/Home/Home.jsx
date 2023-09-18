import styles from "./Home.module.css";
import Loader from "../loader/loader";
import { useState, useEffect } from "react";
import { useUserContext } from "../../UserContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter , setPirceFilter] = useState(1000);
  const [selectCategory , setSelectCategory] = useState([]);
  const [search , setSearch] = useState("");
  const {cart , setCart} = useUserContext();

  function handlePriceFilter(e){
       setPirceFilter(Number(e.target.value));
  }
  function handleCategory(e){
     const category = e.target.value;
        if (selectCategory.includes(category)) {
            // Deselect category if it's already selected
            setSelectCategory(selectCategory.filter((c) => c !== category));
        } else {
            // Select category if it's not already selected
            setSelectCategory([...selectCategory, category]);
        }
  }

  
  function searchQuery(e){
     setSearch(e.target.value);
 }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  //SETTING LOADER
  if (loading) {
    return <Loader />;
  }
  const filterdProduct = products.filter((product)=>{
    const matchPrice =  product.price<=priceFilter;
    const matchCategory = selectCategory.length === 0 || selectCategory.some((category) => product.category.toLowerCase() === category.toLowerCase());
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
      return matchPrice && matchCategory && matchSearch;
})

const isCategorySelected = (category) => {
    return selectCategory.includes(category);
  };
  // add to cart
  const addToCart = (id)=>{
     let alreadyInCart = cart.find((item)=> item.id === id);
     let newItem = products.find((item)=>item.id === id);

     if(alreadyInCart){
         setCart(cart.map((item)=>item.id === id ? {...item,count : item.count + 1} : item));
     } else {
         newItem.count= 1;
         setCart([...cart,newItem])
     }
  }
  return (
    <>
      <div className={styles.search}>
        <input onChange={searchQuery} placeholder="search" type="text" />
      </div>

      {/* filter section  */}
      <aside className={styles.filter}>
        <h2>Filter</h2>
        <div>
          <div className={styles.range}>
            <p>Price :  {priceFilter} </p>
            <input onChange={handlePriceFilter} value={priceFilter} type="range" min="1" max="1000" step={20}/>
          </div>

          <div className={styles.category}>
            <h2>Category</h2>
            <div className={styles.check}>
              <input onChange={handleCategory} checked={isCategorySelected("Men's Clothing")} value="Men's Clothing"  type="checkbox" />
              <span>Men's Clothing</span>
            </div>
            <div className={styles.check}>
              <input onChange={handleCategory} checked={isCategorySelected("Women's Clothing")} value="Women's Clothing" type="checkbox" />
              <span>Women's Clothing</span>
            </div>
            <div className={styles.check}>
              <input onChange={handleCategory} checked={isCategorySelected("jewelery")} value="jewelery" type="checkbox" />
              <span>Jewelery</span>
            </div>
            <div className={styles.check}>
              <input onChange={handleCategory} checked={isCategorySelected("Electronics")} value="Electronics" type="checkbox" />
              <span>Electronics</span>
            </div>
          </div>
        </div>
      </aside>

      {/* result container  */}
      <div className={styles.outerContainer}>
        {filterdProduct.map((item) => (
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
              <button onClick={()=>addToCart(item.id)} className={styles.cart}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
