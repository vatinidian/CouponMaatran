import React from "react";
import HeaderContainer from "../containers/HeaderContainer";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;