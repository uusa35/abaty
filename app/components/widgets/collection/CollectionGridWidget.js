import React, {Fragment, useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../../redux/DispatchContext';
import {map} from 'lodash';
import {getSearchProducts} from '../../../redux/actions/product';
import widgetStyles from '../widgetStyles';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {touchOpacity} from '../../../constants';

const CollectionGridWidget = ({elements, showTitle = true}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Fragment>
      {showTitle ? (
        <View style={{width: '100%', padding: 10}}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color},
            ]}>
            {I18n.t('selected_collections')}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        {map(elements, (e, i) => (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={{margin: 5}}
            onPress={() =>
              dispatch(
                getSearchProducts({
                  name: e.slug,
                  searchParams: {collection_id: e.id},
                  redirect: true,
                }),
              )
            }
            key={i}>
            <FastImage
              source={{uri: e.thumb}}
              style={{
                width: 110,
                height: 150,
                borderWidth: 0.5,
                borderColor: 'lightgrey',
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Fragment>
  );
};

export default CollectionGridWidget;

CollectionGridWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};
