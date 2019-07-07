import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavContext} from '../redux/NavContext';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text} from '../constants';
import {showCountryModal} from '../redux/actions';
import RegiterFormWidget from '../components/widgets/user/RegisterFormWidget';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {userCountryId: ''};
  }

  // componentWillMount() {
  //   this.setState({userCountryId: this.props.country.id});
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.country.id !== this.state.userCountryId;
  // }

  render() {
    const {navigation, colors, logo} = this.props;
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
            <RegiterFormWidget userCountryId={userCountryId} />
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
    logo: state.settings.logo,
    country: state.country
  };
}

export default connect(mapStateToProps)(RegisterScreen);

RegisterScreen.propTypes = {};

const styles = StyleSheet.create({});
