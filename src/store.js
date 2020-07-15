import { createStore } from "redux";

import notificatioReducer from "./reducers/notificationReducer";

const store = createStore(notificatioReducer);

export default store;
