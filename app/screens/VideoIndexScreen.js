import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import VideoList from '../components/Lists/VideoList';
import {videosSelector} from '../redux/selectors/collections';

const VideoIndexScreen = ({videos}) => {
  return <VideoList elements={videos} />;
};

function mapStateToProps(state) {
  return {
    videos: videosSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(VideoIndexScreen));

VideoIndexScreen.propTypes = {
  videos: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
