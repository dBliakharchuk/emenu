import { WriteTo } from 'protractor/built/logger';

const initialState = {
  curMenuPosition: 0,
  curCategoryPosition: 0
};

export type NewState = typeof initialState;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'POSITION_MENU':
      return Object.assign({}, state, {
        curMenuPosition: state.curMenuPosition
      });
    case 'POSITION_CATEGORY':
      return Object.assign({}, state, {
        curMenuPosition: state.curCategoryPosition
      });
    default:
      return state;
  }
};
