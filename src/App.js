import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProduct(data.products);
    }
    console.log("data", data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const selectPageHandler = (selectPage)=>{
    setPage(selectPage);
  }

  return (
    <div className="App">
      {product.length > 0 && (
        <div className="products">
          {product.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && <div className="pagination">
        <span>◀</span>
        {[...Array(product.length/10)].map((_,i)=>{
          return(
            <span 
            onClick={()=>{selectPageHandler(i+1)}}
            key={i}>{i+1}</span>
          )
        })
        }
        <span>▶</span>
         </div> }
    </div>
  );
}

export default App;
