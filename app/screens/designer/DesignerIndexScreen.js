import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import DesignersList from '../../components/Lists/DeisgnersList';

const DesignerIndexScreen = ({designers, searchParams}) => {
  return (
    <DesignersList
      elements={designers}
      searchElements={searchParams}
      showMore={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    designers: state.designers,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(DesignerIndexScreen);

DesignerIndexScreen.propTypes = {
  users: PropTypes.array,
};

const styles = StyleSheet.create({});
