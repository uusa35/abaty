import React, {Fragment, useRef} from 'react';
const ViewRenders = () => {
  const renders = useRef(0);
  if (__DEV__) {
    // console.log('Renders', renders.current++);
  }
  return <Fragment></Fragment>;
};

export default ViewRenders;
