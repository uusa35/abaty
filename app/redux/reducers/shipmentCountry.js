import {SET_SHIPMENT_COUNTRY} from '../actions/types';

export default function (
  shipmentCountry = {id: 1, currency: {currency_symbol: 'KWD'}},
  action,
) {
  switch (action.type) {
    case SET_SHIPMENT_COUNTRY:
      return action.payload;
    default:
      return shipmentCountry;
  }
}
