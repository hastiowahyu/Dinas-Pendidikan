import React, { useState, useEffect } from "react";
import "./Main.css";
import GaleryCarousel from "./GaleryCarousel/GaleryCarousel";
import News from "./News/News";
import FotoDokumenBeranda from "./FotoDokumenBeranda/FotoDokumenBeranda";
import ProfilKepala from "./ProfilKepala/ProfilKepala";
import ArtikelBeranda from "./ArtikelBeranda/ArtikelBeranda";
import { useDispatch, useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";

const Main = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [LoaderComplete, setLoaderComplete] = useState(true);

  useEffect(() => {
    if (count == 6) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);

  return (
    <div className='style-main'>
      <Loading loading={LoaderComplete} background='	#FFFFFF' loaderColor='#3498db' />
      <GaleryCarousel />
      <div className='style-main'>
        <News />
        <ProfilKepala />
        <FotoDokumenBeranda />
        <ArtikelBeranda />
      </div>
    </div>
  );
};

export default Main;
