import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import SimpleSpinner from '../../components/SimpleSpinner';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';

const ServiceIndexScreen = ({services, searchParams, isLoadingContent}) => {
  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
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
    isLoadingContent: state.isLoadingContent
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
