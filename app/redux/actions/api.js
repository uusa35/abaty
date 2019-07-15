import axios from 'axios';
import {links} from './../../constants';
import {createTransform} from 'redux-persist';
import I18n from 'react-native-i18n';

export const axiosInstance = axios.create({
  baseURL: links.apiUrl
});

console.log('LINK', links.apiUrl);
console.log('API HEADERS', axiosInstance.defaults.headers);

export function getLangForHeader() {
  return I18n.locale;
}

export async function getSettings() {
  return await axiosInstance
    .get('setting')
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeCategories() {
  return await axiosInstance
    .get(`category`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeBrands() {
  return await axiosInstance
    .get(`brand`, {params: {on_home: 1}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getSplashes() {
  return await axiosInstance
    .get(`slide`, {params: {is_intro: 1}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeDesigners() {
  return await axiosInstance
    .get(`user`, {params: {on_home: 1, type: 'is_designer'}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeCelebrities() {
  return await axiosInstance
    .get(`user`, {params: {on_home: 1, type: 'is_celebrity'}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getUsers(searchElements) {
  console.log('the searchElements form getUser Api', searchElements);
  return await axiosInstance
    .get(`user`, {params: searchElements})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getCommercials() {
  return await axiosInstance
    .get(`commercial`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getSlides(elements) {
  return await axiosInstance
    .get(`slide`, {params: elements})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getProducts(page = 1) {
  return await axiosInstance
    .get(`product`, {params: {page}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getProductCart(params) {
  return await axiosInstance
    .get(`cart/items`, {params})
    // .then(r => console.log('r data', r.data))
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getProduct(params) {
  const {id, api_token} = params;
  console.log('the id', id);
  console.log('the api_token', api_token);
  return await axiosInstance
    .get(`product/${id}`, {params})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getSearchProducts(elements) {
  console.log('the elements', elements);
  return await axiosInstance
    .get(`search/product`, {params: elements})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getBrand(id) {
  return await axiosInstance
    .get(`brand/${id}`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeProducts() {
  return await axiosInstance
    .get(`product`, {params: {on_home: true}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getCountries() {
  return await axiosInstance
    .get(`country`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getUser(id) {
  return await axiosInstance
    .get(`user/${id}`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getCountry(country_id?) {
  return await axiosInstance
    .get(`country/ip`, {params: {country_id}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function storePlayerId(player_id) {
  return await axiosInstance
    .post(`device`, {player_id})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

// Transform how the persistor reads the network state
export const networkTransform = createTransform(
  (inboundState, key) => {
    const actionQueue = [];

    inboundState.actionQueue.forEach(action => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return {
      ...inboundState,
      actionQueue
    };
  },
  (outboundState, key) => {
    const actionQueue = [];

    outboundState.actionQueue.forEach(action => {
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
  {whitelist: ['network']}
);

export async function authenticated(api_token) {
  return await axiosInstance
    .get(`authenticate`, {params: {api_token}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function authenticate(elements) {
  const {email, password, player_id} = elements;
  return await axiosInstance
    .post('authenticate', {
      email,
      password,
      player_id
    })
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getCoupon(elements) {
  const {code} = elements;
  return await axiosInstance
    .get(`coupon/${code}`, {params: elements})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function makeMyFatoorahPayment(params) {
  console.log('the makepayment', params);
  return await axiosInstance
    .post(`myfatoorah/payment`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function makeTapPayment(params) {
  console.log('the makepayment', params);
  return await axiosInstance
    .post(`tap/payment`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function register(params) {
  console.log('headers', axiosInstance.defaults.headers);
  return await axiosInstance
    .post(`register`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function updateUser(params) {
  console.log('params from inside updateUser');
  const {id} = params;
  return await axiosInstance
    .post(`user/${id}`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getFavorites(params) {
  return await axiosInstance
    .get(`favorite`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function toggleFavorite(params) {
  return await axiosInstance
    .post(`favorite`, params)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}
