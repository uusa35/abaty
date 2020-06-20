import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';
import {useSelector} from 'react-redux';

const FavoriteClassifiedIndexScreen = () => {
  const {classifiedFavorites} = useSelector((state) => state);
  return (
    <BgContainer>
      <ClassifiedList
        classifieds={classifiedFavorites}
        showName={true}
        showMore={false}
        searchElements={{}}
        noElementsTitle={I18n.t('no_classifieds_favorites')}
      />
    </BgContainer>
  );
};

export default FavoriteClassifiedIndexScreen;

const styles = StyleSheet.create({});
