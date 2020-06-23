import React, {Fragment, useContext} from 'react';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {map} from 'lodash';
import {text, touchOpacity} from '../../../constants/sizes';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {startNewClassified} from '../../../redux/actions/classified';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch} from 'react-redux';

const ChooseCategoryItem = ({category}) => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      {!validate.isEmpty(category.children) && category.has_children ? (
        <Collapse key={category.id} style={{backgroundColor: 'white'}}>
          <CollapseHeader>
            <View style={styles.categoryItemWrapper}>
              <ImageLoaderContainer
                style={{width: 80, height: 80}}
                img={category.thumb}
                resizeMode="contain"
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
                            <ImageLoaderContainer
                              style={{width: 45, height: 45}}
                              img={child.thumb}
                              resizeMode="contain"
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
                                    activeOpacity={touchOpacity}
                                    style={[
                                      styles.categoryItemWrapper,
                                      {height: 50, paddingLeft: 130},
                                    ]}
                                    onPress={() =>
                                      dispatch(startNewClassified(sub))
                                    }
                                    key={sub.id}>
                                    <ImageLoaderContainer
                                      style={{width: 45, height: 45}}
                                      img={sub.thumb}
                                      resizeMode="contain"
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
                              activeOpacity={touchOpacity}
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
                              <ImageLoaderContainer
                                style={{width: 45, height: 45}}
                                img={child.thumb}
                                resizeMode="contain"
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
                        activeOpacity={touchOpacity}
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
                        <ImageLoaderContainer
                          style={{width: 45, height: 45}}
                          img={child.thumb}
                          resizeMode="contain"
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
          activeOpacity={touchOpacity}
          style={[styles.categoryItemWrapper, {height: 80}]}
          onPress={() =>
            dispatch({type: 'START_NEW_CLASSIFIED', payload: category})
          }>
          <ImageLoaderContainer
            style={{width: 80, height: 80}}
            img={category.thumb}
            resizeMode="contain"
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
    backgroundColor: 'white',
  },
  categoryTitle: {
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: text.font,
    textAlign: 'left',
    fontSize: text.medium,
  },
});
