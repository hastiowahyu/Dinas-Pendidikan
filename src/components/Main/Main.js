import React, { Fragment } from "react";
import "./Main.css";
import Galery from "./Galery/Galery";
import News from "./News/News";
import SecondLine from "./SecondLine/SecondLine";
import ThridLine from "./ThirdLine/ThridLine";
import FourLine from "./FourLine/FourLine";

const Main = () => {
  return (
    <div className="style-main">
      <Galery />
      <div className='style-main'>
        <News />
        <SecondLine />
        <ThridLine />
        <FourLine />
      </div>
    </div>
  );
};
export default Main;
