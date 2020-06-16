import React from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import VideoList from '../../components/Lists/VideoList';
import {videosSelector} from '../../redux/selectors/collections';
import BgContainer from '../../components/containers/BgContainer';

const VideoIndexScreen = () => {
  const {videos} = useSelector((state) => state);
  return (
    <BgContainer>
      <VideoList elements={videos} />
    </BgContainer>
  );
};

export default VideoIndexScreen;

const styles = StyleSheet.create({});
