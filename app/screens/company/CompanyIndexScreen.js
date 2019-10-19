import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';

const CompanyIndexScreen = ({companies, searchParams, dispatch}) => {
  return (
    <CompaniesList
      elements={companies}
      searchElements={searchParams}
      dispatch={dispatch}
      showMore={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(CompanyIndexScreen);

CompanyIndexScreen.propTypes = {
  companies: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
