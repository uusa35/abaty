import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from '../components/widgets/splash/SplashWidget';

class IntroductionScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {splashes, navigation} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <AppIntroSlider
          keyExtractor={(splashes, index) => index.toString()}
          renderItem={() => <SplashWidget elements={splashes} />}
          slides={splashes}
          onDone={() => navigation.navigate('Home')}
        />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    splashes: state.splashes
  };
}

export default connect(mapStateToProps)(IntroductionScreen);

IntroductionScreen.propTypes = {
  splashes: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
