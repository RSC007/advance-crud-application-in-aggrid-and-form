// from librabries
import React from "react";
import NavBar from "../NavBar";
import UserAgGridTable from "../Table/UserAgGridTable";

const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <section>
        <UserAgGridTable />
      </section>
    </div>
  );
};

export default Home;
