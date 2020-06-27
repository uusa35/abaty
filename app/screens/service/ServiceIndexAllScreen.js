import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchServices} from '../../redux/actions/service';
import BgContainer from '../../components/containers/BgContainer';
import ServiceList from '../../components/widgets/service/ServiceList';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import I18n from '../../I18n';

const ServiceIndexAllScreen = () => {
  const {services} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  return (
    <BgContainer>
      <ElementsHorizontalList
        elements={services}
        type="service"
        searchElements={{}}
        columns={2}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
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
