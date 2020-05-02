import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from '../components/widgets/splash/SplashWidget';
import {useNavigation} from 'react-navigation-hooks';
import I18n from '../../I18n';

const IntroductionScreen = ({splashes}) => {
  const {navigate} = useNavigation();

  return (
    <AppIntroSlider
      keyExtractor={(splashes, index) => index.toString()}
      renderItem={() => <SplashWidget elements={splashes} />}
      slides={splashes}
      onDone={() => navigate('Home')}
    />
  );
};

function mapStateToProps(state) {
  return {
    splashes: state.splashes,
  };
}

export default connect(mapStateToProps)(React.memo(IntroductionScreen));

IntroductionScreen.propTypes = {
  splashes: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
