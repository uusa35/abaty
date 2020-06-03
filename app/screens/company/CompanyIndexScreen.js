import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import BgContainer from '../../components/containers/BgContainer';

const CompanyIndexScreen = ({companies, searchParams}) => {
  return (
    <BgContainer showImage={false}>
      <CompaniesList
        elements={companies}
        searchParams={searchParams}
        showMore={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(CompanyIndexScreen);

CompanyIndexScreen.propTypes = {
  companies: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
