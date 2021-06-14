import React, {Fragment} from 'react';
import {TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import {getDesigner, getSearchDesigners} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import NoMoreElements from '../NoMoreElements';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {width} from './../../../constants';
import {animations} from '../../../constants/animations';

const ExpoDesignerHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchElements,
}) => {
  const dispatch = useDispatch();
  const {colors} = useSelector(state => state.settings);

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          animation={animations.bounceIn}
          easing="ease-out"
          useNativeDriver={true}
          style={{marginTop: 10, marginBottom: 10}}>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline',
              backgroundColor: 'white',
              alignSelf: 'center',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              width: width / 1.5,
            }}
            onPress={() =>
              dispatch(
                getSearchDesigners({
                  searchParams: searchElements,
                  name,
                  redirect: true,
                }),
              )
            }>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 20,
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                backgroundColor: '#f9f9f9',
                padding: 10,
                borderRadius: 25,
                width: width / 1.6,
              }}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color},
                ]}>
                {title}
              </Text>
              <Icon
                type="entypo"
                name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                size={iconSizes.smallest}
                iconStyle={{paddingTop: 3}}
                color={colors.header_one_theme_color}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              paddingTop: 25,
              paddingBottom: 25,
              borderRadius: 25,
              backgroundColor: 'white',
              marginRight: 10,
              marginLeft: 10,
              minHeight: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentInset={{right: rightHorizontalContentInset}}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disableVirtualization={false}
              ListEmptyComponent={() => (
                <NoMoreElements title={`${I18n.t('no_available')} ${title}`} />
              )}
              style={{
                flexDirection: 'row',
                width: '100%',
              }}
              data={elements}
              renderItem={({item}) => (
                <View
                  animation="bounceIn"
                  easing="ease-out"
                  key={item.id}
                  useNativeDriver={true}>
                  <TouchableOpacity
                    activeOpacity={touchOpacity}
                    style={widgetStyles.btnStyle}
                    onPress={() =>
                      dispatch(
                        getDesigner({
                          id: item.id,
                          searchParams: {user_id: item.id},
                          redirect: true,
                        }),
                      )
                    }>
                    <ImageLoaderContainer
                      img={item.thumb}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    {showName ? (
                      <Text
                        style={[
                          widgetStyles.elementName,
                          {color: colors.header_tow_theme_color},
                        ]}>
                        {item.slug}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </Fragment>
  );
};

export default ExpoDesignerHorizontalWidget;

ExpoDesignerHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    // borderRadius: 80 / 2,
  },
});
