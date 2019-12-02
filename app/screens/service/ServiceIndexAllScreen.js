import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';
import validate from 'validate.js';
import {getSearchServices} from '../../redux/actions/service';
import {first} from 'lodash';

const ServiceIndexAllScreen = ({
  services,
  isLoadingContent,
  dispatch,
  searchParams,
}) => {
  const ref = useRef();
  const [currentServices, setCurrentServices] = useState([]);

  useEffect(() => {
    if (validate.isEmpty(searchParams)) {
      dispatch(getSearchServices({searchParams: {}}));
    }
  }, []);

  useEffect(() => {
    if (!validate.isEmpty(currentServices)) {
      ref.current = first(currentServices).id;
      if (
        ref.current !== first(services).id &&
        validate.isEmpty(searchParams)
      ) {
        dispatch(getAllProducts());
        setCurrentServices(services);
      }
    }
  }, [services]);

  useMemo(() => {
    if (!validate.isEmpty(services)) {
      setCurrentServices(services);
    }
  }, [currentServices, services]);

  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
      <ServiceList services={services} searchElements={{}} showName={true} />
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    services: state.services,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ServiceIndexAllScreen);

ServiceIndexAllScreen.propTypes = {
  services: PropTypes.array.isRequired,
  colors: PropTypes.object,
};

const styles = StyleSheet.create({});
