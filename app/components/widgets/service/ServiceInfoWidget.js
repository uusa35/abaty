import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getProduct} from '../../../redux/actions';
import {Icon, Button} from 'react-native-elements';
import {getProductConvertedFinalPrice} from '../../../helpers';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {text, width} from './../../../constants';
import I18n from './../../../I18n';
import ServiceInfoWidgetMainTitle from './ServiceInfoWidgetMainTitle';

const ServiceInfoWidget = ({element, currency}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
      }}>
      <ServiceInfoWidgetMainTitle element={element} currency={currency} />
      {/*<ServiceInfoWidgetBtns element={element} />*/}
    </ScrollView>
  );
};

export default React.memo(ServiceInfoWidget);

ServiceInfoWidget.propTypes = {
  element: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
