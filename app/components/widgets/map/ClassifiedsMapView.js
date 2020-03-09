import React, {Fragment} from 'react';
import {TouchableOpacity, Modal, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {text, width, height} from '../../../constants/sizes';
import MapViewWidget from '../MapViewWidget';
import {first} from 'lodash';

const ClassifiedsMapView = ({mapModal, setMapModal, elements}) => {
  return (
    <Fragment>
      <TouchableOpacity
        style={{
          borderRightWidth: 0.5,
          width: '50%',
          minHeight: 50,
          borderColor: 'lightgrey',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setMapModal(true)}>
        <Icon typ="font-awesome" name="map" size={30} />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={mapModal}
        animationType={'slide'}
        onRequestClose={() => setMapModal(false)}>
        <View style={styles.container}>
          <Icon
            size={30}
            name="close"
            type="evil-icons"
            color="black"
            containerStyle={{
              position: 'absolute',
              top: 50,
              right: 50,
              alignItems: 'flex-end',
              zIndex: 999,
            }}
            onPress={() => setMapModal(false)}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          />
          <MapViewWidget
            title={I18n.t('classified_list')}
            latitude={first(elements).latitude}
            longitude={first(elements).longitude}
            isMulti={true}
            elements={elements}
            showCallOut={true}
            height={height}
          />
        </View>
      </Modal>
    </Fragment>
  );
};

export default ClassifiedsMapView;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  countryFlag: {
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
