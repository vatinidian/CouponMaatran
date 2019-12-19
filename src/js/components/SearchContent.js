import React from "react";
import axios from "axios";
import CouponCard from "./CouponCard";

class SearchContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      showCouponDetails: false,
      currentCouponInDetail: {}
    };
    this.getCoupons = this.getCoupons.bind(this);
    this.handleMoreInfoSelected = this.handleMoreInfoSelected.bind(this);
    this.handleDetailClose = this.handleDetailClose.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.fireSearch) {
      this.handleDetailClose();
      this.getCoupons(
        props.searchInput ? props.searchInput.trim() : "",
        props.selectedSubFilter ? props.selectedSubFilter : []
      );
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/coupons/")
      .then(response => {
        this.setState({ coupons: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCoupons(searchText, aAdditionalFilters) {
    let oFilter = {};
    if (!aAdditionalFilters) {
      aAdditionalFilters = this.props.selectedSubFilter || [];
    }

    if (aAdditionalFilters && aAdditionalFilters.length > 0) {
      aAdditionalFilters.forEach(oAdditional => {
        if (!oFilter[oAdditional.propertyInCouponModel]) {
          oFilter[oAdditional.propertyInCouponModel] = [oAdditional.filterName];
        } else {
          oFilter[oAdditional.propertyInCouponModel].push(
            oAdditional.filterName
          );
        }
      });
    }

    axios
      .get("http://localhost:5000/coupons/", {
        params: {
          searchFilter: searchText,
          subFilters: oFilter,
          expired: false
        }
      })
      .then(response => {
        this.setState({ coupons: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  createCouponCards() {
    return this.state.coupons.map(coupon => {
      return (
        <CouponCard
          data={coupon}
          key={coupon._id}
          onSelectMoreInfo={this.handleMoreInfoSelected}
        />
      );
    });
  }

  handleMoreInfoSelected(oCoupon) {
    this.setState({
      showCouponDetails: true,
      currentCouponInDetail: oCoupon
    });

    let oRoot = document.getElementById("root");
    oRoot.className = "hideOverflow";
  }

  handleDetailClose() {
    this.setState({
      showCouponDetails: false
    });
    let oRoot = document.getElementById("root");
    oRoot.className = "";
  }

  handleSort(event) {
    let oSortIcon = document.getElementById(event.target.id);
    let oSortButton;
    if (event.target.id === "sort") {
      oSortButton = oSortIcon.parentElement;
    } else if (event.target.id === "sortButton") {
      oSortButton = oSortIcon;
    } else {
      return;
    }

    let sExistingClassName = oSortButton.className;

    if (
      sExistingClassName === "searchContentButton searchContentButtonSelected"
    ) {
      oSortButton.className = "searchContentButton";
    } else if (sExistingClassName === "searchContentButton") {
      oSortButton.className = "searchContentButton searchContentButtonSelected";
    }
  }
  render() {
    return (
      <div className="searchContentWrap">
        <div
          className={
            this.state.showCouponDetails
              ? "searchListLeftContent detailInShow"
              : "searchListLeftContent"
          }
        >
          <div className="searchContentHeader">
            <h3 className="searchTitle">
              Coupons ({this.state.coupons.length}){" "}
            </h3>

            <div className="searchContentActions">
              <button
                id="sortButton"
                className="searchContentButton"
                onClick={this.handleSort}
              >
                <i className="large material-icons" id="sort">
                  sort
                </i>
                Sort
              </button>
            </div>
          </div>
          <div className="searchContent">{this.createCouponCards()}</div>
        </div>
        <div
          className={
            this.state.showCouponDetails
              ? "searchContentDetails show"
              : "searchContentDetails"
          }
        >
          <div className="detailsHeader">
            <div className="detailTitle">
              Detail of Coupon : {this.state.currentCouponInDetail.title}
            </div>
            <div className="detailHeaderAction">
              <button
                className="actionIconButton"
                onClick={this.handleDetailClose}
              >
                <i className="large material-icons">close</i>
              </button>
            </div>
          </div>
        </div>

        {this.props.fireSearch && this.state.coupons.length === 0 && (
          <div className="searchNoData">
            Sorry! No coupons found in search. Please change your search
            criteria.
          </div>
        )}
      </div>
    );
  }
}


export default SearchContent;
