import React, {useState, useMemo} from 'react';
import {text} from './../constants';
import PropTypes from 'prop-types';
import Toaster from 'react-native-toaster';
import validate from 'validate.js';

const AlertMessage = ({message, dispatch}) => {
  const [alertMessageVisible, setAlertMessageVisible] = useState(
    message.visible
  );
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
        styles
      }}
      style={styles.content}
      onHide={() => setAlertMessageVisible(false)}
      duration={3000}
    />
  );
};
export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired
};
