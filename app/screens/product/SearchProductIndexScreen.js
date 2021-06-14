import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const SearchProductIndexScreen = () => {
  const {searchProducts, searchParams} = useSelector(state => state);
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

export default SearchProductIndexScreen;

const styles = StyleSheet.create({});
