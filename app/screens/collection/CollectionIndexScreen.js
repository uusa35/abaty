import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import CollectionList from '../../components/widgets/collection/CollectionList';
import BgContainer from '../../components/containers/BgContainer';

const CollectionIndexScreen = () => {
  const {country, collections} = useSelector(state => state);
  return (
    <BgContainer>
      <CollectionList
        collections={collections}
        showMore={false}
        showLoading={false}
        searchElements={{country_id: country.id}}
      />
    </BgContainer>
  );
};

export default CollectionIndexScreen;

const styles = StyleSheet.create({});
