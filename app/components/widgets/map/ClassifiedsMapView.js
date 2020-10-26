import React, {Fragment} from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {text, width, height, iconSizes} from '../../../constants/sizes';
import MapViewWidget from '../MapViewWidget';
import {first} from 'lodash';
import ModalBackContainer from '../../containers/ModalBackContainer';

const ClassifiedsMapView = ({mapModal, setMapModal, elements}) => {
  return (
    <Fragment>
      <View
        style={{
          marginTop: 1,
          flexDirection: 'row',
          flex: 1,
        }}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setMapModal(true)}>
          <Icon typ="material" name="room" size={iconSizes.smaller} />
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.small,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            {I18n.t('map')}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalBackContainer
        toggleVisible={mapModal}
        visible={mapModal}
        setToggleVisible={setMapModal}
        title={I18n.t('map')}>
        <MapViewWidget
          title={I18n.t('classified_list')}
          latitude={first(elements).latitude}
          longitude={first(elements).longitude}
          isMulti={true}
          elements={elements}
          showCallOut={true}
          height={height}
        />
      </ModalBackContainer>
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
  btnStyle: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 4,
    // width: width / 3,
    flex: 1,
    // width : '100%',
    minHeight: 40,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 1,
  },
});
