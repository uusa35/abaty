import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import CategoryWidget from '../widgets/category/CategoryWidget';
import {refetchHomeElements} from '../../redux/actions';
import {map} from 'lodash';
import {text} from './../../constants/sizes';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchProducts} from '../../redux/actions/product';
import {setCategoryAndGoToNavChildren} from '../../redux/actions/category';
import {getSearchClassifieds} from '../../redux/actions/classified';

const CategoriesList = ({elements, columns, type, showBtn = false}) => {
  const {country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      dispatch(refetchHomeElements());
      return setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {}, [elements]);

  const handleClick = useCallback((c) => {
    switch (type) {
      case 'product':
        dispatch(
          getSearchProducts({
            name: c.name,
            searchParams: {product_category_id: c.id, country_id: country.id},
            redirect: true,
          }),
        );
        break;
      case 'company':
        dispatch(setCategoryAndGoToNavChildren(c));
        break;
      case 'classified':
        dispatch(
          getSearchClassifieds({
            name: c.name,
            searchParams: {
              classified_category_id: element.id,
              country_id: country.id,
            },
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={false}
      scrollEnabled={true}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 300}}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }>
      <View
        style={[styles.wrapper, {flexDirection: columns ? 'row' : 'column'}]}>
        {!validate.isEmpty(elements) ? (
          map(elements, (c, i) => (
            <CategoryWidget
              handleClick={handleClick}
              element={c}
              key={i}
              columns={columns}
              type={type}
              showBtn={showBtn}
            />
          ))
        ) : (
          <Button
            titleStyle={{fontFamily: text.font}}
            containerStyle={{paddingTop: '10%'}}
            buttonStyle={{alignItems: 'baseline', backgroundColor: 'red'}}
            title={I18n.t('no_categories')}
            onPress={() => goBack()}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CategoriesList;

CategoriesList.propTypes = {
  elements: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  columns: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // width: '100%'
  },
});
