import React, { Fragment } from "react";
import "./Main.css";
import Galery from "./Galery/Galery";
import News from "./News/News";
import SecondLine from "./SecondLine/SecondLine";

const Main = () => {
  return (
    <div>
      <Galery />
      <div className='style-main'>
        <News />
        <SecondLine />
      </div>
    </div>
  );
};
export default Main;
