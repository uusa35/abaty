import React, {Fragment, useContext} from 'react';
import {iconSizes, text, touchOpacity} from './../../../constants/sizes';
import {images} from './../../../constants/images';
import {getCompany} from './../../../redux/actions/user';
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
import ImageLoaderContainer from '../ImageLoaderContainer';

const CompanyHorizontalWidget = ({
  user,
  showName,
  showRating = false,
  showDescription = false,
  rounded = true,
  handleClick,
}) => {
  const {colors} = useContext(GlobalValuesContext);

  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
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
          borderRadius: rounded ? 5 : 0,
        },
      ]}
      onPress={() => handleClick(user)}>
      <ImageBackground
        source={images.loading}
        style={{height: 240, width: '100%'}}>
        <Fragment>
          <ImageLoaderContainer
            img={user.thumb}
            style={[
              styles.image,
              {
                borderTopLeftRadius: rounded ? 5 : 0,
                borderTopRightRadius: rounded ? 5 : 0,
              },
            ]}
            loadingIndicatorSource={images.logo}
            resizeMode="cover"
          />
          {showName ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={[
                  widgetStyles.elementName,
                  {
                    paddingTop: iconSizes.tiny,
                    color: colors.header_one_theme_color,
                  },
                ]}>
                {user.slug}
              </Text>
              {user.views ? (
                <Text
                  style={[
                    styles.mainTitle,
                    {
                      fontSize: text.small,
                      color: colors.header_one_theme_color,
                    },
                  ]}>
                  {user.views} {I18n.t('views')}
                </Text>
              ) : null}
              {showRating ? (
                <Rating
                  readonly={true}
                  showRating={false}
                  startingValue={user.rating}
                  count={10}
                  ratingCount={5}
                  style={{paddingVertical: 0}}
                  imageSize={15}
                />
              ) : null}
              {showDescription && (
                <Text
                  style={[
                    widgetStyles.elementName,
                    {
                      color: colors.header_one_theme_color,
                      paddingTop: 0,
                      paddingRight: iconSizes.tiny,
                      paddingLeft: iconSizes.tiny,
                      lineHeight: 15,
                      fontSize: text.smaller,
                    },
                  ]}>
                  {user.description}
                </Text>
              )}
            </View>
          ) : null}
        </Fragment>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default React.memo(CompanyHorizontalWidget);

CompanyHorizontalWidget.propTypes = {
  user: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
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
