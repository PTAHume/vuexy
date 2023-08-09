// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./Products";
import { getProducts } from "../store";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import "@styles/react/libs/spinner/spinner.scss";
import { showLoader, hideLoader } from "../store"; // Import the actions
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState("list");
  const [appliedSidebarFilters, setAppliedSidebarFilters] = useState({}); // Add this line
  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: "",
        sortBy: "featured",
        perPage: 9,
        page: 1,
      })
    ).then(() => {
      dispatch(hideLoader());
    });
  }, [dispatch]);

  const handleApplyFilters = (data) => {
    setAppliedSidebarFilters(data); // Add this line
    dispatch(
      getProducts({
        ...store.params,
        ...data,
        page: 1,
        perPage: 9,
        sortBy: "featured",
      })
    );
  };

  return (
    <Fragment>
      {store.isLoading ? (
        <div id="loading-overlay" style={{ display: "flex" }}>
          <div className="loader"></div>
        </div>
        
      ) : (
        <>
          <Breadcrumbs
            title="Shop"
            data={[{ title: "Offers" }, { title: "Active offers" }]}
          />
          <Products
            store={store}
            dispatch={dispatch}
            activeView={activeView}
            getProducts={getProducts}
            setActiveView={setActiveView}
            appliedFilters={appliedSidebarFilters} // Update this line
          />
          <Sidebar handleApplyFilters={handleApplyFilters} store={store} />
        </>
      )}
    </Fragment>
  );
};
export default Shop;
