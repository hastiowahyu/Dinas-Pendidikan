import React from 'react';
import { Carousel } from "react-bootstrap";
import './Galery.css'

const Galery = () => {
  return (
    <div>
      <Carousel className='style-galery'>
        <Carousel.Item>
          <img
            className='d-block w-100 size-img'
            src='https://th.bing.com/th/id/R.199a3b217f47c915ddbb59dabdc8149c?rik=oNrgRbhOOK3Smw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-bUTz-VYcgYs%2fUQZ4VFhxyVI%2fAAAAAAAAAO4%2fVYFd7bKcZlQ%2fs1600%2fGambar%2bgambar%2bpemandangan%2bindah%2b5.jpg&ehk=f0hH2wCR%2bOtFjO2Fnw8BZ0kJGsxlXZix3tcilBzZNKs%3d&risl=&pid=ImgRaw&r=0'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 size-img'
            src='https://th.bing.com/th/id/R.b4da819e6b949aa1c5bfce722a82e76b?rik=ydU7l5ROlIK5qw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-8EPfB5aFcNk%2fUQdJTd9CbII%2fAAAAAAAADOM%2fsxYi-qtV3ns%2fs1600%2fGambar%2bPemandangan%2bIndah%2bDi%2bDunia%2b15.jpg&ehk=%2fNVOpskhCryiipC1M8cB8AVpCb8wdJs4HedPS0vTE0I%3d&risl=&pid=ImgRaw&r=0'
            alt='Second slide'
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Galery;
