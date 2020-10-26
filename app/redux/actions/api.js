import axios from 'axios';
import {links} from './../../constants/links';
import {createTransform} from 'redux-persist';
import {
  checkImage,
  getImageExtension,
  getImageName,
  getImagePath,
  getImageUri,
} from '../../helpers';
import {map, filter} from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import {isIOS} from '../../constants';

export const axiosInstance = axios.create({
  baseURL: links.apiUrl,
});

if (__DEV__) {
  // console.log('link', links.apiUrl);
}

export async function getSettings() {
  return await axiosInstance
    .get('setting')
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getHomeCategories(params) {
  return await axiosInstance
    .get(`category`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getHomeBrands() {
  return await axiosInstance
    .get(`brand`, {params: {on_home: 1}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getSplashes() {
  return await axiosInstance
    .get(`slide`, {params: {is_intro: 1}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getUsers(params) {
  return await axiosInstance
    .get(`search/user`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCommercials() {
  return await axiosInstance
    .get(`commercial`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getSlides(elements) {
  return await axiosInstance
    .get(`slide`, {params: elements})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getProducts(params) {
  return await axiosInstance
    .get(`product`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getServices(params) {
  return await axiosInstance
    .get(`service`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getPages() {
  return await axiosInstance
    .get(`page`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getTags() {
  return await axiosInstance
    .get(`tag`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getClassified(params) {
  const {id} = params;
  return await axiosInstance
    .get(`classified/${id}`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function deleteClassified(params) {
  const {id, api_token} = params;
  return await axiosInstance
    .delete(`classified/${id}`, {data: {id, api_token}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getSearchClassifieds(params) {
  return await axiosInstance
    .get(`search/classified`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getIndexVideo() {
  return await axiosInstance
    .get(`video`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getProductCart(params) {
  return await axiosInstance
    .get(`cart/items`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getProduct(params) {
  const {id} = params;
  return await axiosInstance
    .get(`product/${id}`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getService(params) {
  const {id} = params;
  return await axiosInstance
    .get(`service/${id}`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getSearchProducts(params) {
  return await axiosInstance
    .get(`search/product`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getSearchServices(params) {
  return await axiosInstance
    .get(`search/service`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getHomeProducts(params) {
  return await axiosInstance
    .get(`product`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getHomeCollections(params) {
  return await axiosInstance
    .get(`collection`, {params})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCollections() {
  return await axiosInstance
    .get(`collection`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCollection(id) {
  return await axiosInstance
    .get(`collection/${id}`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCountries() {
  return await axiosInstance
    .get(`country`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getUser(id) {
  return await axiosInstance
    .get(`user/${id}`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getVideo(id) {
  return await axiosInstance
    .get(`video/${id}`)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCountry(country_id?) {
  return await axiosInstance
    .get(`country/ip`, {params: {country_id}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function storePlayerId(player_id) {
  return await axiosInstance
    .post(`device`, {player_id})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

// Transform how the persistor reads the network state
export const networkTransform = createTransform(
  (inboundState, key) => {
    const actionQueue = [];

    inboundState.actionQueue.forEach((action) => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args,
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return {
      ...inboundState,
      actionQueue,
    };
  },
  (outboundState, key) => {
    const actionQueue = [];

    outboundState.actionQueue.forEach((action) => {
      if (action.function) {
        const actionFunction = actions[action.function];
        actionQueue.push(actionFunction(...action.args));
      } else {
        actionQueue.push(action);
      }
    });

    return {...outboundState, actionQueue};
  },
  // The 'network' key may change depending on what you
  // named your network reducer.
  {whitelist: ['isConnected']},
);

export async function checkConnectionStatus() {
  return await NetInfo.fetch()
    .then((state) => state.isConnected)
    .catch((e) => e);
}

export async function authenticated(api_token) {
  return await axiosInstance
    .post(`authenticate`, {params: {api_token}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function reAuthenticate(api_token) {
  return await axiosInstance
    .post(`reauthenticate`, {params: {api_token}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function authenticate(elements) {
  const {email, password, player_id} = elements;
  return await axiosInstance
    .post('authenticate', {
      email,
      password,
      player_id,
    })
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function googleAuthenticate(action) {
  const {name, email} = action;
  return await axiosInstance
    .get(`google/authenticate`, {params: {name, email}})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getCoupon(elements) {
  const {code} = elements;
  return await axiosInstance
    .get(`coupon/${code}`, {params: elements})
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function makeMyFatoorahPayment(params) {
  return await axiosInstance
    .post(`myfatoorah/payment`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function makeTapPayment(params) {
  // console.log('params', params);
  return await axiosInstance
    .post(`tap/payment`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function makeCashOnDeliveryPayment(params) {
  return await axiosInstance
    .post(`order`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function register(params) {
  return await axiosInstance
    .post(`register`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function updateUser(params) {
  const {
    id,
    name,
    email,
    image,
    api_token,
    mobile,
    address,
    description,
    notes,
    country_id,
  } = params;
  const formData = new FormData();
  if (checkImage(image)) {
    formData.append('image', {
      uri: getImagePath(image),
      name: getImageName(image),
      type: getImageExtension(image),
    });
  }
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('address', address);
  formData.append('country_id', country_id);
  formData.append('mobile', mobile);
  formData.append('description', description);
  formData.append('notes', notes);
  formData.append('api_token', api_token);
  formData.append('_method', 'put');
  return await axiosInstance
    .post(`user/${params.id}`, formData)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function companyRegister(params) {
  const {
    name,
    email,
    image,
    images,
    password,
    role_id,
    mobile,
    address,
    description,
    country_id,
    player_id,
  } = params;
  const formData = new FormData();
  if (checkImage(image)) {
    formData.append('image', {
      uri: getImagePath(image),
      name: getImageName(image),
      type: getImageExtension(image),
    });
  }
  const filteredImages = filter(images, (img, i) => img.path !== image.path);
  map(filteredImages, (img, i) => {
    if (checkImage(img)) {
      formData.append(`images[${i}]`, {
        uri: getImagePath(img),
        name: getImageName(img),
        type: getImageExtension(img),
      });
    }
  });
  formData.append('name', name);
  formData.append('password', password);
  formData.append('slug_ar', name);
  formData.append('slug_en', name);
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('role_id', role_id);
  formData.append('player_id', player_id);
  formData.append('address', address);
  formData.append('country_id', country_id);
  formData.append('description', description);
  return await axiosInstance
    .post(`register`, formData)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function storeClassified(elements) {
  const {
    name,
    api_token,
    mobile,
    user_id,
    description,
    area_id,
    address,
    longitude,
    latitude,
    country_id,
    category_id,
    price,
    image,
    images,
    only_whatsapp,
    classifiedProps,
  } = elements;
  const formData = new FormData();
  if (checkImage(image)) {
    formData.append('image', {
      uri: getImagePath(image),
      name: getImageName(image),
      type: getImageExtension(image),
    });
  }
  const filteredImages = filter(images, (img, i) => img.path !== image.path);
  map(filteredImages, (img, i) => {
    if (checkImage(img)) {
      formData.append(`images[${i}]`, {
        uri: getImagePath(img),
        name: getImageName(img),
        type: getImageExtension(img),
      });
    }
  });
  formData.append('name_ar', name);
  formData.append('name_en', name);
  formData.append('mobile', mobile);
  formData.append('address', address);
  formData.append('longitude', longitude);
  formData.append('latitude', latitude);
  formData.append('user_id', user_id);
  formData.append('country_id', country_id);
  formData.append('category_id', category_id);
  formData.append('only_whatsapp', only_whatsapp);
  if (area_id) {
    formData.append('area_id', area_id);
  }
  formData.append('mobile', mobile);
  formData.append('description_ar', description);
  formData.append('description_en', description);
  formData.append('price', price);
  formData.append('api_token', api_token);
  map(classifiedProps, (prop, i) => {
    formData.append(`items[${i}][category_group_id]`, prop.category_group.id);
    formData.append(`items[${i}][property_id]`, prop.property.id);
    formData.append(`items[${i}][value]`, prop.property.value);
  });
  // if (__DEV__) {
  //   console.log('the formData', formData);
  // }
  return await axiosInstance
    .post(`classified`, formData)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function updateClassified({elements, id}) {
  const {
    name,
    api_token,
    mobile,
    user_id,
    description,
    area_id,
    address,
    longitude,
    latitude,
    country_id,
    category_id,
    price,
    image,
    images,
    only_whatsapp,
    classifiedProps,
  } = elements;
  const formData = new FormData();
  if (checkImage(image)) {
    formData.append('image', {
      uri: getImagePath(image),
      name: getImageName(image),
      type: getImageExtension(image),
    });
  }
  const filteredImages = filter(images, (img, i) => img.path !== image.path);
  map(filteredImages, (img, i) => {
    if (checkImage(img)) {
      formData.append(`images[${i}]`, {
        uri: getImagePath(img),
        name: getImageName(img),
        type: getImageExtension(img),
      });
    }
  });
  formData.append('name_ar', name);
  formData.append('name_en', name);
  formData.append('mobile', mobile);
  formData.append('address', address);
  formData.append('longitude', longitude);
  formData.append('latitude', latitude);
  formData.append('user_id', user_id);
  formData.append('country_id', country_id);
  formData.append('category_id', category_id);
  formData.append('only_whatsapp', only_whatsapp);
  if (area_id) {
    formData.append('area_id', area_id);
  }
  formData.append('mobile', mobile);
  formData.append('description_ar', description);
  formData.append('description_en', description);
  formData.append('price', price);
  formData.append('api_token', api_token);
  map(classifiedProps, (prop, i) => {
    formData.append(`items[${i}][category_group_id]`, prop.category_group.id);
    formData.append(`items[${i}][property_id]`, prop.property.id);
    formData.append(`items[${i}][value]`, prop.property.value);
  });
  formData.append('_method', 'put');
  return await axiosInstance
    .post(`classified/${id}`, formData)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function getFavorites(params) {
  return await axiosInstance
    .get(`favorite`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function toggleFavorite(params) {
  return await axiosInstance
    .post(`favorite`, params)
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
}

export async function rateUser(params) {
  return await axiosInstance
    .post(`rating`, params)
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}

export async function becomeFan(id) {
  return await axiosInstance
    .post(`fan`, {id})
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}

export async function addComment(params) {
  return await axiosInstance
    .post(`comment`, params)
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}

export async function getRoles() {
  return await axiosInstance
    .get(`role`)
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}

export async function getColors() {
  return await axiosInstance
    .get(`color`)
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}

export async function getSizes() {
  return await axiosInstance
    .get(`size`)
    .then((r) => r.data)
    .catch((e) => e.response.date.message);
}
