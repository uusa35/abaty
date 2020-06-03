import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CollectionList from '../../components/widgets/collection/CollectionList';

const CollectionIndexScreen = ({collections}) => {
  return (
    <CollectionList
      collections={collections}
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
  };
}

export default connect(mapStateToProps)(CollectionIndexScreen);

CollectionIndexScreen.propTypes = {
  collections: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
