import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import VideoList from "../components/Lists/VideoList";
import validate from "validate.js";

class VideoIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
    return nextProps.videos !== this.props.videos;
  }

  render() {
    const {videos, navigation} = this.props;
    console.log('videos', videos);
    return (
      <NavContext.Provider value={{navigation}}>
             <VideoList elements={videos}/>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    videos: state.videos
  };
}

export default connect(mapStateToProps)(VideoIndexScreen);

VideoIndexScreen.propTypes = {
  videos: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
