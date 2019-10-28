import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ServiceInfoWidgetMainTitle from './ServiceInfoWidgetMainTitle';
import ServiceInfoWidgetBtns from './ServiceInfoWidgetBtns';

const ServiceInfoWidget = ({element}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
      }}>
      <ServiceInfoWidgetMainTitle element={element} />
      <ServiceInfoWidgetBtns element={element} />
    </ScrollView>
  );
};

export default ServiceInfoWidget;

ServiceInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
