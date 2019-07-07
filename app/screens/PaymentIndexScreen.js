import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class PaymentIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {dispatch} = this.props;
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.paymentUrl}}
        style={{marginTop: 20}}
        injectedJavaScript={'(function(){ return "test"}());'}
        onNavigationStateChange={navEvent => dispatch({type: 'CLEAR_CART'})}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PaymentIndexScreen);

PaymentIndexScreen.propTypes = {};
const styles = StyleSheet.create({});
