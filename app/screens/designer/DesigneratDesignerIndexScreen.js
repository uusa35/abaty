import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const DesigneratDesignerIndexScreen = () => {
  const {designers, searchParams} = useSelector(state => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(designers);
  }, []);

  return (
    <BgContainer showImage={false} white={true}>
      <ElementsHorizontalList
        elements={currentElements}
        type="designer"
        searchParams={currentSearchParams}
        showMore={true}
        showSearch={true}
        showFooter={true}
      />
    </BgContainer>
  );
};

export default DesigneratDesignerIndexScreen;

const styles = StyleSheet.create({});
