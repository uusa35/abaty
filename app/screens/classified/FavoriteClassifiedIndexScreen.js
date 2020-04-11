import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import {map} from 'lodash';
import ClassifiedWidget from '../../components/widgets/classified/ClassifiedWidget';

const FavoriteClassifiedIndexScreen = ({favorites}) => {
  const [currentFavorites, setCurrentFavorites] = useState(favorites);

  useMemo(() => {
    if (validate.isEmpty(currentFavorites)) {
      setCurrentFavorites(favorites);
    } else {
      if (favorites.length !== currentFavorites.length) {
        setCurrentFavorites(favorites);
      }
    }
  }, [currentFavorites, favorites]);

  return (
    <ScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        padding: 10,
      }}
      contentInset={{bottom: 150}}>
      {!validate.isEmpty(currentFavorites) ? (
        map(currentFavorites, (c, i) => (
          <ClassifiedWidget element={c} showName={true} key={i} />
        ))
      ) : (
        <View
          style={{
            marginTop: 300,
            width: width - 50,
            alignSelf: 'center',
          }}>
          <Button
            raised
            title={I18n.t('no_classifieds')}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{fontFamily: text.font}}
          />
          {/*<Button*/}
          {/*  onPress={() => { navigation.goBack()}}*/}
          {/*  raised*/}
          {/*  title={I18n.t('shop_now')}*/}
          {/*  type="outline"*/}
          {/*  containerStyle={{marginBottom: 20}}*/}
          {/*  titleStyle={{*/}
          {/*    fontFamily: text.font,*/}
          {/*    color: colors.main_text_theme_color,*/}
          {/*  }}*/}
          {/*  col*/}
          {/*/>*/}
        </View>
      )}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    favorites: state.classifiedFavorites,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(FavoriteClassifiedIndexScreen);

FavoriteClassifiedIndexScreen.propTypes = {
  favorites: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
