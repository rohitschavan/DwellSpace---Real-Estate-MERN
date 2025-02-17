import React from "react";
import SideBar from ".././Navigation/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateAd = () => {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  const navigate = useNavigate();
  const handleSell = () => {
    setSell(true);
    setRent(false);
  };
  const handleRent = () => {
    setRent(true);
    setSell(false);
  };
  return (
    <>
      <h1 className="display-p1 text-light bg-primary">CreateAd</h1>
      <SideBar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-14%" }}
      >
        <div className="col-lg-6">
          {" "}
          <button className="btn btn -primary " onClick={handleSell}>
            <span className="h1">Sell</span>
          </button>
          <br />
          {sell && (
            <>
              <button
                onClick={() => navigate("/ad/create/sell/House")}
                className="btn btn-secondary my-4 mx-2"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/Land")}
                className="btn btn-secondary my-4 mx-2"
              >
                Land
              </button>
            </>
          )}
        </div>
        <div className="col-lg-6">
          {" "}
          <button className="btn btn -primary " onClick={handleRent}>
            <span className="h1">Rent</span>
          </button>
          <br />
          {rent && (
            <>
              <button
                onClick={() => navigate("/ad/create/rent/House")}
                className="btn btn-secondary my-4 mx-2"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/Land")}
                className="btn btn-secondary my-4 mx-2"
              >
                Land
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAd;
