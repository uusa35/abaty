import React, {useState, useContext, useEffect, useMemo} from 'react';
import {StyleSheet, StatusBar, Modal, View} from 'react-native';
// import {View} from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import {Icon, Divider} from 'react-native-elements';
import {text} from './../constants';
import {DispatchContext} from '../redux/DispatchContext';
import PropTypes from 'prop-types';
import Toaster from 'react-native-toaster';
import validate from 'validate.js';

const AlertMessage = ({message}) => {
  const [visible, setVisible] = useState(message.visible);
  const {dispatch} = useContext(DispatchContext);
  console.log('the message', message);
  const styles = {
    container: {
      opacity: 0.9,
      backgroundColor: message.color,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '10%',
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15
    },
    text: {
      color: 'white',
      fontFamily: text.font,
      fontSize: text.medium,
      fontWeight: 'bold',
      textAlign: 'left'
    }
  };

  useMemo(() => {
    console.log('the visible now', visible);
    if (!visible) {
      dispatch({type: 'DISABLE_MESSAGE'});
    }
  }, [visible]);

  return (
    <Toaster
      message={{
        text:
          !validate.isEmpty(message) && validate.isString(message.content)
            ? message.content
            : null,
        styles
      }}
      style={styles.content}
      onHide={() => setVisible(false)}
      duration={3000}
    />
  );
};
export default React.memo(AlertMessage);

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired
};
