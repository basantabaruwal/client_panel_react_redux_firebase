import React, { Component } from "react";
// Components
import Sidebar from "./Sidebar";
import Clients from "../clients/Clients";

export default () => {
  return (
    <div className="container">
      <div style={{ marginTop: "0rem" }}>
        <div className="row">
          <div className="col-md-10">
            <Clients />
          </div>
          <div className="col-md-2 text-center">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
