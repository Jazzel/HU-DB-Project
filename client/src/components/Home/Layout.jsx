import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <section className="container p-5">{children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
