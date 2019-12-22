import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import {text, width} from '../../constants';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import {map} from 'lodash';
import ClassifiedWidget from '../../components/widgets/classified/ClassifiedWidget';

const ProfileClassifiedIndexScreen = ({elements, searchParams}) => {
  const [currentElements, setCurrentElements] = useState(elements);

  useMemo(() => {
    if (validate.isEmpty(currentElements)) {
      setCurrentElements(elements);
    } else {
      if (elements.length !== currentElements.length) {
        setCurrentElements(elements);
      }
    }
  }, [currentElements, elements]);

  return (
    <ScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 150}}>
      {!validate.isEmpty(currentElements) ? (
        map(currentElements, (c, i) => (
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
    elements: state.classifieds,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(ProfileClassifiedIndexScreen);

ProfileClassifiedIndexScreen.propTypes = {
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
