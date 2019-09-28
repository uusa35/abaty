import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
import VideoWidget from '../components/widgets/video/VideoWidget';

const VideoShowScreen = ({video, dispatch}) => {
  console.log('video', video);
  return (
    <Fragment>
      <VideoWidget element={video} showImage={false} dispatch={dispatch} />
      <ProductList
        products={video.products}
        showName={true}
        showSearch={false}
        dispatch={dispatch}
        searchElements={{}}
      />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    video: state.video
  };
}

export default connect(mapStateToProps)(VideoShowScreen);

VideoShowScreen.propTypes = {
  video: PropTypes.object.isRequired
};
const styles = StyleSheet.create({});
