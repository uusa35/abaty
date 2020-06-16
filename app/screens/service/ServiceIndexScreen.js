import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import BgContainer from '../../components/containers/BgContainer';

const ServiceIndexScreen = () => {
  const {services, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ServiceList
        services={services}
        searchElements={searchParams}
        showName={true}
      />
    </BgContainer>
  );
};

export default ServiceIndexScreen;

const styles = StyleSheet.create({});
