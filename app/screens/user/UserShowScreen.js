import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import MapViewWidget from '../components/widgets/MapViewWidget';
import {text} from '../../constants/sizes';
import FastImage from 'react-native-fast-image';
import ImagesWidget from '../components/widgets/ImagesWidget';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserInfoWidget from '../components/widgets/user/UserInfoWidget';
import Collapsible from 'react-native-collapsible';
import VideosWidget from '../components/widgets/VideosWidget';

class UserShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, logo, colors} = this.props;
    return (
      <HeaderImageScrollView
        maxHeight={150}
        minHeight={50}
        headerImage={{uri: user.banner ? user.banner : logo}}>
        <View
          style={[
            styles.wrapper,
            {backgroundColor: colors.main_theme_bg_color},
          ]}>
          <TriggeringView onHide={() => console.log('text hidden')}>
            <View
              animation="bounceInLeft"
              easing="ease-out"
              style={styles.elementRow}>
              <FastImage
                source={{uri: user.large ? user.large : logo}}
                style={styles.logo}
              />
              <Text style={styles.mainTitle}>{user.slug}</Text>
            </View>
            <View animation="bounceInLeft" easing="ease-out">
              {!validate.isEmpty(user.longitude || user.latitude) ? (
                <MapViewWidget
                  latitude={user.latitude}
                  longitude={user.longitude}
                  logo={user.thumb}
                  title={user.slug}
                  height={250}
                />
              ) : null}
              <UserInfoWidget user={user} />
            </View>
          </TriggeringView>
        </View>
        <ImagesWidget
          elements={user.images}
          name={user.slug}
          height={500}
          width={300}
        />
        {validate.isObject(user.videoGroup) ? (
          <VideosWidget videos={user.videoGroup} />
        ) : null}
        />
      </HeaderImageScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    colors: state.settings.colors,
    logo: state.settings.logo,
  };
}

export default connect(mapStateToProps)(UserShowScreen);

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
