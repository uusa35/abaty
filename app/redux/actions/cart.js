import * as actions from './types';

export function storeOrderCashOnDelivery(payload) {
  return {
    type: actions.CASH_ON_DELIVERY,
    payload,
  };
}

export function storeOrderMyFatoorah(payload) {
  return {
    type: actions.CREATE_MYFATOORAH_PAYMENT_URL,
    payload,
  };
}

export function storeOrderTap(payload) {
  return {
    type: actions.CREATE_TAP_PAYMENT_URL,
    payload,
  };
}

export function addToCart(payload) {
  return {
    type: actions.ADD_TO_CART,
    payload,
  };
}

export function submitCart(payload) {
  return {
    type: actions.SUBMIT_CART,
    payload,
  };
}
export function filterCart(payload) {
  return {
    type: actions.FILTER_CART,
    payload,
  };
}

export function clearCart() {
  return {
    type: actions.DO_CLEAR_CART_PROCESS,
  };
}

export function setItem(payload) {
  return {
    type: actions.SET_ITEM,
    payload,
  };
}

export function removeItem(payload) {
  return {
    type: actions.REMOVE_FROM_CART,
    payload,
  };
}

export function getCoupon(payload) {
  return {
    type: actions.GET_COUPON,
    payload,
  };
}

export function removeCoupon() {
  return {
    type: actions.REMOVE_COUPON,
  };
}

export function setShipmentFees(payload) {
  return {
    type: actions.SET_SHIPMENT_FEES,
    payload,
  };
}
