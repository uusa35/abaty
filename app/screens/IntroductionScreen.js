import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from '../components/widgets/splash/SplashWidget';

const IntroductionScreen = ({navigation}) => {
  const {splashes} = useSelector(state => state);
  const {navigate} = navigation;

  return (
    <View style={{backgroundColor: 'white'}}>
      <AppIntroSlider
        keyExtractor={(splashes, index) => index.toString()}
        renderItem={({item}) => (
          <SplashWidget elements={splashes} element={item} />
        )}
        slides={splashes}
        onDone={() => navigate('Home')}
      />
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({});
