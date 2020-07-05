import React, {Fragment, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from './SplashWidget';
import {height, text} from './../../../constants/sizes';
import I18n from './../../../I18n';
import {toggleIntroduction} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const IntroductionWidget = ({elements}) => {
  const dispatch = useDispatch();
  const {settings, showIntroduction} = useSelector((state) => state);

  const handleClick = () => {
    dispatch(toggleIntroduction(false));
  };

  useEffect(() => {
    if (showIntroduction) {
      setTimeout(() => {
        dispatch(toggleIntroduction(false));
      }, 12000);
    }
  }, []);

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View style={{backgroundColor: 'white'}}>
          <Modal
            transparent={false}
            visible={showIntroduction}
            animationIn="slideInUp"
            animationOut="slideOutDown">
            <View style={{flex: 1}}>
              <AppIntroSlider
                buttonStyle={{
                  backgroundColor: settings.colors.btn_bg_theme_color,
                  borderRadius: 10,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                keyExtractor={(elements, index) => index.toString()}
                showSkipButton={true}
                showPrevButton={true}
                showDoneButton={true}
                skipLabel={I18n.t('skip')}
                doneLabel={I18n.t('done')}
                nextLabel={I18n.t('next')}
                prevLabel={I18n.t('back')}
                activeDotStyle={{
                  backgroundColor: settings.colors.btn_bg_theme_color,
                }}
                buttonTextStyle={{
                  fontFamily: text.font,
                  color: settings.colors.btn_text_theme_color,
                }}
                renderItem={({item, index}) => (
                  <SplashWidget
                    element={item}
                    index={index}
                    handleClick={handleClick}
                  />
                )}
                data={elements}
                onDone={() => handleClick()}
              />
            </View>
          </Modal>
        </View>
      )}
    </Fragment>
  );
};

export default React.memo(IntroductionWidget);

IntroductionWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
});
