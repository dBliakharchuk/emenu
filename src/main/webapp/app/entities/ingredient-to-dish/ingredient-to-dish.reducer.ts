import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIngredientToDish, defaultValue } from 'app/shared/model/ingredient-to-dish.model';

export const ACTION_TYPES = {
  FETCH_INGREDIENTTODISH_LIST: 'ingredientToDish/FETCH_INGREDIENTTODISH_LIST',
  FETCH_INGREDIENTTODISH: 'ingredientToDish/FETCH_INGREDIENTTODISH',
  CREATE_INGREDIENTTODISH: 'ingredientToDish/CREATE_INGREDIENTTODISH',
  UPDATE_INGREDIENTTODISH: 'ingredientToDish/UPDATE_INGREDIENTTODISH',
  DELETE_INGREDIENTTODISH: 'ingredientToDish/DELETE_INGREDIENTTODISH',
  RESET: 'ingredientToDish/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIngredientToDish>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IngredientToDishState = Readonly<typeof initialState>;

// Reducer

export default (state: IngredientToDishState = initialState, action): IngredientToDishState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INGREDIENTTODISH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INGREDIENTTODISH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INGREDIENTTODISH):
    case REQUEST(ACTION_TYPES.UPDATE_INGREDIENTTODISH):
    case REQUEST(ACTION_TYPES.DELETE_INGREDIENTTODISH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INGREDIENTTODISH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INGREDIENTTODISH):
    case FAILURE(ACTION_TYPES.CREATE_INGREDIENTTODISH):
    case FAILURE(ACTION_TYPES.UPDATE_INGREDIENTTODISH):
    case FAILURE(ACTION_TYPES.DELETE_INGREDIENTTODISH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INGREDIENTTODISH_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INGREDIENTTODISH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INGREDIENTTODISH):
    case SUCCESS(ACTION_TYPES.UPDATE_INGREDIENTTODISH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INGREDIENTTODISH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/ingredient-to-dishes';

// Actions

export const getEntities: ICrudGetAllAction<IIngredientToDish> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_INGREDIENTTODISH_LIST,
    payload: axios.get<IIngredientToDish>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IIngredientToDish> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INGREDIENTTODISH,
    payload: axios.get<IIngredientToDish>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIngredientToDish> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INGREDIENTTODISH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IIngredientToDish> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INGREDIENTTODISH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIngredientToDish> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INGREDIENTTODISH,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
