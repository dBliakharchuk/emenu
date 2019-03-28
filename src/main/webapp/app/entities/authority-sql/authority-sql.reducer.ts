import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAuthoritySql, defaultValue } from 'app/shared/model/authority-sql.model';

export const ACTION_TYPES = {
  FETCH_AUTHORITYSQL_LIST: 'authoritySql/FETCH_AUTHORITYSQL_LIST',
  FETCH_AUTHORITYSQL: 'authoritySql/FETCH_AUTHORITYSQL',
  CREATE_AUTHORITYSQL: 'authoritySql/CREATE_AUTHORITYSQL',
  UPDATE_AUTHORITYSQL: 'authoritySql/UPDATE_AUTHORITYSQL',
  DELETE_AUTHORITYSQL: 'authoritySql/DELETE_AUTHORITYSQL',
  RESET: 'authoritySql/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAuthoritySql>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AuthoritySqlState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthoritySqlState = initialState, action): AuthoritySqlState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AUTHORITYSQL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUTHORITYSQL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AUTHORITYSQL):
    case REQUEST(ACTION_TYPES.UPDATE_AUTHORITYSQL):
    case REQUEST(ACTION_TYPES.DELETE_AUTHORITYSQL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AUTHORITYSQL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUTHORITYSQL):
    case FAILURE(ACTION_TYPES.CREATE_AUTHORITYSQL):
    case FAILURE(ACTION_TYPES.UPDATE_AUTHORITYSQL):
    case FAILURE(ACTION_TYPES.DELETE_AUTHORITYSQL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTHORITYSQL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTHORITYSQL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUTHORITYSQL):
    case SUCCESS(ACTION_TYPES.UPDATE_AUTHORITYSQL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUTHORITYSQL):
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

const apiUrl = 'api/authority-sqls';

// Actions

export const getEntities: ICrudGetAllAction<IAuthoritySql> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AUTHORITYSQL_LIST,
  payload: axios.get<IAuthoritySql>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAuthoritySql> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUTHORITYSQL,
    payload: axios.get<IAuthoritySql>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAuthoritySql> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUTHORITYSQL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAuthoritySql> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUTHORITYSQL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAuthoritySql> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUTHORITYSQL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
