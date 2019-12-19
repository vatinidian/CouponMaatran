import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Layout from "./js/components/Layout";
import SearchContentContainer from "./js/containers/SearchContentContainer";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Route path="/" component={SearchContentContainer} />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
