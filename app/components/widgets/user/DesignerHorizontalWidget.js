import React, {Fragment, useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
  Text,
} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {
  getDesigner,
  getSearchCompanies,
  getSearchDesigners,
} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
  userWidget,
} from '../../../constants/sizes';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {isIOS} from '../../../constants';
import {animations} from '../../../constants/animations';
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {HOMEKEY, ABATI, APP_CASE} from './../../../../app';
import I18n from './../../../I18n';

const DesignerHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  type,
  searchParams,
  rounded = true,
  showAll = false,
  width = userWidget[APP_CASE].small.width,
  height = userWidget[APP_CASE].small.height,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = () => {
    if (type === 'company') {
      return dispatch(
        getSearchCompanies({
          searchParams,
          name: title,
          redirect: true,
        }),
      );
    } else if (type === 'designer') {
      return dispatch(
        getSearchDesigners({
          searchParams,
          name,
          redirect: true,
        }),
      );
    }
  };

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View style={widgetStyles.container}>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={[
              widgetStyles.titleContainer,
              {
                height: 40,
                alignItems: 'baseline',
                borderBottomColor: colors.header_one_theme_color,
                borderBottomWidth: 0.5,
                marginBottom: 10,
              },
            ]}
            onPress={() => handleClick()}>
            <View style={widgetStyles.titleWrapper}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color, paddingLeft: 10},
                ]}>
                {title}
              </Text>
            </View>
            {showAll && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={[
                    widgetStyles.headerThree,
                    {color: colors.btn_bg_theme_color},
                  ]}>
                  {I18n.t('show_all')}
                </Text>
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={iconSizes.tiny}
                  color={colors.header_one_theme_color}
                />
              </View>
            )}
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // alwaysBounceVertical={false}
            // pagingEnabled={true}
            contentInset={{right: rightHorizontalContentInset}}
            // contentInset={{right: 1000}}
            //   style={{ flexDirection : 'row', borderWidth : 5, borderColor : 'blue', flex : 1 }}
            // contentContainerStyle={{ flexDirection : 'row', borderWidth : 10 , flex : 1 }}
          >
            {map(elements, (c, i) => (
              <View
                animation={animations.flip}
                easing="ease-out"
                key={c.id}
                useNativeDriver={true}>
                <TouchableOpacity
                  activeOpacity={touchOpacity}
                  key={i}
                  style={widgetStyles.btnStyle}
                  onPress={() =>
                    dispatch(
                      getDesigner({
                        id: c.id,
                        searchParams: {user_id: c.id},
                        redirect: true,
                      }),
                    )
                  }>
                  <ImageLoaderContainer
                    img={c.thumb}
                    style={{
                      width,
                      height,
                      borderRadius:
                        isIOS && rounded
                          ? width / 2
                          : !isIOS && rounded
                          ? width * 2
                          : 0,
                    }}
                    resizeMode="cover"
                  />
                  {showName ? (
                    <Text
                      style={[
                        widgetStyles.elementName,
                        {color: colors.header_one_theme_color},
                      ]}>
                      {c.slug}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
};

export default DesignerHorizontalWidget;

DesignerHorizontalWidget.propTypes = {
  searchParams: PropTypes.object.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({});
