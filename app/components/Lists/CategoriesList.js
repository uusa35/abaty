import React, {useContext, useState, useMemo} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import CategoryWidget from '../widgets/CategoryWidget';
import {refetchHomeCategories} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {map} from 'lodash';
import {height, text} from './../../constants';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';

const CategoriesList = ({elements, columns}) => {
  const [refresh, setRefresh] = useState(false);
  const {dispatch} = useContext(DispatchContext);

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
      contentInset={{bottom: 200}}
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
            <CategoryWidget category={c} key={i} columns={columns} />
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

export default React.memo(CategoriesList);

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
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
});
