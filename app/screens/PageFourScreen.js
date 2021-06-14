import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import {iconSizes, text} from '../constants/sizes';
import ElementsVerticalList from '../components/Lists/ElementsVerticalList';
import BgContainer from '../components/containers/BgContainer';
import {getSearchCompanies, getSearchDesigners} from '../redux/actions/user';
import commentModal from '../redux/reducers/commentModal';

const PageFourScreen = () => {
  const {commercials, country} = useSelector(state => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useMemo(() => {
    setCurrentElements(commercials);
  }, [commercials]);

  return (
    <BgContainer showImage={true}>
      <ElementsVerticalList
        elements={currentElements}
        showMore={true}
        showFooter={true}
        showRefresh={false}
        scrollEnabled={true}
        // searchParams={{is_company: 1}}
        iconSize={iconSizes.large}
        textSize={text.medium}
        columns={2}
        type="commercial"
        groupName="commercials"
      />
    </BgContainer>
  );
};

export default PageFourScreen;

const styles = StyleSheet.create({});
