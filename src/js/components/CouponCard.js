import React from "react";
//<button><i className="fa fa-heart"></i></button>
class CouponCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expired: false,
      coponTypeImageUrl: ""
    };

    this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this);
    
  }

  checkExpired() {
    let oToday = new Date();
    if (new Date(this.props.data.validityEnd) < oToday) {
      this.setState({
        expired: true
      });
    }
  }

  handleMoreInfoClick() {
    this.props.onSelectMoreInfo(this.props.data);
  }

  loadCouponTypeImage() {
    let sCouponType = this.props.data.couponType.toLowerCase();

    switch (sCouponType) {
      // E-Voucher Case
      case "e-voucher":
      case "evoucher":  
        this.setState({ coponTypeImageUrl: "/evoucher.png" });
        break;

      // Coupon Codes or Offer Codes    
      case "couponcode":
      case "code":
      case "offercode":
        this.setState({ coponTypeImageUrl: "/couponcode.png" });
        break;

      // Discount  
      case "discount":
        this.setState({ coponTypeImageUrl: "/discount.png" });
        break;

      default:
        this.setState({ coponTypeImageUrl: "/default_coupon.svg" });
        break;
    }
  }

  componentDidMount() {
    this.loadCouponTypeImage();
    this.checkExpired();
  }

  render() {
    return (
      <div className={this.state.expired ? "couponCard expiredCoupon" : "couponCard"}>
        <div>
          <div className="cardHeader">
            <div className="cardImageHolder">
              <img
                className="cardTypeImage"
                src={process.env.PUBLIC_URL + this.state.coponTypeImageUrl}
                alt="Type"
              ></img>
            </div>

            <div className="cardHeaderText">
              <div className="cardTitle">{this.props.data.title}</div>
              <div className="cardSubTitle">
                {this.props.data.category +
                  " (" +
                  this.props.data.couponType +
                  ")"}
              </div>
            </div>

            <div className="cardInfo">
              {this.state.expired && (
                <button className="iconButton errorIcon">
                  <i className="large material-icons">error_outline</i>
                </button>
              )}
            </div>
          </div>

          <div className="cardBody">
            <div className="cardLeftContent">
              {this.props.data.exchangeOnly ? (
                <h4 className="cardPrice onlyExchange">Only Exchange</h4>
              ) : (
                <div>
                  <h4 className="cardPrice">
                    Price-
                    <span className="subText">(INR)</span>
                  </h4>
                  <h2 className="cardPrice priceText">
                    {this.props.data.price}
                  </h2>
                </div>
              )}

              <span className="subText">
                {this.props.data.negotiable ? "(Negotiable)" : ""}
              </span>
            </div>

            {/* Right Body Content */}
            <div className="cardRightContent">
              <div className="cardContentAttributes">
                <b>Validity</b>:{" "}
                {this.state.expired && (
                  <span className="expiredText">(Expired)</span>
                )}{" "}
                <br />
                {new Date(this.props.data.validityStart).toLocaleDateString() +
                  "-" +
                  new Date(this.props.data.validityEnd).toLocaleDateString()}
              </div>

              <div className="cardContentAttributes">
                <b>Product Info</b>: <br />
                <a href="test" target="_parent">
                  {this.props.data.sourceProductID}{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="cardFooter">
            {!this.state.expired && (
              <button className="endButton iconButton">
                <i className="large material-icons">add_shopping_cart</i>
              </button>
            )}
            <button className="endButton" onClick={this.handleMoreInfoClick}> More Info </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CouponCard;
