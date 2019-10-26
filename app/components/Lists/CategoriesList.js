import React, {useState, useMemo, useContext} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import CategoryWidget from '../widgets/category/CategoryWidget';
import {refetchHomeCategories} from '../../redux/actions';
import {map} from 'lodash';
import {text} from './../../constants';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../redux/DispatchContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const CategoriesList = ({elements, columns}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  const [refresh, setRefresh] = useState(false);
  useMemo(() => {
    if (refresh) {
      dispatch(refetchHomeCategories());
      return setRefresh(false);
    }
  }, [refresh]);

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
              dispatch={dispatch}
              colors={colors}
            />
          ))
        ) : (
          <Button
            titleStyle={{fontFamily: text.font}}
            containerStyle={{paddingTop: '10%'}}
            buttonStyle={{alignItems: 'baseline', backgroundColor: 'red'}}
            title={I18n.t('no_categories')}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CategoriesList;

CategoriesList.propTypes = {
  elements: PropTypes.array.isRequired,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  wrapper: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
    // width: '100%'
  }
});
