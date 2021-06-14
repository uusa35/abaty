import React, {useContext} from 'react';
import {Linking, Pressable} from 'react-native';
import {width} from '../../../constants/sizes';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, getSearchProducts} from '../../../redux/actions/product';
import {getService} from '../../../redux/actions/service';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {getDesigner} from '../../../redux/actions/user';

const SlideWidget = ({slide}) => {
  const dispatch = useDispatch();
  const {token} = useContext(GlobalValuesContext);
  const {country} = useSelector(state => state);

  const handleClick = () => {
    if (!isNull(slide.module)) {
      switch (slide.module) {
        case 'product':
          return dispatch(
            getProduct({
              id: slide.product_id,
              api_token: token ? token : null,
              redirect: true,
            }),
          );
          break;
        case 'category':
          return dispatch(
            getSearchProducts({
              name: slide.title,
              searchParams: {
                product_category_id: slide.category_id,
                country_id: country.id,
              },
              redirect: true,
            }),
          );
          break;
        case 'service':
          return dispatch(
            getService({
              id: slide.service_id,
              api_token: token ? token : null,
              redirect: true,
            }),
          );
          break;
        case 'user':
          dispatch(
            getDesigner({
              id: slide.user_id,
              searchParams: {user_id: slide.user_id},
              redirect: true,
            }),
          );
          break;
        default:
          null;
      }
    } else {
      return Linking.openURL(
        !isNull(slide.path) ? slide.path : !isNull(slide.url) ? slide.url : '',
      );
    }
  };
  return (
    <Pressable key={slide.id} onPress={() => handleClick()}>
      <ImageLoaderContainer
        resizeMethod={'resize'}
        img={slide.large}
        style={{width, height: '100%'}}
        resizeMode="stretch"
      />
    </Pressable>
  );
};

export default SlideWidget;
