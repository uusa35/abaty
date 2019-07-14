import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Linking} from 'react-native';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text} from '../constants';
import {submitAuth} from '../redux/actions';
import FastImage from 'react-native-fast-image';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: 'test@test.com', password: 'secret'};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.token !== nextState.token;
  }

  render() {
    const {navigation, colors, logo, dispatch} = this.props;
    const {email, password} = this.state;
    return (
      <NavContext.Provider value={{navigation}}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
            <FastImage
              source={{uri: logo}}
              style={{width: 100, height: 100, margin: 20}}
              resizeMode="contain"
              loadingIndicatorSource={images.logo}
            />
            <Input
              placeholder={I18n.t('email')}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 20
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left'
              }}
              shake={true}
              keyboardType="email-address"
              onChangeText={email => this.setState({email})}
            />
            <Input
              placeholder={I18n.t('password')}
              secureTextEntry={true}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 20
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left'
              }}
              shake={true}
              keyboardType="default"
              onChangeText={password => this.setState({password})}
            />
            <Button
              raised
              containerStyle={{marginBottom: 50, width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                borderRadius: 0
              }}
              title={I18n.t('login')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
              onPress={() => dispatch(submitAuth({email, password}))}
            />
            <Button
              raised
              containerStyle={{marginBottom: 10, width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                borderRadius: 0
              }}
              title={I18n.t('new_user')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
              onPress={() => navigation.navigate('Register')}
            />
            <Button
              raised
              containerStyle={{marginBottom: 10, width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                borderRadius: 0
              }}
              title={I18n.t('forget_password')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
              onPress={() =>
                Linking.openURL(`http://abati.ideasowners.net/password/reset`)
              }
            />
          </View>
        </View>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    colors: state.settings.colors,
    logo: state.settings.logo
  };
}

export default connect(mapStateToProps)(LoginScreen);

LoginScreen.propTypes = {};

const styles = StyleSheet.create({});
