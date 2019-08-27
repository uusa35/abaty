import React, {useState, useMemo} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import CategoryWidget from '../widgets/category/CategoryWidget';
import {refetchHomeCategories} from '../../redux/actions';
import {map} from 'lodash';
import {text} from './../../constants';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';

const CategoriesList = ({elements, columns, dispatch, colors}) => {
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
        style={[
          styles.wrapper,
          {flexDirection: columns ? 'column' : 'column'}
        ]}>
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
  colors: PropTypes.object.isRequired,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  wrapper: {
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
});
