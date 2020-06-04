import React, {useState, useMemo, useContext, Fragment, useEffect} from 'react';
import {text} from './../constants/sizes';
import {isIOS} from './../constants';
import PropTypes from 'prop-types';
import Snackbar from 'react-native-snackbar';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {useDispatch} from 'react-redux';

const ToastMessage = ({message}) => {
  const dispatch = useDispatch();
  const {isRTL} = useContext(GlobalValuesContext);
  const [messageVisible, setMessageVisible] = useState(message.visible);
  const styles = {
    container: {
      opacity: 0.9,
      backgroundColor: message.color,
      paddingTop: isIOS ? '5%' : '1%',
      minHeight: 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontFamily: text.font,
      fontSize: text.medium,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  useMemo(() => {
    if (!messageVisible) {
      dispatch({type: 'DISABLE_MESSAGE'});
    }
  }, [messageVisible]);

  useEffect(() => {
    if (message.visible) {
      Snackbar.show({
        text: message.content,
        textColor: 'black',
        // backgroundColor : message.color,
        backgroundColor: 'white',
        rtl: isRTL,
        duration: 2000,
        action: {
          text: () => (
            <Icon name="user" type="font-awesome" size={10} color="blue" />
          ),
          textColor: 'green',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  }, [message]);

  return <Fragment></Fragment>;
};
export default ToastMessage;

ToastMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
