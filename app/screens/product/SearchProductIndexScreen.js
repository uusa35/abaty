import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const SearchProductIndexScreen = ({searchProducts, searchParams}) => {
  const [currentSearchParams, setCurrentSearchParams] = useState({});

  useMemo(() => {
    setCurrentSearchParams(searchParams);
  }, []);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={searchProducts}
        searchParams={currentSearchParams}
        type="product"
        columns={2}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
        showSortSearch={true}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    searchProducts: state.searchProducts,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(SearchProductIndexScreen);

SearchProductIndexScreen.propTypes = {
  searchProducts: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
