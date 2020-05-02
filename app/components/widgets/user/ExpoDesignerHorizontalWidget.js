import React, {useState, useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {getDesigner, getSearchDesigners} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  rightHorizontalContentInset,
  touchOpacity,
  width,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ExpoDesignerHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchElements,
}) => {
  const [params, setParams] = useState(searchElements);
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
          backgroundColor: 'white',
          alignSelf: 'center',
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
        onPress={() =>
          dispatch(
            getSearchDesigners({
              searchParams: {is_designer: 1},
              name,
              redirect: true,
            }),
          )
        }>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginRight: 20,
            marginLeft: 20,
            marginTop: 10,
            flexDirection: 'row',
            backgroundColor: '#f2f2f2',
            padding: 10,
            borderRadius: 25,
            width: '40%',
          }}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color},
            ]}>
            {title}
          </Text>
          <Icon
            type="entypo"
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            size={20}
            color={colors.header_one_theme_color}
          />
        </View>
      </TouchableOpacity>

      <View
        style={{
          paddingTop: 25,
          paddingBottom: 25,
          borderRadius: 25,
          backgroundColor: 'white',
          marginRight: 10,
          marginLeft: 10,
          minHeight: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentInset={{right: rightHorizontalContentInset}}
          keyExtractor={(item, index) => index.toString()}
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
          data={elements}
          renderItem={({item}) => (
            <View animation="pulse" easing="ease-out" key={item.id}>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                style={widgetStyles.btnStyle}
                onPress={() =>
                  dispatch(
                    getDesigner({
                      id: item.id,
                      searchParams: {user_id: item.id},
                      redirect: true,
                    }),
                  )
                }>
                <FastImage
                  source={{
                    uri: item.thumb,
                    priority: FastImage.priority.normal,
                  }}
                  loadingIndicatorSource={images.logo}
                  style={styles.image}
                  resizeMode="contain"
                />
                {showName ? (
                  <Text
                    style={[
                      widgetStyles.elementName,
                      {color: colors.header_tow_theme_color},
                    ]}>
                    {item.slug}
                  </Text>
                ) : null}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ExpoDesignerHorizontalWidget;

ExpoDesignerHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    // borderRadius: 80 / 2,
  },
});
