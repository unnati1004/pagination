import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProduct = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProduct(data.products);
      setTotalPages(Math.ceil(data.total / 10)); // Correct totalPages calculation
    }
    console.log("data", data);
  };

  useEffect(() => {
    fetchProduct();
  }, [page]);

  const selectPageHandler = (selectPage) => {
    if (selectPage >= 1 && selectPage <= totalPages && selectPage !== page) {
      setPage(selectPage);
    }
  };

  return (
    <div className="App">
      {product.length > 0 && (
        <div className="products">
          {product.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="pagination">
          <span
            className={page === 1 ? "pagination__disable" : ""}
            onClick={() => {
              selectPageHandler(page - 1);
            }}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => {
                  selectPageHandler(i + 1);
                }}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page === totalPages ? "pagination__disable" : ""}
            onClick={() => {
              selectPageHandler(page + 1);
            }}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
