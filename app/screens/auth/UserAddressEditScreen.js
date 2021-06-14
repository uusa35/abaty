import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import BgContainer from '../../components/containers/BgContainer';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import I18n from '../../I18n';
import widgetStyles from '../../components/widgets/widgetStyles';
import {Input} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {text} from '../../constants/sizes';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import {updateAddress} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import shipmentCountry from '../../redux/reducers/shipmentCountry';

const UserAddressEditScreen = ({showLabel = true}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {colors} = useContext(GlobalValuesContext);
  const {shipmentCountry} = useSelector(state => state);
  const {
    name,
    content,
    area,
    block,
    building,
    country_name,
    country_id,
    area_id,
    street,
    id,
  } = route.params.currentAddress;
  const [addName, setAddName] = useState(name);
  const [addContent, setAddContent] = useState(content);
  const [addArea, setAddArea] = useState(area);
  const [addBlock, setAddBlock] = useState(block);
  const [addStreet, setAddStreet] = useState(street);
  const [addBuilding, setAddBuilding] = useState(building);

  return (
    <BgContainer showImage={false}>
      <KeyBoardContainer>
        <Text
          style={[
            widgetStyles.headerThree,
            {textAlign: 'left', marginLeft: text.medium, marginTop: 25},
          ]}>
          {I18n.t('edit_address')}
        </Text>
        <View
          style={[
            widgetStyles.panelContent,
            {flex: 1, paddingTop: 20, paddingBottom: 20},
          ]}>
          {name !== 'address_one' && (
            <Input
              placeholder={I18n.t('address_name') + '*'}
              value={addName ? addName : null}
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
              onChangeText={text => setAddName(text)}
            />
          )}
          <Input
            placeholder={I18n.t('full_name')}
            containerStyle={{maxHeight: 100}}
            value={addContent ? addContent : null}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('full_name') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setAddContent(text)}
          />

          <Input
            placeholder={I18n.t('area')}
            containerStyle={{maxHeight: 100}}
            value={addArea ? addArea : null}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('area') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setAddArea(text)}
          />

          <Input
            placeholder={I18n.t('block')}
            containerStyle={{maxHeight: 100}}
            value={addBlock ? addBlock : null}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('block') + '*' : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="numeric"
            onChangeText={text => setAddBlock(text)}
          />

          <Input
            placeholder={I18n.t('street')}
            containerStyle={{maxHeight: 100}}
            value={addStreet ? addStreet : null}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={showLabel ? I18n.t('street') : null}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setAddStreet(text)}
          />

          <Input
            placeholder={I18n.t('building_or_house')}
            value={addBuilding ? addBuilding : null}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            label={showLabel ? I18n.t('building_or_house') : null}
            shake={true}
            keyboardType="default"
            onChangeText={text => setAddBuilding(text)}
          />
          <DesigneratBtn
            handleClick={() =>
              dispatch(
                updateAddress({
                  name: addName,
                  content: addContent,
                  area: addArea,
                  block: addBlock,
                  street: addStreet,
                  building: addBuilding,
                  id,
                  country_name: country_name
                    ? country_name
                    : shipmentCountry.slug,
                  country_id: country_id ? country_id : shipmentCountry.id,
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

export default UserAddressEditScreen;

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
