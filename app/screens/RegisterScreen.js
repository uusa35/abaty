import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, isIOS, text} from '../constants';
import RegisterFormWidget from '../components/widgets/user/RegisterFormWidget';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {userCountryId: ''};
  }

  render() {
    const {navigation, logo, playerId} = this.props;
    const {userCountryId} = this.state;
    return (
      <NavContext.Provider value={{navigation}}>
        <ScrollView
            contentContainerStyle={{minHeight: !isIOS ? '120%' : null, justifyContent: 'flex-start', alignItems: 'center'}}
            horizontal={false}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 100}}
          style={{ flex: 1}}
        >
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
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    logo: state.settings.logo,
    country: state.country,
    playerId: state.playerId
  };
}

export default connect(mapStateToProps)(RegisterScreen);

RegisterScreen.propTypes = {};

const styles = StyleSheet.create({});
