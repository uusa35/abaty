import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import {getSearchServices} from '../../redux/actions/service';
import BgContainer from '../../components/containers/BgContainer';

const ServiceIndexAllScreen = ({services, dispatch}) => {
  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  return (
    <BgContainer>
      <ServiceList services={services} searchElements={{}} showName={true} />
    </BgContainer>
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
