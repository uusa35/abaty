import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import {text, width} from '../../constants';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';

const FavoriteClassifiedIndexScreen = ({
  classifiedFavorites,
  searchParams,
  dispatch,
  colors,
  navigation
}) => {
  return (
    <View>
      {!validate.isEmpty(classifiedFavorites) ? (
        <ClassifiedList
          classifieds={classifiedFavorites}
          dispatch={dispatch}
          colors={colors}
          showName={true}
          showSearch={false}
          title={I18n.t('wishlist')}
          showTitle={false}
          showMore={false}
          showFooter={false}
          searchElements={searchParams}
        />
      ) : (
        <View
          style={{
            marginTop: 300,
            width: width - 50,
            alignSelf: 'center'
          }}>
          <Button
            raised
            title={I18n.t('no_classifieds')}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{fontFamily: text.font}}
          />
          <Button
            onPress={() => navigation.navigate('Home')}
            raised
            title={I18n.t('shop_now')}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{
              fontFamily: text.font,
              color: colors.main_text_theme_color
            }}
            col
          />
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    classifiedFavorites: state.classifiedFavorites,
    searchParams: state.searchParams,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(FavoriteClassifiedIndexScreen);

FavoriteClassifiedIndexScreen.propTypes = {
  classifiedFavorites: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
