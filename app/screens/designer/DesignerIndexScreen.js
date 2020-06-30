import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import DesignersList from '../../components/Lists/DeisgnersList';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const DesignerIndexScreen = () => {
  const {designers, searchParams} = useSelector((state) => state);

  useEffect(() => {}, [designers]);

  console.log('here');
  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={designers}
        searchParams={{}}
        type="designer"
        searchParams={searchParams}
        showMore={true}
        showSearch={true}
      />
    </BgContainer>
  );
};

export default DesignerIndexScreen;

const styles = StyleSheet.create({});
