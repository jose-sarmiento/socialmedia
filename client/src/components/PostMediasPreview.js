import React from "react";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player/lazy";
import { useDispatch } from "react-redux";
import { openSlider } from "../store/ui";

const PostMediasPreview = ({ medias = [], fullHeight }) => {
    const dispatch = useDispatch();

    if (medias.length === 0) return null;

    if (medias.length >= 3) {
        return (
            <div className="post__media post__media--3">
                {[...medias].slice(0, 3).map((img, idx) => (
                    <div
                        className="post__image-wrapper"
                        key={uuidv4()}
                        onClick={() => {
                            dispatch(openSlider(medias, idx));
                        }}
                    >
                        <img
                            className="post__image"
                            src={
                                img.thumbnail.substring(0, 4) == "http"
                                    ? img.thumbnail
                                    : `${
                                          process.env.REACT_APP_SERVER +
                                          img.thumbnail
                                      }`
                            }
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
                        onClick={() => {
                            dispatch(openSlider(medias, idx));
                        }}
                    >
                        <img
                            className="post__image"
                            src={
                                img.thumbnail.substring(0, 4) == "http"
                                    ? img.thumbnail
                                    : `${
                                          process.env.REACT_APP_SERVER +
                                          img.thumbnail
                                      }`
                            }
                            alt="test"
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
                onClick={() => {
                    dispatch(openSlider(medias, 0));
                }}
            >
                <img
                    className="post__image"
                    src={
                        medias[0].thumbnail.substring(0, 4) == "http"
                            ? medias[0].thumbnail
                            : `${
                                  process.env.REACT_APP_SERVER +
                                  medias[0].thumbnail
                              }`
                    }
                    alt="test"
                />
            </div>
        </div>
    );
};

export default PostMediasPreview;
