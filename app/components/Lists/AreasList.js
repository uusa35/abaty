import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {hideAreaModal, setArea} from '../../redux/actions';
import {bottomContentInset, text} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import {isRTL} from './../../I18n';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

const AreasList = () => {
  const {areas, areaModal} = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = useCallback((area) => {
    dispatch(setArea(area));
    dispatch(hideAreaModal());
  });

  return (
    <Modal
      visible={areaModal}
      animationType={'slide'}
      style={{backgroundColor: 'transparent'}}
      onRequestClose={() => dispatch(hideAreaModal())}>
      <View style={styles.container}>
        <FlatList
          contentInset={{bottom: bottomContentInset}}
          style={{paddingBottom: bottomContentInset}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={areas}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              key={item.id}
              hitSlop={{left: 15, right: 15}}
              onPress={() => handleClick(item)}
              style={styles.wrapper}>
              <Text style={styles.phoneNo}>{item.slug}</Text>
              <Icon
                name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                type="entypo"
                size={15}
                color="black"
              />
            </TouchableOpacity>
          )}></FlatList>
      </View>
    </Modal>
  );
};

export default AreasList;

AreasList.propTypes = {
  area: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  areaModal: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: '12%',
    backgroundColor: 'white',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 1,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
});
