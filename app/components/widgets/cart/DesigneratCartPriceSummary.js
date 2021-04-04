import widgetStyles from '../widgetStyles';
import {Text, View} from 'react-native';
import I18n from '../../../I18n';
import {round} from 'lodash';
import {getConvertedFinalPrice} from '../../../helpers';
import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const DesigeratCartPriceSummary = ({title = I18n.t('total_details')}) => {
  const {shipmentFees, shipmentCountry, coupon} = useSelector((state) => state);
  const {
    total,
    grossTotal,
    currency_symbol,
    exchange_rate,
    colors,
  } = useContext(GlobalValuesContext);
  return (
    <View
      style={[
        widgetStyles.panelContent,
        {
          paddingTop: 20,
          paddingBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 15,
          // paddingTop: 10,
        }}>
        <Text style={widgetStyles.headerThree}>{title}</Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: colors.btn_bg_theme_color,
          borderBottomColor: colors.btn_bg_theme_color,
        }}>
        <Text style={[widgetStyles.headerThree]}>{I18n.t('total_sum')}</Text>
        <View style={{flexDirection: 'row', minWidth: 50}}>
          <Text style={widgetStyles.headerThree}>{`${round(total, 2)} ${I18n.t(
            'kwd',
          )}`}</Text>
        </View>
      </View>

      {shipmentFees > 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.btn_bg_theme_color,
          }}>
          <Text style={widgetStyles.headerThree}>
            {I18n.t('shipment_fees_per_piece')}
          </Text>
          <View style={{flexDirection: 'row', minWidth: 50}}>
            <Text style={widgetStyles.headerThree}>
              {`${round(shipmentCountry.fixed_shipment_charge, 2)} ${I18n.t(
                'kwd',
              )}`}
            </Text>
          </View>
        </View>
      ) : null}

      {coupon && coupon.value > 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.btn_bg_theme_color,
          }}>
          <Text style={widgetStyles.headerThree}>{I18n.t('discount')}</Text>
          <View style={{flexDirection: 'row', minWidth: 50}}>
            <Text style={widgetStyles.headerThree}>
              {`${round(coupon.value, 2)} ${I18n.t('kwd')}`}
            </Text>
          </View>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.btn_bg_theme_color,
        }}>
        <Text style={widgetStyles.headerThree}>{I18n.t('grossTotal')}</Text>
        <View style={{flexDirection: 'row', minWidth: 50}}>
          <Text style={widgetStyles.headerThree}>{`${round(
            grossTotal,
            2,
          )} ${I18n.t('kwd')}`}</Text>
        </View>
      </View>

      {!shipmentCountry.is_local && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 20,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: colors.btn_bg_theme_color,
          }}>
          <Text style={widgetStyles.headerThree}>{`${I18n.t(
            'gross_total_in',
          )} ${currency_symbol}`}</Text>
          <View style={{flexDirection: 'row', minWidth: 50}}>
            <Text style={widgetStyles.headerThree}>{`${getConvertedFinalPrice(
              round(grossTotal, 2),
              exchange_rate,
            )} ${currency_symbol}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DesigeratCartPriceSummary;
