import React, {useContext} from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {images, text} from './../../../constants';
import {isRTL} from '../../../I18n';
import {DispatchContext} from '../../../redux/DispatchContext';
import {getUser} from './../../../redux/actions';
import widgetStyles from '../widgetStyles';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {getProductConvertedFinalPrice} from '../../../helpers';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropTypes from 'prop-types';

const UserWidgetHorizontal = ({user, showName}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      key={user.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: 180,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 230
        }
      ]}
      onPress={() => dispatch(getUser(user.id))}>
      <ImageBackground
        source={{
          uri: user.thumb
        }}
        imageStyle={styles.imageStyling}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="cover">
        {/*<View style={{flex: 1}}>*/}
        {/*    <Icon*/}
        {/*        type="font-awesome"*/}
        {/*        name="heart"*/}
        {/*        size={15}*/}
        {/*        raised*/}
        {/*        color={colors.header_one_theme_color}*/}
        {/*    />*/}
        {/*</View>*/}
      </ImageBackground>
      {showName ? (
        <View>
          <Text
            style={[
              widgetStyles.elementName,
              {textAlign: 'left', paddingTop: 15}
            ]}>
            {user.slug}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(UserWidgetHorizontal);

UserWidgetHorizontal.propTypes = {
  user: PropTypes.object,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180
  },
  imageStyling: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});
