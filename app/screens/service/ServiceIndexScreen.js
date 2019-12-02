import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';
import validate from 'validate.js';

const ServiceIndexScreen = ({services, searchParams, isLoadingContent}) => {
  const [currentElements, setCurrentElements] = useState([]);

  useMemo(() => {
    if (validate.isEmpty(currentElements)) {
      setCurrentElements(services);
    }
  }, [currentElements]);

  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
      <ServiceList
        services={currentElements}
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
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
