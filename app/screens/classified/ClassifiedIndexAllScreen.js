import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllClassifieds} from '../../redux/actions/classified';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ClassifiedIndexAllScreen = () => {
  const {classifieds} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getAllClassifieds());
  }, []);

  useMemo(() => {
    setCurrentElements(classifieds);
  }, [classifieds]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
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

export default ClassifiedIndexAllScreen;

const styles = StyleSheet.create({});
