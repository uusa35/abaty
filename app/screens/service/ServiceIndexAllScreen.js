import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchServices} from '../../redux/actions/service';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import I18n from './../../I18n';
import {isEmpty} from 'lodash';

const ServiceIndexAllScreen = () => {
  const {services, searchParams, country} = useSelector(state => state);
  const dispatch = useDispatch();
  const [currentSearchParams, setCurrentSearchParams] = useState({
    country_id: country.id,
  });
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getSearchServices({searchParams: currentSearchParams}));
  }, []);

  useMemo(() => {
    if (!isEmpty(services)) {
      setCurrentSearchParams(searchParams);
      setCurrentElements(services);
    }
  }, [services]);

  return (
    <BgContainer>
      <ElementsHorizontalList
        elements={currentElements}
        type="service"
        title={I18n.t('services')}
        searchElements={currentSearchParams}
        columns={2}
        pageLimit={3}
        showRefresh={true}
        showFooter={true}
        showSearch={false}
        showTitle={true}
        showSortSearch={false}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
        showName={true}
      />
    </BgContainer>
  );
};

export default ServiceIndexAllScreen;

const styles = StyleSheet.create({});
