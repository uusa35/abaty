import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const DesignerIndexScreen = () => {
  const {designers, searchParams} = useSelector((state) => state);

  useEffect(() => {}, [designers]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={designers}
        searchParams={{}}
        type="designer"
        searchParams={searchParams}
        showMore={true}
        showSearch={true}
        showFooter={true}
      />
    </BgContainer>
  );
};

export default DesignerIndexScreen;

const styles = StyleSheet.create({});
