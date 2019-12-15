import React, {useState, useMemo, useContext} from 'react';
import {text} from './../constants';
import PropTypes from 'prop-types';
import Toaster from 'react-native-toaster';
import validate from 'validate.js';
import {DispatchContext} from '../redux/DispatchContext';

const AlertMessage = ({message}) => {
  const {dispatch} = useContext(DispatchContext);
  const [alertMessageVisible, setAlertMessageVisible] = useState(
    message.visible,
  );
  const styles = {
    container: {
      opacity: 0.9,
      backgroundColor: message.color,
      minHeight: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontFamily: 'Tajawal-Medium',
      fontSize: text.medium,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  useMemo(() => {
    if (!alertMessageVisible) {
      dispatch({type: 'DISABLE_MESSAGE'});
    }
  }, [alertMessageVisible]);

  return (
    <Toaster
      message={{
        text:
          !validate.isEmpty(message) && validate.isString(message.content)
            ? message.content
            : null,
        styles,
      }}
      style={styles.content}
      onHide={() => setAlertMessageVisible(false)}
      duration={3000}
    />
  );
};
export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
