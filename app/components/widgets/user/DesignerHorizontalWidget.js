import React, {Fragment, useContext} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
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
} from '../../../constants/sizes';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {isIOS} from '../../../constants';
import {animations} from '../../../constants/animations';
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {HOMEKEY, ABATI} from './../../../../app';

const DesignerHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchParams,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = () => {
    if (ABATI) {
      return dispatch(
        getSearchDesigners({
          searchParams,
          name,
          redirect: true,
        }),
      );
    } else {
      return dispatch(
        getSearchCompanies({
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
            style={widgetStyles.titleContainer}
            onPress={() => handleClick()}>
            <View style={widgetStyles.titleWrapper}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color},
                ]}>
                {title}
              </Text>
            </View>
            <Icon
              type="entypo"
              name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
              size={iconSizes.smallest}
              color={colors.header_one_theme_color}
            />
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentInset={{right: rightHorizontalContentInset}}
            style={widgetStyles.wrapper}>
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
                      width: 80,
                      height: 80,
                      borderRadius: isIOS ? 80 / 2 : 80 * 2,
                    }}
                    resizeMode="contain"
                  />
                  {showName ? (
                    <Text
                      style={[
                        widgetStyles.elementName,
                        {color: colors.header_tow_theme_color},
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
};

const styles = StyleSheet.create({});
