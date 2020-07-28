import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {ESCRAP} from './../../../app';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';

const CompanyIndexScreen = () => {
  const {companies, searchParams} = useSelector((state) => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(companies);
  }, []);

  return (
    <BgContainer showImage={false}>
      {ESCRAP ? (
        <ElementsVerticalList
          type="company"
          elements={currentElements}
          searchParams={currentSearchParams}
          showRefresh={true}
          showFooter={true}
          showSearch={true}
          showTitleIcons={true}
          showMore={true}
        />
      ) : (
        <ElementsHorizontalList
          type="company"
          elements={companies}
          searchParams={searchParams}
          showRefresh={true}
          showFooter={true}
          showSearch={true}
          showTitleIcons={true}
          showMore={true}
        />
      )}
    </BgContainer>
  );
};

export default CompanyIndexScreen;

const styles = StyleSheet.create({});
