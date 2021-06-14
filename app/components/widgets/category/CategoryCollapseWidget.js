import React, {Fragment, useContext} from 'react';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {map} from 'lodash';
import {text, touchOpacity} from '../../../constants/sizes';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchProducts} from '../../../redux/actions/product';
import {
  getSearchCompanies,
  getSearchDesigners,
} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CategoryCollapseWidget = ({
  category,
  type = 'product',
  collapsed = false,
}) => {
  const dispatch = useDispatch();
  const {country} = useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = c => {
    switch (type) {
      case 'product':
        return dispatch(
          getSearchProducts({
            name: c.name,
            searchParams: {product_category_id: c.id, country_id: country.id},
            redirect: true,
          }),
        );
        break;
      case 'user':
        dispatch(
          getSearchCompanies({
            name: c.name,
            searchParams: {user_category_id: c.id},
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  };
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
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={20}
                  color={colors.header_one_theme_color}
                  onPress={() => handleClick(category)}
                />
              </View>
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
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Text style={styles.categoryTitle}>
                                {child.name}
                              </Text>
                              <Icon
                                type="entypo"
                                name={
                                  isRTL
                                    ? 'chevron-thin-left'
                                    : 'chevron-thin-right'
                                }
                                size={20}
                                color={colors.header_one_theme_color}
                                onPress={() => handleClick(child)}
                              />
                            </View>
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
                                    onPress={() => handleClick(sub)}
                                    key={sub.id}>
                                    <ImageLoaderContainer
                                      style={{width: 45, height: 45}}
                                      img={sub.thumb}
                                      resizeMode="contain"
                                    />
                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}>
                                      <Text style={styles.categoryTitle}>
                                        {sub.name}
                                      </Text>
                                      <Icon
                                        type="entypo"
                                        name={
                                          isRTL
                                            ? 'chevron-thin-left'
                                            : 'chevron-thin-right'
                                        }
                                        size={20}
                                        color={colors.header_one_theme_color}
                                        onPress={() => handleClick(sub)}
                                      />
                                    </View>
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
                              onPress={() => handleClick(child)}>
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
                        onPress={() => handleClick(child)}>
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
          onPress={() => handleClick(category)}>
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

export default CategoryCollapseWidget;

CategoryCollapseWidget.propTypes = {
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
    color: 'black',
  },
});
