import React from 'react';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {text} from '../../constants/sizes';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {View as Animated} from 'react-native-animatable';
import {animations} from '../../constants/animations';

const TagWidget = ({
  textColor = 'white',
  bgColor = 'black',
  tagName,
  sku = null,
}) => {
  return (
    <Animated
      animation={animations.pulse}
      easing="ease-out"
      useNativeDriver={true}>
      <Button
        disabled
        title={sku ? `${I18n.t('sku')} : ${sku}` : I18n.t(tagName)}
        raised
        containerStyle={{
          minWidth: 120,
          height: 25,
          padding: 0,
          marginBottom: 10,
        }}
        disabledStyle={{
          borderRadius: 0,
          minWidth: 80,
          height: 25,
          padding: 0,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        titleProps={{
          style: {
            paddingRight: 10,
            paddingLeft: 10,
            fontFamily: text.font,
            fontSize: text.smaller,
            color: textColor,
            fontWeight: 'bold',
          },
        }}
      />
    </Animated>
  );
};

export default TagWidget;

TagWidget.propTypes = {
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  tagName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({});
