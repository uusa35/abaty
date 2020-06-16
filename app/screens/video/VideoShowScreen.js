import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../../components/widgets/product/ProductList';
import VideoWidget from '../../components/widgets/video/VideoWidget';

const VideoShowScreen = () => {
  const {video} = useSelector((state) => state);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View>
        <VideoWidget element={video} showImage={false} />
        <ProductList
          products={video.products}
          showName={true}
          showSearch={false}
          searchElements={{}}
        />
      </View>
    </ScrollView>
  );
};

export default VideoShowScreen;

const styles = StyleSheet.create({});
