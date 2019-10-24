import React, {useState, useMemo} from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {Modal, ScrollView} from 'react-native';
import {Button, Icon, Slider} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {useNavigation} from 'react-navigation-hooks';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {SafeAreaView} from 'react-navigation';
import {HIDE_SEARCH_MODAL} from '../../redux/actions/types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {width, text} from './../../constants';
import {map} from 'lodash';
import CategoryGroupWidgetQtyBtns from '../../components/widgets/search/CategoryGroupWidgetQtyBtns';
import {addToCart} from '../../redux/actions';

const ClassifiedFilterScreen = ({category, dispatch, searchModal, colors}) => {
  const [visible, setVisible] = useState(searchModal);
  const [requestQty, setRequestQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const {goBack} = useNavigation();

  useMemo(() => {
    if (!visible) {
      dispatch({type: HIDE_SEARCH_MODAL});
    }
  }, [visible]);

  return (
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={visible}
        animationType={'slide'}
        onRequestClose={() => dispatch({type: HIDE_SEARCH_MODAL})}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            marginTop: 40,
            flexDirection: 'row',
            width: '100%',
            padding: 10
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline'
              }}>
              <Icon
                name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                type="entypo"
                size={25}
                containerStyle={{padding: 0, margin: 0}}
                style={{zIndex: 999}}
                onPress={() => {
                  setVisible(false);
                  return goBack();
                }}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              />
              <ClassifiedSearchForm />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: 20,
                marginTop: 10
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.main_theme_color
                }}>
                {I18n.t('choose_price_range')}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 10,
                  width: '100%'
                }}>
                <MultiSlider
                  allowOverlap
                  snapped
                  min={100}
                  max={1000}
                  step={10}
                  values={priceRange}
                  sliderLength={width - 50}
                  onValuesChangeStart={() => console.log('started')}
                  onValuesChange={e => setPriceRange(e)}
                  onValuesChangeFinish={() => console.log('end')}
                  style={{alignSelf: 'center'}}
                  selectedStyle={{
                    backgroundColor: colors.btn_bg_theme_color
                  }}
                  unselectedStyle={{
                    backgroundColor: 'silver'
                  }}
                  containerStyle={{
                    height: 40
                  }}
                  trackStyle={{
                    height: 10,
                    backgroundColor: 'red'
                  }}
                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.main_theme_color
                }}>
                {I18n.t('price')} : {priceRange[0]} - {priceRange[1]}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingTop: 15
              }}>
              <Text
                style={{
                  width: '100%',
                  fontFamily: text.font,
                  fontSize: text.large,
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: colors.main_theme_color
                }}>
                {category.name}
              </Text>
              {map(category.categoryGroups, (g, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderWidth: 1
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 10
                    }}>
                    <Image
                      source={{uri: g.thumb}}
                      style={{
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: text.font,
                        fontSize: text.medium,
                        color: colors.main_theme_color
                      }}>
                      {g.name}
                    </Text>
                  </View>
                  <CategoryGroupWidgetQtyBtns
                    qty={10}
                    requestQty={requestQty}
                    setRequestQty={setRequestQty}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: '2.5%'
          }}>
          <Button
            onPress={() => console.log('filter')}
            raised
            containerStyle={{width: '95%', alignSelf: 'center'}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={I18n.t('apply_filter')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    searchModal: state.searchModal,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ClassifiedFilterScreen);
