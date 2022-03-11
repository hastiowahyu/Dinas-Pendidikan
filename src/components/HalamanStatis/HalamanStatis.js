import React from "react";
import "./HalamanStatis.css";
import './../Main/News/News.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // CLUE
import Loading from "react-fullscreen-loading"; // CLUE
import { increment } from "./../../Counter"; // CLUE

const HalamanStatis = () => {
  const { id } = useParams();
  const [DataStatis, setDataStatis] = useState([]);
  const axios = require("axios");
  const [DataPopuler, setDataPopuler] = useState();

  //====== menghitung API yang sedang diproses, untuk menentukan loading full screen======//
  // CLUE
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch(); // 3
  useEffect(() => {
    console.log("LoaderComplete", LoaderComplete);
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);
  // CLUE

  //====== get API for static page======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/static-page/" + id)
      .then(function (Umum) {
        setDataStatis(Umum.data.data);
        console.log("statis: " + Umum.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //====== get API for Data kepala dinas======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=7&sort_by=total_hit&sort_type=desc&per_page=5")
      .then(function (Populer) {
        dispatch(increment()); // 4
        setDataPopuler(Populer.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }

  return (
    <>
      {/* ====== menampilkan Loading full screen dipage static page====== */}
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />
      <header className='header-statis'>
        <h2 className='h-dua'>{DataStatis.title}</h2>
      </header>
      <main className='main-statis'>
        {/* ====== menampilkan berita populer distatic page====== */}
        <article className='article-statis'>
          <h1 className='h-satu'> Berita Terpopuler</h1>
          <div className='list-news-container'>
            <div className='main-content'>
              <ul className='list-news'>
                {DataPopuler &&
                  DataPopuler.map((item, index) => {
                    return (
                      <li className='list-news__item ' key={index}>
                        <a href={`/news/DetailNews/${item.id}`}>
                          <h3 className='news__title'>{handleLength(item.title, 57)}</h3>
                        </a>

                        <p>
                          <span>
                            {" "}
                            <MdDateRange size={20} />
                            {(moment.locale("id-ID"), moment(item.created_at).format("L"))}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <HiClipboardList size={20} /> {item.news_category_id}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                          </span>
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </article>
        {/* ====== menampilkan konten static page====== */}
        <section className='section-statis'>
          <p
            className='p-statis'
            dangerouslySetInnerHTML={{
              __html: DataStatis.content,
            }}
          />
        </section>
      </main>
    </>
  );
};

export default HalamanStatis;
