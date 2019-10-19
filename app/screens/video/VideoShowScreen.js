import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../../components/widgets/product/ProductList';
import VideoWidget from '../../components/widgets/video/VideoWidget';

const VideoShowScreen = ({video, dispatch}) => {
  return (
    <ScrollView>
      <VideoWidget element={video} showImage={false} dispatch={dispatch} />
      <ProductList
        products={video.products}
        showName={true}
        showSearch={false}
        dispatch={dispatch}
        searchElements={{}}
      />
    </ScrollView>
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
