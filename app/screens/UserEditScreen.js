import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, text} from '../constants';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';
import UserEditFormWidget from '../components/widgets/user/UserEditFormWidget';

class UserEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {userCountryId: ''};
  }

  render() {
    const {navigation, logo, auth, playerId} = this.props;
    const {userCountryId} = this.state;
    return (
      <NavContext.Provider value={{navigation}}>
        <View
          style={{justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
          <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
            <FastImage
              source={{uri: logo}}
              style={{width: 100, height: 100, margin: 20}}
              resizeMode="contain"
              loadingIndicatorSource={images.logo}
            />
            <UserEditFormWidget
              auth={auth}
              api_token={auth.api_token}
              userCountryId={userCountryId}
              player_id={playerId}
            />
          </View>
        </View>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    token: state.token,
    logo: state.settings.logo,
    country: state.country,
    playerId: state.playerId
  };
}

export default connect(mapStateToProps)(UserEditScreen);

UserEditScreen.propTypes = {};

const styles = StyleSheet.create({});
