const initialState = {
  info: [],
  errors: [],
};

export const createInfo = (info) => {
  return {
    type: "ADD_INFO",
    info,
  };
};

export const createError = (error) => {
  return {
    type: "ADD_ERROR",
    error,
  };
};

const getId = () => Math.floor(Math.random() * 100000);

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INFO":
      return {
        ...state,
        info: state.info.concat({
          content: action.info,
          id: `info-${getId()}`,
        }),
      };
    case "ADD_ERROR":
      console.log(action);
      return {
        ...state,
        errors: state.errors.concat({
          content: action.error,
          id: `error-${getId()}`,
        }),
      };
    case "REMOVE_NOTI":
      return {
        ...state,
        info: state.info.filter(
          (notification) => notification.id !== action.id
        ),
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        errors: state.errors.filter(
          (notification) => notification.id !== action.id
        ),
      };
    case "RESET_NOTIFICATIONS":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
