import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import BgContainer from '../../components/containers/BgContainer';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import I18n from '../../I18n';
import widgetStyles from '../../components/widgets/widgetStyles';
import {Input} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {text} from '../../constants/sizes';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import {createAddress, updateAddress} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {convertNumberToEnglish} from '../../helpers';

const UserAddressCreateScreen = ({showLabel = true}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const {shipmentCountry} = useSelector((state) => state);
  const [addName, setAddName] = useState(null);
  const [addContent, setAddContent] = useState(null);
  const [addArea, setAddArea] = useState(null);
  const [addBlock, setAddBlock] = useState(null);
  const [addStreet, setAddStreet] = useState(null);
  const [addBuilding, setAddBuilding] = useState(null);
  return (
    <BgContainer showImage={false}>
      <KeyBoardContainer>
        <Text
          style={[
            widgetStyles.headerThree,
            {textAlign: 'left', marginLeft: text.medium, marginTop: 25},
          ]}>
          {I18n.t('new_address')}
        </Text>
        <View
          style={[
            widgetStyles.panelContent,
            {flex: 1, paddingTop: 20, paddingBottom: 20},
          ]}>
          <Input
            placeholder={I18n.t('address_name') + '*'}
            disabled={addName === 'address_one'}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('address_name') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={(text) => setAddName(text)}
          />
          <Input
            placeholder={I18n.t('full_name')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('full_name') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={(text) => setAddContent(text)}
          />

          <Input
            placeholder={I18n.t('area')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('area') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={(text) => setAddArea(text)}
          />
          <Input
            placeholder={I18n.t('block')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('block') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="numeric"
            onChangeText={(text) => setAddBlock(convertNumberToEnglish(text))}
          />

          <Input
            placeholder={I18n.t('street')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('street') : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={(text) => setAddStreet(text)}
          />

          <Input
            placeholder={I18n.t('building_or_house')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('building_or_house') : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="numeric"
            onChangeText={(text) =>
              setAddBuilding(convertNumberToEnglish(text))
            }
          />
          <DesigneratBtn
            handleClick={() =>
              dispatch(
                createAddress({
                  name: addName,
                  content: addContent,
                  area: addArea,
                  block: addBlock,
                  street: addStreet,
                  building: addBuilding,
                  country_name: shipmentCountry.slug,
                  country_id: shipmentCountry.id,
                }),
              )
            }
            title={I18n.t('save')}
          />
          <DesigneratBtn
            handleClick={() => navigation.goBack()}
            title={I18n.t('cancel')}
          />
        </View>
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default UserAddressCreateScreen;

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
