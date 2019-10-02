import React, {useContext} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../../redux/DispatchContext';
import {map} from 'lodash';
import {width} from './../../../constants';
import {getSearchProducts} from '../../../redux/actions';

const CollectionGridWidget = ({elements}) => {
  const {dispatch} = useContext(DispatchContext);
  return (
    <ScrollView
      horizontal={false}
      style={{flex: 1, width: '100%'}}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
      colNuber>
      {map(elements, (e, i) => (
        <TouchableOpacity
          onPress={() =>
            dispatch(
              getSearchProducts({
                name: e.slug,
                searchParams: {collection_id: e.id},
                redirect: true
              })
            )
          }
          key={i}>
          <Image
            source={{uri: e.thumb}}
            style={{width: 130, height: 173, margin: 2}}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CollectionGridWidget;

CollectionGridWidget.propTypes = {
  elements: PropTypes.array.isRequired
};
