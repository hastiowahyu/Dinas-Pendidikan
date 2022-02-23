import React, { Fragment } from 'react'
import './Lastestnews.css'

const Lastestnews = () => {
  return (
    <Fragment>
      <div class='slide active'>
        <div class='card'>
          <div class='card__img' id='img01'>
            {" "}
          </div>
          <div class='card__content'>
            <p class='card__content-theme'>Travel</p>
            <h2 class='card__content-header'>Misty mountain</h2>
            <p class='card__content-paragraph'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              porro, tempora consequuntur vel dolore assumenda aspernatur cum
              dignissimos unde reprehenderit sint? Neque, id consequuntur.
              Quibusdam sit officiis debitis corrupti. Quasi.
            </p>
            <a class='card__content-link'>Read </a>
          </div>
        </div>
      </div>
      <div class='slide'>
        <div class='card'>
          <div class='card__img' id='img02'></div>
          <div class='card__content'>
            <p class='card__content-theme'>Urban</p>
            <h2 class='card__content-header'>Urban umbrellas</h2>
            <p class='card__content-paragraph'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              porro, tempora consequuntur vel dolore assumenda aspernatur cum
              dignissimos unde reprehenderit sint? Neque, id consequuntur.
              Quibusdam sit officiis debitis corrupti. Quasi.
            </p>
            <a class='card__content-link'>Read </a>
          </div>
        </div>
      </div>
      <div class='slide'>
        <div class='card'>
          <div class='card__img' id='img03'></div>
          <div class='card__content'>
            <p class='card__content-theme'>Lifestyle</p>
            <h2 class='card__content-header'>A lonely road</h2>
            <p class='card__content-paragraph'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              porro, tempora consequuntur vel dolore assumenda aspernatur cum
              dignissimos unde reprehenderit sint? Neque, id consequuntur.
              Quibusdam sit officiis debitis corrupti. Quasi.
            </p>
            <a class='card__content-link'>Read </a>
          </div>
        </div>
      </div>
      <div class='prevnext'>
        <button class='prevnext-button' id='prev'></button>
        <button class='prevnext-button' id='next'>
          {" "}
        </button>
      </div>
    </Fragment>
  );
}

export default Lastestnews