import { RECEIVE_ORDER, RECEIVE_NAME, REMOVE_ORDER } from "../actions/order_actions";
import { merge } from 'lodash';

const orderReducer = (state = null, action) => {
  Object.freeze(state);
  let id = 1;
  let stateCopy = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ORDER:
        if (state) {
            if (stateCopy.currentOrderId) delete stateCopy.currentOrderId;
            id = Object.keys(stateCopy).length + 1;
        }
        action.order["orderId"] = id;
        return merge({}, state, { [id]: action.order, "currentOrderId": id } );
    case RECEIVE_NAME:
        id = action.id;
        let order = stateCopy[id];
        order["orderName"] = action.name;
        return merge({}, stateCopy);
    case REMOVE_ORDER:
        id = action.id;
        delete stateCopy[id];
        return merge({}, stateCopy);
    default:
        return state;
  }
};

export default orderReducer;
