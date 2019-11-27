import React, {Fragment, useContext} from 'react';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {map} from 'lodash';
import {text} from '../../../constants';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {startNewClassified} from '../../../redux/actions/classified';
import {DispatchContext} from '../../../redux/DispatchContext';

const ChooseCategoryItem = ({category}) => {
  const {dispatch} = useContext(DispatchContext);
  return (
    <Fragment>
      {!validate.isEmpty(category.children) && category.has_children ? (
        <Collapse key={category.id}>
          <CollapseHeader>
            <View style={styles.categoryItemWrapper}>
              <FastImage
                style={{width: 80, height: 80}}
                source={{uri: category.thumb}}
                resizeMode="cover"
              />
              <Text style={styles.categoryTitle}>{category.name}</Text>
            </View>
          </CollapseHeader>
          {!validate.isEmpty(category.children) && category.has_children ? (
            <CollapseBody>
              {map(category.children, (child, i) => {
                return (
                  <Fragment key={i}>
                    {!validate.isEmpty(child.children) && child.has_children ? (
                      <Collapse key={child.id}>
                        <CollapseHeader>
                          <View
                            style={[
                              styles.categoryItemWrapper,
                              {height: 50, paddingLeft: 80},
                            ]}>
                            <FastImage
                              style={{width: 50, height: 50}}
                              source={{uri: child.thumb}}
                              resizeMode="cover"
                            />
                            <Text style={styles.categoryTitle}>
                              {child.name}
                            </Text>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          {!validate.isEmpty(child.children) &&
                          child.has_children ? (
                            <Fragment>
                              {map(child.children, (sub, i) => {
                                return (
                                  <TouchableOpacity
                                    style={[
                                      styles.categoryItemWrapper,
                                      {height: 50, paddingLeft: 130},
                                    ]}
                                    onPress={() =>
                                      dispatch(startNewClassified(sub))
                                    }
                                    key={sub.id}>
                                    <FastImage
                                      style={{width: 50, height: 50}}
                                      source={{uri: sub.thumb}}
                                      resizeMode="cover"
                                    />
                                    <Text style={styles.categoryTitle}>
                                      {sub.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </Fragment>
                          ) : (
                            <TouchableOpacity
                              style={[
                                styles.categoryItemWrapper,
                                {height: 50, paddingLeft: 80},
                              ]}
                              onPress={() =>
                                dispatch({
                                  type: 'START_NEW_CLASSIFIED',
                                  payload: child,
                                })
                              }>
                              <FastImage
                                style={{width: 50, height: 50}}
                                source={{uri: child.thumb}}
                                resizeMode="cover"
                              />
                              <Text style={styles.categoryTitle}>
                                {child.name}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </CollapseBody>
                      </Collapse>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.categoryItemWrapper,
                          {height: 50, paddingLeft: 80},
                        ]}
                        onPress={() =>
                          dispatch({
                            type: 'START_NEW_CLASSIFIED',
                            payload: child,
                          })
                        }>
                        <FastImage
                          style={{width: 50, height: 50}}
                          source={{uri: child.thumb}}
                          resizeMode="cover"
                        />
                        <Text style={styles.categoryTitle}>{child.name}</Text>
                      </TouchableOpacity>
                    )}
                  </Fragment>
                );
              })}
            </CollapseBody>
          ) : null}
        </Collapse>
      ) : (
        <TouchableOpacity
          style={[styles.categoryItemWrapper, {height: 80}]}
          onPress={() =>
            dispatch({type: 'START_NEW_CLASSIFIED', payload: category})
          }>
          <FastImage
            style={{width: 80, height: 80}}
            source={{uri: category.thumb}}
            resizeMode="cover"
          />
          <Text style={styles.categoryTitle}>{category.name}</Text>
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default ChooseCategoryItem;

ChooseCategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  categoryItemWrapper: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    height: 80,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryTitle: {
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: text.font,
    textAlign: 'left',
    fontSize: text.medium,
  },
});
