import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import ServiceInfoWidgetMainTitle from './ServiceInfoWidgetMainTitle';
import ServiceInfoWidgetBtns from './ServiceInfoWidgetBtns';

const ServiceInfoWidget = ({element}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
      }}>
      <ServiceInfoWidgetMainTitle element={element} />
      <ServiceInfoWidgetBtns element={element} />
    </ScrollView>
  );
};

export default React.memo(ServiceInfoWidget);

ServiceInfoWidget.propTypes = {
  element: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
