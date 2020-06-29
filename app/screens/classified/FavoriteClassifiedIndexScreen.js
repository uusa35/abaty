import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';
import {useSelector} from 'react-redux';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const FavoriteClassifiedIndexScreen = () => {
  const {classifiedFavorites} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={classifiedFavorites}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showClassifiedsFilter={true}
        showSortSearch={true}
        showFooter={true}
        type="classified"
      />
    </BgContainer>
  );
};

export default FavoriteClassifiedIndexScreen;

const styles = StyleSheet.create({});
