import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CollectionList from '../../components/widgets/collection/CollectionList';

const CollectionIndexScreen = ({collections, dispatch, colors}) => {
  return (
    <CollectionList
      collections={collections}
      dispatch={dispatch}
      colors={colors}
      showMore={false}
      showLoading={false}
      searchElements={{}}
    />
  );
};

function mapStateToProps(state) {
  return {
    collections: state.homeCollections,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(CollectionIndexScreen);

CollectionIndexScreen.propTypes = {
  collections: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
