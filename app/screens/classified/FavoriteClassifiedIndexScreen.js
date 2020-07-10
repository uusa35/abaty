import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import {useSelector} from 'react-redux';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const FavoriteClassifiedIndexScreen = () => {
  const {classifiedFavorites, guest} = useSelector((state) => state);
  const [currentElements, setCurrentElements] = useState(classifiedFavorites);

  useEffect(() => {
    setCurrentElements(classifiedFavorites);
  }, [classifiedFavorites]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        showName={true}
        searchElements={{}}
        showSearch={!guest}
        showClassifiedsFilter={!guest}
        showSortSearch={!guest}
        showFooter={true}
        type="classified"
      />
    </BgContainer>
  );
};

export default FavoriteClassifiedIndexScreen;

const styles = StyleSheet.create({});
