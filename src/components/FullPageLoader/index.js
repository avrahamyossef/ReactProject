import React, { Fragment } from "react";
import loaderGif from "./loader.gif";
import * as classes from "./fullPageLoader.module.scss";

const FullPageLoader = () => {
  return (
    <Fragment>
      <div data-hook="loader" className={classes.full_screen_wrap}>
        <img
          data-hook="loader-spinner"
          src={loaderGif}
          className={classes.img}
          alt="Loading..."
        />
      </div>
    </Fragment>
  );
};

export default FullPageLoader;
