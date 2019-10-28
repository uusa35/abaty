import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

const CollectionInfoWidget = ({element}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
      }}></ScrollView>
  );
};

export default CollectionInfoWidget;

CollectionInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
