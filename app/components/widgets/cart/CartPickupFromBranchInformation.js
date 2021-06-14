import React from 'react';
import {Fragment} from 'react';
import {View} from 'react-native-animatable';
import widgetStyles from '../widgetStyles';
import {Linking, Pressable, Text, TouchableOpacity} from 'react-native';
import {getWhatsappLink} from '../../../helpers';
import I18n, {isRTL} from '../../../I18n';
import {APP_CASE} from '../../../../app.json';
import {Icon} from 'react-native-elements';
import {iconSizes} from '../../../constants/sizes';
import {themeColors} from '../../../constants/colors';
import {useSelector} from 'react-redux';

const CartPickupFromBranchInformation = () => {
  const {settings, pickup, grossTotal, shipmentFees, branch, cart} =
    useSelector(state => state);
  return (
    <Fragment>
      {settings.whatsapp && (
        <View
          style={[
            widgetStyles.panelContent,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                getWhatsappLink(settings.whatsapp, I18n.t(APP_CASE)),
              )
            }
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Icon
              name="whatsapp"
              type="font-awesome"
              size={iconSizes.smaller}
              color={themeColors.whatsapp}
            />
            <Text
              style={[
                widgetStyles.headerFour,
                {paddingLeft: 20, paddingRight: 20},
              ]}>
              {I18n.t('contact_with_us_through_whatsapp')}
            </Text>
          </TouchableOpacity>
          <Icon
            name={`chevron-${isRTL ? 'left' : 'right'}`}
            type="evilicon"
            size={iconSizes.medium}
            color={settings.colors.icon_theme_color}
          />
        </View>
      )}

      {settings.pickupFromBranch && pickup && (
        <View style={{marginTop: '5%'}}>
          <Text
            style={[widgetStyles.headerTow, {marginLeft: 20, marginRight: 20}]}>
            {I18n.t('pickup_from_branch')}
          </Text>
          <View>
            <View
              style={[
                widgetStyles.panelContent,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: 20,
                },
              ]}>
              <Text
                style={[
                  widgetStyles.headerFour,
                  {paddingBottom: 10, lineHeight: 30},
                ]}>
                {I18n.t('u_have_chosed_to_pickup_ur_order_from_branch')}
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingBottom: 15,
                  paddingTop: 20,
                  borderTopColor: settings.colors.btn_bg_theme_color,
                  borderTopWidth: 0.5,
                }}>
                <Text
                  style={[
                    widgetStyles.headerFour,
                    {width: 100, textAlign: 'left'},
                  ]}>
                  {I18n.t('branch_name')} :
                </Text>
                <Text style={[widgetStyles.headerFour, {paddingLeft: 10}]}>
                  {branch.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 15,
                }}>
                <Text
                  style={[
                    widgetStyles.headerFour,
                    {width: 100, textAlign: 'left'},
                  ]}>
                  {I18n.t('branch_address')} :
                </Text>
                <Text style={[widgetStyles.headerFour, {paddingLeft: 10}]}>
                  {branch.address}
                </Text>
              </View>
              {branch.mobile && (
                <Pressable
                  onPress={() => Linking.openURL(`tel:${branch.mobile}`)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={[
                      widgetStyles.headerFour,
                      {width: 100, textAlign: 'left'},
                    ]}>
                    {I18n.t('branch_mobile')} :
                  </Text>
                  <Text
                    style={[
                      widgetStyles.headerFour,
                      {paddingLeft: 10, textAlign: 'left'},
                    ]}>
                    {branch.mobile}
                  </Text>
                </Pressable>
              )}

              {branch.description && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={[
                      widgetStyles.headerFour,
                      {width: 200, textAlign: 'left'},
                    ]}>
                    {I18n.t('branch_description')}
                  </Text>
                  <Text style={[widgetStyles.headerTow, {paddingLeft: 10}]}>
                    : {branch.description}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {cart[0].element.user.whatsapp ? (
            <View
              style={[
                widgetStyles.panelContent,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 15,
                },
              ]}>
              <Pressable
                onPress={() =>
                  Linking.openURL(
                    getWhatsappLink(settings.whatsapp, I18n.t(APP_CASE)),
                  )
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Icon
                  name="whatsapp"
                  type="font-awesome"
                  size={iconSizes.smaller}
                  color={themeColors.whatsapp}
                />
                <Text
                  style={[
                    widgetStyles.headerFive,
                    {paddingLeft: 20, paddingRight: 20},
                  ]}>
                  {I18n.t('contact_with_merchant_through_whatsapp')}
                </Text>
              </Pressable>
              <Icon
                name={`chevron-${isRTL ? 'left' : 'right'}`}
                type="evilicon"
                size={iconSizes.medium}
                color={settings.colors.icon_theme_color}
              />
            </View>
          ) : null}
        </View>
      )}
    </Fragment>
  );
};

export default CartPickupFromBranchInformation;
