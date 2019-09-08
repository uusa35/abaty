import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text, isIOS, width} from '../../../constants';
import PropTypes from 'prop-types';
import {map, isNull} from 'lodash';
import {DispatchContext} from '../../../redux/DispatchContext';
import {getSearchProducts} from '../../../redux/actions';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';

const UserCategoriesInfoWidget = ({
  elements,
  showTitle = true,
  showArrow = true,
  colors,
  dispatch
}) => {
  return (
    <ScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 100}}>
      {!validate.isEmpty(elements) ? (
        <View
          key={elements.length}
          style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          {showTitle ? (
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.large,
                marginBottom: 10,
                textAlign: 'left',
                color: colors.header_one_theme_color,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1
              }}>
              {I18n.t('product_categories')}
            </Text>
          ) : null}
          {map(elements, (c, i) => {
            if (!isNull(c)) {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    dispatch(
                      getSearchProducts({
                        name: c.name,
                        searchParams: {product_category_id: c.id},
                        redirect: true
                      })
                    )
                  }
                  hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                  style={styles.itemRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline'
                    }}>
                    <Icon
                      type="entypo"
                      name={isRTL ? 'triangle-left' : 'triangle-right'}
                      color="grey"
                      size={20}
                      iconStyle={{
                        paddingRight: 10,
                        paddingLeft: 10
                      }}
                    />
                    <Text style={styles.subTitle}>{c.name}</Text>
                  </View>
                  {showArrow ? (
                    <Icon
                      type="entypo"
                      name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                      color="lightgrey"
                      size={15}
                      iconStyle={{
                        paddingRight: isIOS ? 10 : 0,
                        paddingLeft: isIOS ? 0 : 10
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      ) : (
        <View
          style={{marginTop: '20%', width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_categories')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default UserCategoriesInfoWidget;

UserCategoriesInfoWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left'
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left'
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
