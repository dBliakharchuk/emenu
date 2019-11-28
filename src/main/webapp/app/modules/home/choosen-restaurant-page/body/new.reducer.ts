const initialState = {
  curMenuPosition: 0,
  curCategoryPosition: 0
};

export type NewState = typeof initialState;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POSITION_MENU':
      return {...state, curMenuPosition: state.curMenuPosition};
    case 'POSITION_CATEGORY':
      return {...state, curMenuPosition: state.curCategoryPosition};
    default:
      return state;
  }
};
