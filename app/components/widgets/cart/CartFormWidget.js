import React, {useState, useContext} from 'react';
import {View} from 'react-native-animatable';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text} from '../../../constants/sizes';
import {Text, TouchableOpacity} from 'react-native';
import {showCountryModal} from '../../../redux/actions';
import {getCoupon} from '../../../redux/actions/cart';
import {useSelector} from 'react-redux';

const CartFormWidget = ({
  country,
  auth,
  colors,
  grossTotal,
  shipment_notes,
}) => {
  const dispatch = useSelector();
  const [email, setEmail] = useState(auth.email);
  const [name, setName] = useState(auth.name);
  const [mobile, setMobile] = useState(auth.mobile);

  return (
    <View>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Input
          placeholder={name ? name : I18n.t('name')}
          value={name ? name : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          shake={true}
          keyboardType="default"
          onChangeText={name => this.setState({name})}
        />
        <Input
          placeholder={email ? email : I18n.t('email')}
          value={email ? email : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          shake={true}
          keyboardType="email-address"
          onChangeText={email => this.setState({email})}
        />
        <Input
          placeholder={mobile ? mobile : I18n.t('mobile')}
          value={mobile ? mobile : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          shake={true}
          keyboardType="number-pad"
          onChangeText={mobile => this.setState({mobile})}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(showCountryModal());
          }}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            height: 45,
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              textAlign: isRTL ? 'right' : 'left',
              color: colors.main_theme_color,
            }}>
            {shipmentCountry.slug}
          </Text>
        </TouchableOpacity>
        <Input
          placeholder={address ? address : I18n.t('full_address')}
          value={address ? address : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left',
          }}
          numberOfLines={3}
          shake={true}
          keyboardType="default"
          onChangeText={address => this.setState({address})}
        />
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.small,
            textAlign: 'center',
            paddingBottom: 10,
          }}>
          {shipment_notes}
        </Text>
        <Input
          placeholder={I18n.t('additional_information')}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 20,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          shake={true}
          keyboardType="default"
          multiline={true}
          numberOfLines={3}
          // onChangeText={(text) => console.log(text)}
        />
        <View
          style={{
            padding: 20,
            borderWidth: 1,
            borderColor: 'lightgrey',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              textAlign: 'center',
              paddingBottom: 10,
            }}>
            {I18n.t('have_coupon')}
          </Text>
          <Input
            placeholder={I18n.t('coupon')}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left',
            }}
            shake={true}
            keyboardType="default"
            onChangeText={code => this.setState({code})}
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '90%%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('add_coupon')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => dispatch(getCoupon(code))}
          />
        </View>
      </View>
      <Button
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('confirm_information')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        // onPress={() => console.log('confirm information')}
      />
    </View>
  );
};

export default CartFormWidget;
