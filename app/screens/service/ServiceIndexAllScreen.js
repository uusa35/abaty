import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import SimpleSpinner from '../../components/SimpleSpinner';

const ServiceIndexAllScreen = ({services, colors, dispatch}) => {
  return (
    <React.Suspense fallback={<SimpleSpinner />}>
      <ServiceList
        services={services}
        searchElements={{}}
        showName={true}
        colors={colors}
        dispatch={dispatch}
      />
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    services: state.services,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ServiceIndexAllScreen);

ServiceIndexAllScreen.propTypes = {
  services: PropTypes.array.isRequired,
  colors: PropTypes.object
};

const styles = StyleSheet.create({});
