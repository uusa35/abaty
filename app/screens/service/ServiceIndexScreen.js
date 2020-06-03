import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ServiceList} from '../../components/LazyLoadingComponents/serviceComponents';
import BgContainer from '../../components/containers/BgContainer';

const ServiceIndexScreen = ({services, searchParams, isLoadingContent}) => {
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
