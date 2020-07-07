import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import {text, width, height} from './../constants/sizes';
import {isIOS} from './../constants';
import PropTypes from 'prop-types';
import Toaster from 'react-native-toaster';
import validate from 'validate.js';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';

const AlertMessage = ({message}) => {
  const dispatch = useDispatch();
  const [messageVisible, setMessageVisible] = useState(message.visible);
  const styles = {
    container: {
      opacity: 0.9,
      backgroundColor: message.color,
      paddingTop: isIOS ? '5%' : '1%',
      height: height / 10,
      width,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20,
      flexWrap: 'nowrap',
    },
    text: {
      color: 'white',
      fontFamily: text.font,
      fontSize: text.medium,
      // fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  useMemo(() => {
    if (!messageVisible) {
      dispatch({type: 'DISABLE_MESSAGE'});
    }
  }, [messageVisible]);

  return (
    <Toaster
      message={{
        text: (
          <View style={[styles.container, {backgroundColor: message.color}]}>
            <Text style={styles.text}>
              {!validate.isEmpty(message) && validate.isString(message.content)
                ? message.content
                : null}
            </Text>
            <Icon
              name={message.icon}
              type={message.type}
              size={25}
              color="white"
            />
          </View>
        ),
        styles,
        duration: 2000,
        useNativeDriver: true,
      }}
      style={styles.content}
      onHide={() => setMessageVisible(false)}
      useNativeDriver={true}
    />
  );
};
export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.object.isRequired,
};
