import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import VideoWidget from '../../components/widgets/video/VideoWidget';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';

const VideoShowScreen = () => {
  const {video} = useSelector((state) => state);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View>
        <VideoWidget element={video} showImage={false} />
        <ElementsVerticalList
          products={video.products}
          type="product"
          showName={true}
          showSearch={false}
          showSortSearch={false}
          showMore={false}
          showFooter={false}
          searchElements={{}}
        />
      </View>
    </ScrollView>
  );
};

export default VideoShowScreen;

const styles = StyleSheet.create({});
