import React, {useMemo, useState} from 'react';
import {Icon} from 'react-native-elements';
import {toggleProductFavorite} from '../../../redux/actions/product';
import {useDispatch, useSelector} from 'react-redux';
import {iconSizes} from '../../../constants/sizes';
import {filter, isEmpty} from 'lodash';
import PropTypes from 'prop-types';

const FavoriteIcon = ({id, size = iconSizes.small}) => {
  const {productFavorites, guest, token, settings} = useSelector(
    (state) => state,
  );
  const [favorite, setFavorite] = useState(guest);
  const dispatch = useDispatch();

  useMemo(() => {
    const result = filter(productFavorites, (p) => p.id === id);
    setFavorite(isEmpty(result));
  }, []);

  useMemo(() => {
    const result = filter(productFavorites, (p) => p.id === id);
    setFavorite(!isEmpty(result));
  }, [productFavorites]);

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    dispatch(
      toggleProductFavorite({
        api_token: token,
        product_id: id,
      }),
    );
  };

  return (
    <Icon
      onPress={() => {
        handleToggleFavorite();
      }}
      name={favorite ? 'heart' : 'hearto'}
      type="antdesign"
      size={size}
      underlayColor="transparent"
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      color={favorite ? 'red' : settings.colors.icon_theme_color}
    />
  );
};

export default React.memo(FavoriteIcon);

FavoriteIcon.propTypes = {
  id: PropTypes.number.isRequired,
};
