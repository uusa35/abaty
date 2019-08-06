import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, isIOS} from '../constants';
import UserEditFormWidget from '../components/widgets/user/UserEditFormWidget';
import {
  authSelector,
  countrySelector,
  logoSelector,
  playerIdSelector,
  tokenSelector
} from '../redux/selectors/collection';

const UserEditScreen = ({logo, auth, playerId, token}) => {
  console.log('the token', token);
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
        <UserEditFormWidget
          auth={auth}
          api_token={token}
          userCountryId={userCountryId}
          player_id={playerId}
        />
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    auth: authSelector(state),
    token: tokenSelector(state),
    logo: logoSelector(state),
    country: countrySelector(state),
    playerId: playerIdSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(UserEditScreen));

UserEditScreen.propTypes = {
  logo: PropTypes.string,
  token: PropTypes.string,
  country: PropTypes.object,
  playerId: PropTypes.string,
  auth: PropTypes.object
};

const styles = StyleSheet.create({});
