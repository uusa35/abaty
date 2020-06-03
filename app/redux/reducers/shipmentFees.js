import {SET_SHIPMENT_FEES, GET_SHIPMENT_FEES} from '../actions/types';

export default function (shipmentFees = 0, action) {
  switch (action.type) {
    case SET_SHIPMENT_FEES:
      return action.payload;
    case GET_SHIPMENT_FEES:
      return action.payload;
    default:
      return shipmentFees;
  }
}
