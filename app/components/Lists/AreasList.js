import React, {useState, useContext, useMemo, useCallback} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import {map} from 'lodash';
import {hideAreaModal, setArea} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {images, text} from '../../constants';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import I18n from './../../I18n';
import PropTypes from 'prop-types';

const AreasList = ({area, areas, areaModal}) => {
  const {dispatch} = useContext(DispatchContext);
  [visible, setVisible] = useState(areaModal);
  [currentArea, setCurrentArea] = useState(area);

  const handleClick = useCallback(area => {
    dispatch(setArea(area));
    dispatch(hideAreaModal());
  });

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={areaModal}
        animationType={'slide'}
        onRequestClose={() => dispatch(hideAreaModal())}>
        <View style={styles.container}>
          <FlatList
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={areas}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                hitSlop={{left: 15, right: 15}}
                onPress={() => handleClick(item)}
                style={styles.wrapper}>
                <FastImage
                  source={{uri: item.thumb}}
                  style={styles.areaFlag}
                  loadingIndicatorSource={images.logo}
                />
                <Text style={styles.phoneNo}>{item.slug}</Text>
              </TouchableOpacity>
            )}></FlatList>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(AreasList);

AreasList.propTypes = {
  area: PropTypes.object.isRequired,
  areas: PropTypes.array.isRequired,
  areaModal: PropTypes.bool.isRequired
};
const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: '25%',
    // right: '15%',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left'
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15
  }
});
