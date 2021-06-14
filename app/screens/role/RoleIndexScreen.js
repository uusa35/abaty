import React, {useCallback, useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {isIOS} from '../../constants';
import {map} from 'lodash';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import {setRole} from '../../redux/actions/user';
import {bottomContentInset, text} from '../../constants/sizes';
import BgContainer from '../../components/containers/BgContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import widgetStyles from '../../components/widgets/widgetStyles';
import {themeColors} from '../../constants/colors';

const RoleIndexScreen = ({navigation}) => {
  const {roles} = useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();

  const handleClick = r => {
    dispatch(setRole(r));
    navigation.navigate('Register');
  };

  return (
    <BgContainer showImage={false}>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: bottomContentInset}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{paddingTop: '5%'}}>
        {map(roles, (r, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.btnStyle,
              {backgroundColor: themeColors.desinerat.lightGray},
            ]}
            onPress={() => handleClick(r)}>
            <ImageLoaderContainer
              img={r.thumb}
              style={{
                width: 80,
                height: 80,
                margin: 10,
                marginBottom: 20,
                borderRadius: 80 / 2,
              }}
            />
            <Text
              style={[
                widgetStyles.headerTow,
                {
                  color: r.color,
                  textAlign: 'center',
                  paddingBottom: 10,
                },
              ]}>
              {r.slug}
            </Text>
            <Text
              style={[
                widgetStyles.headerTow,
                {
                  color: colors.header_one_theme_color,
                  textAlign: 'center',
                  paddingBottom: 10,
                },
              ]}>
              {r.caption}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BgContainer>
  );
};

export default RoleIndexScreen;

const styles = StyleSheet.create({
  btnStyle: {
    margin: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.38,
    shadowRadius: 2.0,
    elevation: 1,
    textAlign: 'left',
  },
});
