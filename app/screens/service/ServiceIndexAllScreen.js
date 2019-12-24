import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';
import validate from 'validate.js';
import {last} from 'lodash';
import {getSearchServices} from '../../redux/actions/service';

const ServiceIndexAllScreen = ({services, isLoadingContent, dispatch}) => {
  const end = useRef();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  useEffect(() => {
    if (!validate.isEmpty(currentElements)) {
      end.current = last(currentElements).id;
      if (end.current !== last(services).id) {
        dispatch(getSearchServices({searchElements: {}}));
        setCurrentElements(services);
      }
    }
  }, [services]);

  useMemo(() => {
    if (!validate.isEmpty(services)) {
      setCurrentElements(services);
    }
  }, [currentElements, services]);

  return (
    <ServiceList services={services} searchElements={{}} showName={true} />
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
