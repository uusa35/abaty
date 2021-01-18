import React, {Fragment, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import TagWidget from './../TagWidget';
import ClassifiedInfoWidget from './ClassifiedInfoWidget';
import ImageLoaderContainer from '../ImageLoaderContainer';

const ClassifiedWidget = ({element, showName = false, handleClick}) => {
  const {currency_symbol, exchange_rate} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '100%',
          marginLeft: 0,
          marginRight: 0,
          height: 400,
          // borderWidth: 1,
          borderColor: 'lightgrey',
          // borderRadius: 20,
          // marginTop: 5,
          // marginBottom: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center',
        },
      ]}
      onPress={() => handleClick(element)}>
      <ImageBackground
        source={images.loading}
        style={{height: 400, width: '100%'}}>
        <Fragment>
          <ImageLoaderContainer
            img={element.thumb}
            style={styles.image}
            resizeMode="cover"
          />
          {/*<ImageBackground*/}
          {/*  source={{*/}
          {/*    uri: element.thumb,*/}
          {/*  }}*/}
          {/*  loadingIndicatorSource={images.logo}*/}
          {/*  style={styles.image}*/}
          {/*  imageStyle={{*/}
          {/*    width: '100%',*/}
          {/*    height: 400,*/}
          {/*    // borderRadius: 20*/}
          {/*  }}*/}
          {/*  resizeMode="cover">*/}
          <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
            {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
          </View>
        </Fragment>
      </ImageBackground>
      {showName ? (
        <ClassifiedInfoWidget
          element={element}
          exchange_rate={exchange_rate}
          currency_symbol={currency_symbol}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(ClassifiedWidget);

ClassifiedWidget.propTypes = {
  element: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230,
  },
});
