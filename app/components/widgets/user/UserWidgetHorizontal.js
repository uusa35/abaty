import React, {useContext} from 'react';
import {images} from './../../../constants/images';
import {text} from './../../../constants/sizes';
import {getDesigner} from './../../../redux/actions/user';
import widgetStyles from '../widgetStyles';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import {Rating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';

const UserWidgetHorizontal = ({user, showName}) => {
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      key={user.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '45%',
          maxWidth: 190,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 8,
          height: 260,
        },
      ]}
      onPress={() =>
        dispatch(
          getDesigner({
            id: user.id,
            searchParams: {user_id: user.id},
            redirect: true,
          }),
        )
      }>
      <ImageBackground
        source={{
          uri: user.thumb,
        }}
        imageStyle={styles.imageStyling}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="cover"></ImageBackground>
      {showName ? (
        <View>
          <Text
            style={[
              widgetStyles.elementName,
              {
                paddingTop: 15,
                color: colors.header_tow_theme_color,
              },
            ]}>
            {user.slug}
          </Text>
          {user.views ? (
            <Text
              style={[
                styles.mainTitle,
                {fontSize: text.small, color: colors.header_tow_theme_color},
              ]}>
              {user.views} {I18n.t('views')}
            </Text>
          ) : null}
          <Rating
            readonly={true}
            showRating={false}
            startingValue={user.rating}
            count={10}
            ratingCount={5}
            style={{paddingVertical: 0}}
            imageSize={15}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default UserWidgetHorizontal;

UserWidgetHorizontal.propTypes = {
  user: PropTypes.object,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
  },
  mainTitle: {
    fontFamily: text.font,
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
