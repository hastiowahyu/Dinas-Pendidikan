import React, {useState, useEffect } from "react";
import "./Main.css";
import Galery from "./Galery/Galery";
import News from "./News/News";
import SecondLine from "./SecondLine/SecondLine";
import ThridLine from "./ThirdLine/ThridLine";
import FourLine from "./FourLine/FourLine";
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'react-fullscreen-loading';

const Main = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [LoaderComplete, setLoaderComplete] = useState(true);
  console.log('count di Main js', count)

  useEffect(() => {
    console.log('LoaderComplete', LoaderComplete)
    if (count == 6) {
      setLoaderComplete(false)
    }
  }, [count, LoaderComplete]);

  return (
    <div className='style-main'>
      <Loading
        loading={false}
        background='	#FFFFFF'
        loaderColor='#3498db'
      />
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