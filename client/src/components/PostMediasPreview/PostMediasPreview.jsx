import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { openSlider } from '../../store/ui';

function PostMediasPreview({ medias = [], readOnly }) {
  const dispatch = useDispatch();

  if (medias.length === 0) return null;

  if (medias.length >= 3) {
    return (
      <div className="post__media post__media--3">
        {[...medias].slice(0, 3).map((img, idx) => (
          <div
            className="post__image-wrapper"
            style={readOnly ? { pointerEvents: 'none' } : {}}
            key={uuidv4()}
            onClick={() => {
              if (readOnly) return;
              dispatch(openSlider(medias, idx));
            }}
            role="presentation"
          >
            <img
              className="post__image"
              style={readOnly ? { pointerEvents: 'none' } : {}}
              src={img.thumbnail}
              alt="test"
            />
          </div>
        ))}
      </div>
    );
  }

  if (medias.length === 2) {
    return (
      <div className="post__media post__media--2">
        {[...medias].map((img, idx) => (
          <div
            className="post__image-wrapper"
            key={uuidv4()}
            style={readOnly ? { pointerEvents: 'none' } : {}}
            onClick={() => {
              if (readOnly) return;
              dispatch(openSlider(medias, idx));
            }}
            role="presentation"
          >
            <img
              className="post__image"
              style={readOnly ? { pointerEvents: 'none' } : {}}
              src={img.thumbnail}
              alt="post media"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="post__media post__media--1">
      <div
        className="post__image-wrapper"
        style={readOnly ? { pointerEvents: 'none' } : {}}
        onClick={() => {
          if (readOnly) return;
          dispatch(openSlider(medias, 0));
        }}
        role="presentation"
      >
        <img
          className="post__image"
          style={readOnly ? { pointerEvents: 'none' } : {}}
          src={medias[0].thumbnail}
          alt="post media"
        />
      </div>
    </div>
  );
}

export default PostMediasPreview;
