import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';

const ClassifiedIndexScreen = () => {
  const {searchClassifieds, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={searchClassifieds}
        showName={true}
        searchElements={searchParams}
      />
    </BgContainer>
  );
};

export default ClassifiedIndexScreen;

const styles = StyleSheet.create({});
