import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, isIOS, width} from '../constants';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';
import {
  countrySelector,
  logoSelector,
  playerIdSelector,
  tokenSelector
} from '../redux/selectors/collection';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({logo, playerId}) => {
  const [userCountryId, setUserCountryId] = useState('');
  return (
    <KeyboardAwareScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <View
        style={{
          flex: 1,
          marginTop: 0,
          alignItems: 'center',
          width: width - 20
        }}>
        <FastImage
          source={{uri: logo}}
          style={{width: 100, height: 100, margin: 20}}
          resizeMode="contain"
          loadingIndicatorSource={images.logo}
        />
        <RegisterFormWidget
          userCountryId={userCountryId}
          player_id={playerId}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    logo: logoSelector(state),
    country: countrySelector(state),
    playerId: playerIdSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(RegisterScreen));

RegisterScreen.propTypes = {
  logo: PropTypes.string,
  token: PropTypes.string,
  country: PropTypes.object,
  playerId: PropTypes.string
};

const styles = StyleSheet.create({});
