import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { gotoNextImage, gotoPreviousImage, closeSlider } from '../../store/ui';

import './ImageSlider.scss';

function ImageSlider() {
  const dispatch = useDispatch();

  const slider = useSelector((state) => state.ui.slider);

  const closeModal = (e) => {
    if (!e.target.classList.contains('slider')) return;

    dispatch(closeSlider());
  };

  return (
    <div
      className={slider.isOpen ? 'slider open' : 'slider'}
      onClick={closeModal}
      role="presentation"
    >
      <div className="slider__body">
        {slider.list.length > 1 && (
          <>
            <button
              type="button"
              className="slider__button slider__button--prev"
              onClick={() => dispatch(gotoPreviousImage())}
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className="slider__button slider__button--next"
              onClick={() => dispatch(gotoNextImage())}
            >
              <FiChevronRight />
            </button>
          </>
        )}
        <div className="slider__images">
          {slider.list.map((img, idx) => {
            let position;
            if (idx === slider.currentIndex) {
              position = 'slider__img-wrapper slider__img-wrapper--current';
            } else if (
              idx === slider.currentIndex - 1 ||
              (slider.currentIndex === 0 && idx === slider.list.length - 1)
            ) {
              position = 'slider__img-wrapper slider__img-wrapper--prev';
            } else {
              position = 'slider__img-wrapper slider__img-wrapper--next';
            }
            return (
              <figure className={position} key={uuidv4()}>
                <img
                  src={img.path}
                  alt="post content media"
                  className="slider__img"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
