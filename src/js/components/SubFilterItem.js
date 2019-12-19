import React from "react";
import axios from "axios";

class SubFilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleCarouselItemSelect = this.handleCarouselItemSelect.bind(this);
  }

  componentDidMount() {
    this.getFilterItemsForCarousel();
  }

  getFilterItemsForCarousel() {
    axios
      .get("http://localhost:5000/subFilters/")
      .then(response => {
        this.props.setSubFilterItems(response.data);
        if (response.data.length > 0) {
          this._showNavButtons();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _showNavButtons(sMovedWidth = "0px", sAction) {
    let oCarouselItem = document.getElementById("searchCarouselItem");
    let sItemWidth = oCarouselItem.offsetWidth;
    let oRightNav = document.getElementsByClassName("rightNavigation")[0];
    let oLeftNav = document.getElementsByClassName("leftNavigation")[0];
    let oCarouselContent = document.getElementById("searchCarouselContent");
    let sContentWidth = oCarouselContent.offsetWidth;

    if (sAction === "rightNavigation") {
      oLeftNav.className = "navigation leftNavigation show";
      oCarouselContent.className = "carouselContent moveRight";
    } else {
      oLeftNav.className = "navigation leftNavigation";
      oCarouselContent.className = "carouselContent";
    }

    let sNewMovedWidth = Math.abs(sMovedWidth.replace("px", ""));
    let sRemainingWidth = sItemWidth - sNewMovedWidth;
    if (sNewMovedWidth > sItemWidth) {
      // Something gone wrong , if this case is successful
      // so reset the carousel
      sNewMovedWidth = 0;
      sRemainingWidth = sItemWidth;
      oCarouselItem.style.left = "0px";
      oCarouselContent.className = "carouselContent";
    }
    if (sNewMovedWidth > 0) {
      oLeftNav.className = "navigation leftNavigation show";
    } else {
      oLeftNav.className = "navigation leftNavigation";
    }

    if (sRemainingWidth > sContentWidth) {
      oRightNav.className = "navigation rightNavigation show";
    } else {
      oRightNav.className = "navigation rightNavigation";
    }
  }

  handleCarouselItemSelect(oItem, event) {
    // Do Styling
    let oCarouselItem = document.getElementById(event.target.id);
    let sExistingClassName = oCarouselItem.className;
    if (sExistingClassName === "carouselButton carouselButtonSelected") {
      oCarouselItem.className = "carouselButton";
      this.props.removeFromSelectedSubFilter(oItem);
    } else {
      oCarouselItem.className = "carouselButton carouselButtonSelected";
      this.props.addToSelectedSubFilter(oItem);
    }

    this.props.setFireSearch(true);
  }

  handleNavigation(oEvent) {
    let oCarouselItem = document.getElementById("searchCarouselItem");
    let oCarouselContent = document.getElementById("searchCarouselContent");
    let sWidth = oCarouselContent.offsetWidth;
    let sMoveWidth;
    if (oEvent.target.id === "leftNav") {
      sMoveWidth =
        (+oCarouselItem.style.left.replace("px", "") || 0) + sWidth + "px";
      oCarouselItem.style.left = sMoveWidth;

      window.setTimeout(() => {
        this._showNavButtons(sMoveWidth, "leftNavigation");
      }, 0);
    } else {
      sMoveWidth =
        (+oCarouselItem.style.left.replace("px", "") || 0) - sWidth + "px";
      oCarouselItem.style.left = sMoveWidth;

      window.setTimeout(() => {
        this._showNavButtons(sMoveWidth, "rightNavigation");
      }, 0);
    }
  }

  createCarouselItems() {
    const aCarouselItems =
      this.props.subFilterItems &&
      this.props.subFilterItems.map(oItem => (
        <button
          id={oItem.filterName}
          key={oItem.filterName}
          title={oItem.description}
          className="carouselButton"
          onClick={this.handleCarouselItemSelect.bind(this, oItem)}
        >
          {oItem.filterName}
        </button>
      ));
    return aCarouselItems;
  }
  render() {
    return (
      <>
        <div className="searchCarousel">
          <div className="navigation leftNavigation">
            <button className="iconButton" onClick={this.handleNavigation}>
              <i id="leftNav" className="large material-icons">
                chevron_left
              </i>
            </button>
          </div>

          <div id="searchCarouselContent" className="carouselContent">
            <div id="searchCarouselItem" className="carouselItems">
              {}
              {this.createCarouselItems()}
            </div>
          </div>

          <div className="navigation rightNavigation">
            <button className="iconButton" onClick={this.handleNavigation}>
              <i id="rightNav" className="large material-icons">
                chevron_right
              </i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default SubFilterItem;
