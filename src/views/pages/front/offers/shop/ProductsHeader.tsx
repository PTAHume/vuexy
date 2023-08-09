// ** Third Party Components
import classnames from "classnames";
import { Menu, Grid, List } from "react-feather";
import React, { useState } from "react";
import {  setPages, updateParams,   clearPages, clearSortedProducts, } from "../store"; 
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const ProductsHeader = (props) => {
  const [loading, setLoading] = useState(false); //this is general spinner occupies whole page
  // ** Props
  const { activeView, setActiveView, dispatch, getProducts, store } = props;
  // ProductsHeader.js
const handleSorting = async (sortBy) => {
    setLoading(true);
    dispatch(clearPages());
    dispatch(clearSortedProducts());
  // Check if the data for the selected sorting option is available in the store
  // if (store.sortedProducts[sortBy]) {
  //   // Use the stored data
  //   props.setLoading(true);
  //   const newParams = { ...store.params, sortBy };
  //   await dispatch(setPages({ page: store.params.page, data: store.sortedProducts[sortBy] }));
  //   await dispatch(updateParams(newParams));
  //   props.setLoading(false);
  // } else {
    // Fetch data and save it in the store
    //props.setLoading(true);
    const newParams = { ...store.params, sortBy };
    await dispatch(getProducts(newParams));
    setLoading(false);
  //}
};

  
  
  // ** Sorting obj
  const sortToggleText = {
    "price-desc": "Highest",
    "price-asc": "Lowest",
    featured: "Featured",
  };

  return (
    <div className="ecommerce-header">
      <Row>
      {loading ? (
                <div id="loading-overlay" style={{ display: "flex" }}>
                  <div className="loader"></div>
                </div>
              ) : null}
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button className="navbar-toggler shop-sidebar-toggler">
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
              <span className="search-results">
                {store.totalProducts} Results Found
              </span>
            </div>
            <div className="view-options d-flex">
              <UncontrolledButtonDropdown className="dropdown-sort">
              <DropdownToggle
                className="text-capitalize me-1"
                color="primary"
                outline
                caret
              >
                {sortToggleText[store.params.sortBy]}{" "}
              </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() => handleSorting("featured")}
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() => handleSorting("price-asc")}
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() => handleSorting("price-desc")}
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <ButtonGroup>
                {/* 
                WE WILL NEED THIS PART FOR OTHER CATEGORY OFFERS!!!
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button> */}

                <Button
                  tag="label"
                  className={classnames("btn-icon view-btn list-view-btn", {
                    active: activeView === "list",
                  })}
                  color="primary"
                  outline
                  onClick={() => setActiveView("list")}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
