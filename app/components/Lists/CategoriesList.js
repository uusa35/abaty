import React, {useState, useMemo, useContext, useEffect} from 'react';
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
import {useDispatch} from 'react-redux';

const CategoriesList = ({elements, columns, type, showBtn = false}) => {
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const [refresh, setRefresh] = useState(false);
  useMemo(() => {
    if (refresh) {
      dispatch(refetchHomeElements());
      return setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {}, [elements]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={false}
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
