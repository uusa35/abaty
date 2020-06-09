import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import DesignersList from '../../components/Lists/DeisgnersList';
import BgContainer from '../../components/containers/BgContainer';

const DesignerIndexScreen = () => {
  const {designers, searchParams} = useSelector((state) => state);

  useEffect(() => {}, [designers]);

  return (
    <BgContainer showImage={false}>
      <DesignersList
        elements={designers}
        searchElements={searchParams}
        showMore={true}
        showSearch={true}
      />
    </BgContainer>
  );
};

export default DesignerIndexScreen;

const styles = StyleSheet.create({});
