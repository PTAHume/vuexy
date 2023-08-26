// ** React Imports
import { Fragment } from "react";
import { offersSlice } from "../store";
// ** Product components
import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import ProductsSearchbar from "./ProductsSearchbar";
import { useState } from "react";
import "@styles/react/libs/spinner/spinner.scss";
// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ProductsPage = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    activeView,
    getProducts,
    setActiveView,
    appliedFilters,
   
  } = props;

  const [loading, setLoading] = useState(false); //this is general spinner occupies whole page
  const [productPartLoading, setproductPartLoading] = useState(false); //this is general spinner occupies Priduct part 

  // ** Handles pagination
  const handlePageChange = async (newPage) => {
    let targetPage;

    if (newPage === "next") {
      targetPage = store.params.page + 1;
    } else if (newPage === "prev") {
      targetPage = store.params.page - 1;
    } else {
      targetPage = newPage;
    }

    if (targetPage >= 1) {
      if (store.pages[targetPage]) {
        // Update the page number in the store
        dispatch(
          offersSlice.actions.updateParams({
            ...store.params,
            page: targetPage,
          })
        );
      } else {
        setLoading(true); // Set loading to true before fetching data
        // Fetch the new page and store it in the pages object
        const newParams = {
          ...store.params,
          ...appliedFilters,
          page: targetPage,
        };
        const result = await dispatch(getProducts(newParams)); // Make the dispatch call awaitable
        setLoading(false); // Set loading to false after data is fetched

        // Dispatch setPages with the new page data
        dispatch(
          offersSlice.actions.setPages({
            page: targetPage,
            data: result.payload.products,
          })
        );
      }
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.totalProducts !== 0 && store.products.length !== 0
        ? Math.ceil(store.totalProducts / store.params.perPage)
        : 1;

    if (arrLength > 0) {
      return new Array(arrLength).fill().map((item, index) => {
        return (
          <PaginationItem
            key={index}
            active={store.params.page === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            <PaginationLink
              href="/"
              onClick={(e) => e.preventDefault()}
              className={loading ? "pagination-overlay" : ""}
            >
              {index + 1}
              {loading ? (
                <div id="loading-overlay" style={{ display: "flex" }}>
                  <div className="loader"></div>
                </div>
              ) : null}
            </PaginationLink>
          </PaginationItem>
        );
      });
    } else {
      return [0];
    }
  };

  // ** handle next page click
  const handleNext = () => {
    const totalPages = Math.ceil(store.totalProducts / store.params.perPage);
    if (store.params.page < totalPages) {
      handlePageChange("next");
    }
  };

  return (

    
    <div className="content-detached content-right">
      <div className="content-body">
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          // isLoading={loading} // Keep this line
          // setLoading={setLoading} // Add this line
        />

        <ProductsSearchbar
          dispatch={dispatch}
          getProducts={getProducts}
          store={store}
          // isLoading={loading}
          setLoading={setproductPartLoading} // Add this line
        />
       {Object.keys(store.sortedProducts).length && store.sortedProducts[store.params.sortBy]?.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              activeView={activeView}
              products={store.pages[store.params.page]}
              getProducts={getProducts}
              isLoading={productPartLoading} // Add this line
            />

            <Pagination className="d-flex justify-content-center ecommerce-shop-pagination mt-2">
              <PaginationItem
                disabled={store.params.page === 1}
                className="prev-item"
                onClick={() =>
                  store.params.page !== 1 ? handlePageChange("prev") : null
                }
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={
                  store.params.page ===
                  Math.ceil(store.totalProducts / store.params.perPage)
                }
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
