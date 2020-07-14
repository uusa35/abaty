import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {isIOS} from '../../constants';
import {map} from 'lodash';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import {setRole} from '../../redux/actions/user';
import {text} from '../../constants/sizes';
import BgContainer from '../../components/containers/BgContainer';
import {useNavigation} from 'react-navigation-hooks';

const RoleIndexScreen = () => {
  const {roles} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = (r) => {
    dispatch(setRole(r));
    navigation.navigate('Register');
  };

  return (
    <BgContainer>
      <ScrollView
        contentContainerStyle={{minHeight: !isIOS ? '130%' : null}}
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{marginTop: '5%'}}
        contentInset={{bottom: 150}}>
        {map(roles, (r, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.btnStyle, {backgroundColor: r.color}]}
            onPress={() => handleClick(r)}>
            <ImageLoaderContainer
              img={r.thumb}
              style={{
                width: 70,
                height: 70,
                margin: 10,
                marginBottom: 10,
                borderRadius: 70 / 2,
              }}
            />
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.large,
                paddingTop: 3,
                paddingBottom: 5,
                color: 'white',
              }}>
              {r.slug}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                paddingTop: 3,
                paddingBottom: 5,
                color: 'white',
              }}>
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
    margin: 10,
    height: 180,
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
