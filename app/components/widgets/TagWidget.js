import React from 'react';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {text} from '../../constants/sizes';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const TagWidget = ({
  textColor = 'white',
  bgColor = 'black',
  tagName,
  sku = null,
}) => {
  return (
    <Button
      title={sku ? `${I18n.t('sku')} : ${sku}` : I18n.t(tagName)}
      raised
      containerStyle={{
        minWidth: 120,
        height: 25,
        padding: 0,
        marginBottom: 10,
      }}
      buttonStyle={{
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
        },
      }}
    />
  );
};

export default TagWidget;

TagWidget.propTypes = {
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  tagName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({});
