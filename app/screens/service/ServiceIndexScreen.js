import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import SimpleSpinner from '../../components/SimpleSpinner';

const ServiceIndexScreen = ({services, searchParams, colors, dispatch}) => {
  return (
    <React.Suspense fallback={<SimpleSpinner />}>
      <ServiceList
        services={services}
        searchElements={searchParams}
        showName={true}
      />
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    services: state.services,
    searchParams: state.searchParams,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
