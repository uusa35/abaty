import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import {getSearchServices} from '../../redux/actions/service';
import BgContainer from '../../components/containers/BgContainer';

const ServiceIndexAllScreen = () => {
  const {services} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  return (
    <BgContainer>
      <ServiceList services={services} searchElements={{}} showName={true} />
    </BgContainer>
  );
};

export default ServiceIndexAllScreen;

const styles = StyleSheet.create({});
