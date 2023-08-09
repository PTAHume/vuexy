// ** React Imports
import { Link } from "react-router-dom";
import moment from "moment";
import { differenceInWeeks } from "date-fns";
import "./ProductCards.css";
import { baseURL } from "@utils";
// ** Third Party Components
import classnames from "classnames";
import { Star, Heart, MessageCircle, Navigation } from "react-feather";
import { GiAirplaneDeparture } from "react-icons/gi";
// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, Row, Col } from "reactstrap";

//lets load spinner only for Product part
import "@styles/react/libs/spinner/productPartSpinner.scss";

//** images */
import baggage from "@src/assets/images/pages/eCommerce/bagagge.png";
import handLuggageImage from "@src/assets/images/pages/eCommerce/hand_luggage.png";
// Add this line at the top of your file
import defaultImage from "@src/assets/images/pages/eCommerce/default-image.png";

const ProductCards = (props) => {
  // ** Props
  const { products = [], activeView, isLoading } = props;

  const deliveryTypeImages = {
    baggage: baggage,

    // document: documentImage,
    hand_luggage: handLuggageImage,
  };


  const deliveryTypes = [
    { value: "baggage", label: "Baggage" },
    { value: "hand_luggage", label: "Hand Luggage" },
    { value: "document", label: "Document" },
  ];
  


  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        const image = deliveryTypeImages[item.delivery_type] || defaultImage;
        const deliveryTypeLabel = deliveryTypes.find(
          (type) => type.value === item.delivery_type
        )?.label;
        
        // console.log(item)
        return (
          <Card className="ecommerce-card" key={item.id}>
            <div className="item-img text-center mx-auto">
              <Link to={`/front/user/${item.user_id}`}>
                <div className="image-container">
                  <img
                    className="img-fluid card-img-top"
                    src={image}
                    // alt={item.user_name}
                  />
                  <div className="image-overlay">
                    {item.weight} {"Kg"}
                  </div>
                </div>

                <div className="text-center">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item">
                          <Star
                            className={classnames({
                              "filled-star": index + 1 <= item.rating,
                              "unfilled-star": index + 1 > item.rating,
                            })}
                            //star size
                            style={{ transform: "scale(0.7)" }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <CardText tag="span" className="item-company">
                  By {item.user_name}
                </CardText>
              </Link>
            </div>

            <CardBody>
              <div className="details-wrapper">
                <div className="flight-details-wrapper">
                  <Row className="mt-1 flight-info-row justify-content-between">
                    <Col sm="4">
                      <div className="departure-info">
                        <h6 className="flight-title">Departure</h6>
                        <div className="flight-details">
                          <div className="flight-country">
                            {item.departure_country}
                          </div>
                          <div className="flight-city">
                            {item.departure_city}
                          </div>
                          <div className="flight-airport">
                            {item.departure_airport}
                          </div>
                          <div className="flight-date">
                            {moment(item.departure_date).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" className="arrival-info">
                      <div className="flight-info">
                        <h6 className="flight-title">Arrival</h6>
                        <div className="flight-details">
                          <div className="flight-country">
                            {item.arrival_country}
                          </div>
                          <div className="flight-city">{item.arrival_city}</div>
                          <div className="flight-airport">
                            {item.arrival_airport}
                          </div>
                          <div className="flight-date">
                            {moment(item.arrival_date).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="flight-line">
                    <div className="circle departure-circle"></div>
                    <GiAirplaneDeparture className="airplane-icon" size={25} />
                    <div className="circle arrival-circle"></div>
                  </div>
                  <Row className="mt-1">
                    <Col className="text-center">
                      <div className="flight-info">
                        <div className="flight-info">
                          <h6 className="flight-title">Delivery Type</h6>
                          <div className="flight-details">
                            {" "}
                            <Badge color="light-success">
                              {deliveryTypeLabel}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.price}</h4>
                  {item.user_authenticated === 1 && (
                    <CardText className="shipping">
                      <Badge color="light-success">Authenticated User</Badge>
                    </CardText>
                  )}
                  {item.duty_free === 1 && (
                    <CardText className="shipping">
                      <Badge color="warning">Duty Free Delivery</Badge>
                    </CardText>
                  )}
                </div>
              </div>

              <Button
                className="btn-wishlist"
                color="light"
                //  onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <Heart
                  className={classnames("me-50", {
                    "text-danger": item.isInWishlist,
                  })}
                  size={14}
                />
                <span>Wishlist</span>
              </Button>
              <Button
                color="primary"
                className="btn-cart move-cart"
                onClick={() => handleContactBtn(item.user_id)} // we will start chat with this id user/ we need to get it in data file.
              >
                <MessageCircle className="me-50" size={14} />
                <span>{"Contact"}</span>
              </Button>
            </div>
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        "grid-view": activeView === "grid",
        "list-view": activeView === "list",
        "products-loader-container": true, // Add this line
      })}
    >
      {isLoading ? (
        <div className="products-loader">
          <div className="loader"></div>
        </div>
      ) : null}
      {renderProducts()}
    </div>
  );
};

export default ProductCards;
