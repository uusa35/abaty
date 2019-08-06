import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, isIOS} from '../constants';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';
import {
  countrySelector,
  logoSelector,
  playerIdSelector,
  tokenSelector
} from '../redux/selectors/collection';

const RegisterScreen = ({logo, playerId}) => {
  const [userCountryId, setUserCountryId] = useState('');
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: !isIOS ? '120%' : null,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 100}}
      style={{flex: 1}}>
      <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
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
    </ScrollView>
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
