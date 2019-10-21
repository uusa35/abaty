import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import SimpleSpinner from '../../components/SimpleSpinner';

const CompanyIndexScreen = ({companies, searchParams}) => {
  return (
    <React.Suspense fallback={<SimpleSpinner />}>
      <CompaniesList
        elements={companies}
        searchElements={searchParams}
        showMore={true}
      />
    </React.Suspense>
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
