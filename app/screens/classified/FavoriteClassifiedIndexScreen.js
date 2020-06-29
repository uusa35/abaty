import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import {useSelector} from 'react-redux';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const FavoriteClassifiedIndexScreen = () => {
  const {classifiedFavorites, token} = useSelector((state) => state);

  useEffect(() => {}, [token, classifiedFavorites]);

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
