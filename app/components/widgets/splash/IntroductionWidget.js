import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from './SplashWidget';
import {height, text} from './../../../constants/sizes';
import {toggleIntroduction} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import I18n from './../../../I18n';

const IntroductionWidget = ({elements}) => {
  const dispatch = useDispatch();
  const {settings, showIntroduction} = useSelector(state => state);
  const [currentShowIntroduction, setCurrentShowIntroduction] = useState(false);

  const handleClick = () => {
    setCurrentShowIntroduction(false);
    dispatch(toggleIntroduction(false));
  };

  useEffect(() => {
    if (showIntroduction) {
      setCurrentShowIntroduction(true);
    }
  }, []);

  const renderItem = (item, index) => (
    <SplashWidget element={item} index={index} handleClick={handleClick} />
  );

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View style={{backgroundColor: 'white'}}>
          <Modal
            transparent={true}
            isVisible={currentShowIntroduction}
            animationIn="slideInUp"
            style={{flex: 1, margin: 0, backgroundColor: 'white'}}>
            <AppIntroSlider
              buttonStyle={{
                backgroundColor: settings.colors.btn_bg_theme_color,
                borderRadius: 10,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              keyExtractor={(elements, index) => index.toString()}
              showPrevButton={true}
              showDoneButton={true}
              showNextButton={true}
              showSkipButton={true}
              skipLabel={I18n.t('skip')}
              doneLabel={I18n.t('done')}
              nextLabel={I18n.t('next')}
              prevLabel={I18n.t('back')}
              activeDotStyle={{
                backgroundColor: settings.colors.btn_bg_theme_color,
                fontFamily: text.font,
              }}
              buttonTextStyle={{
                color: settings.colors.btn_bg_theme_color,
                fontFamily: text.font,
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: 18,
                padding: 8,
              }}
              renderItem={({item, index}) => renderItem(item, index)}
              data={elements}
              onDone={() => handleClick()}
              onSkip={() => handleClick()}
            />
          </Modal>
        </View>
      )}
    </Fragment>
  );
};

export default IntroductionWidget;

IntroductionWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
});
