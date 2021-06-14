import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {width, text, rightHorizontalContentInset} from '../../constants/sizes';
import {isIOS} from '../../constants';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
import {hideProductFilter, setColor, setSize} from '../../redux/actions';
import I18n from './../../I18n';
import ProductFilterColorsWidget from '../../components/widgets/product/ProductFilterColorsWidget';
import {map} from 'lodash';
import {getSearchProducts} from '../../redux/actions/product';
import {setCategory} from '../../redux/actions/category';
import ProductFilterSizesWidget from '../../components/widgets/product/ProductFilterSizesWidget';
import {ABATI, EXPO} from './../../../app';
import ProductFilterHeightsWidget from '../../components/widgets/product/ProductFilterHeightsWidget';
import ModalBackContainer from '../../components/containers/ModalBackContainer';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';

const ProductFilterModal = () => {
  const {
    productColors,
    sizes,
    color,
    size,
    productFilterModal,
    settings,
    categories,
    country,
    searchParams,
  } = useSelector(state => state);
  const {product_category_id} = searchParams;
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [visible, setVisible] = useState(productFilterModal);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleSubmitFilter = () => {
    dispatch(
      getSearchProducts({
        searchParams: {
          product_category_id: selectedCategory
            ? selectedCategory.id
            : product_category_id
            ? product_category_id
            : null,
          min,
          max,
          color_id: color ? color.id : null,
          size_id: size ? size.id : null,
          country_id: country.id,
          // area_id: currentArea.id,
        },
        redirect: true,
        name: selectedCategory
          ? selectedCategory.name
          : I18n.t('search_results'),
      }),
    );
  };

  const handleClearFilter = () => {
    dispatch(setColor(null));
    dispatch(setSize(null));
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
  };

  useEffect(() => {
    selectedCategory ? dispatch(setCategory(selectedCategory)) : null;
  }, [selectedCategory]);

  useMemo(() => {
    setMin(priceRange[0]);
    setMax(priceRange[1]);
  }, [priceRange]);

  const handleHideModal = () => {
    dispatch(hideProductFilter());
  };

  useEffect(() => {
    setSelectedCategory({id: searchParams.product_category_id});
  }, [searchParams.product_category_id]);

  return (
    <ModalBackContainer
      toggleVisible={productFilterModal.showModal}
      setToggleVisible={handleHideModal}
      title={I18n.t('product_filter')}>
      <ProductSearchForm showBtn={true} />
      {categories ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 10,
            borderColor: 'lightgrey',
            marginBottom: 10,
            marginTop: 20,
            width: '100%',
          }}>
          <Text style={{fontFamily: text.font, fontSize: text.medium}}>
            {I18n.t('categories')}
          </Text>

          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentInset={{right: rightHorizontalContentInset}}
            style={{minHeight: 80, width: '100%'}}
            contentContainerStyle={{alignItems: 'center'}}>
            {map(categories, (c, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedCategory(c)}
                style={[
                  styles.btnStyle,
                  {
                    minWidth: 120,
                    borderColor:
                      selectedCategory && selectedCategory.id === c.id
                        ? settings.colors.btn_bg_theme_color
                        : 'lightgrey',
                  },
                ]}>
                <Text style={styles.btnTitle}>{c.name.substring(0, 50)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}

      {productFilterModal.showColor && (
        <ProductFilterColorsWidget
          elements={productColors}
          colors={settings.colors}
          color={color}
        />
      )}

      {productFilterModal.showSize && (
        <ProductFilterSizesWidget
          elements={sizes}
          colors={settings.colors}
          size={size}
        />
      )}
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 20,
          marginTop: 5,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'lightgrey',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            color: settings.colors.main_theme_color,
          }}>
          {I18n.t('choose_price_range')}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            width: '100%',
          }}>
          <MultiSlider
            allowOverlap
            snapped
            min={min}
            max={max}
            step={10}
            values={priceRange}
            sliderLength={width - 90}
            // onValuesChangeStart={() => console.log('started')}
            onValuesChange={e => setPriceRange(e)}
            // onValuesChangeFinish={() => console.log('end')}
            style={{alignSelf: 'center'}}
            selectedStyle={{
              backgroundColor: settings.colors.btn_bg_theme_color,
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
            containerStyle={{
              height: 40,
            }}
            trackStyle={{
              height: isIOS ? 10 : 2,
              backgroundColor: 'green',
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            color: settings.colors.main_theme_color,
          }}>
          {I18n.t('price')} : {priceRange[0]} - {priceRange[1]}
        </Text>
      </View>

      <View
        style={{
          position: 'relative',
          bottom: -50,
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <DesigneratBtn
          handleClick={() => handleSubmitFilter()}
          title={I18n.t('apply_filter')}
        />
        <Button
          onPress={() => handleClearFilter()}
          raised
          containerStyle={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: 50,
            marginTop: 10,
          }}
          buttonStyle={{backgroundColor: 'red', height: 50}}
          title={I18n.t('remove_filter')}
          titleStyle={{
            fontFamily: text.font,
            color: settings.colors.btn_text_theme_color,
          }}
        />
      </View>
    </ModalBackContainer>
  );
};

export default React.memo(ProductFilterModal);

ProductFilterModal.propTypes = {};

const styles = StyleSheet.create({
  btnStyle: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 3,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 1,
  },
  btnTitle: {
    fontSize: text.small,
    fontFamily: text.font,
    color: 'black',
    textAlign: 'center',
  },
});
