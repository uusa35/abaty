import React, {Fragment, useContext} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {
  getCompany,
  getDesigner,
  getSearchCompanies,
  getSearchDesigners,
} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {isIOS} from '../../../constants';
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {getProduct, getSearchProducts} from '../../../redux/actions/product';
import {getService} from '../../../redux/actions/service';
import {getClassified} from '../../../redux/actions/classified';
import {setElementType} from '../../../redux/actions';

const UsersHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchParams,
  type = null,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = () => {
    dispatch(setElementType(type));
    switch (type) {
      case 'designer':
        return dispatch(
          getSearchDesigners({
            searchParams,
            name,
          }),
        );
        break;
      case 'company':
        return dispatch(
          getSearchCompanies({
            searchParams,
            name,
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  };

  const handleElementClick = element => {
    dispatch(setElementType(type));
    switch (type) {
      case 'designer':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'category':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'company':
        return dispatch(
          getCompany({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'product':
        return dispatch(
          getProduct({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      case 'service':
        return dispatch(
          getService({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      case 'classified':
        return dispatch(
          getClassified({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      default:
        null;
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
              size={20}
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
                animation="pulse"
                easing="ease-out"
                key={c.id}
                useNativeDriver={true}>
                <TouchableOpacity
                  activeOpacity={touchOpacity}
                  key={i}
                  style={widgetStyles.btnStyle}
                  onPress={() => handleElementClick(c)}>
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

export default UsersHorizontalWidget;

UsersHorizontalWidget.propTypes = {
  searchParams: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  title: PropTypes.string,
};

const styles = StyleSheet.create({});
