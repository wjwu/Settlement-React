import { action } from '../utils/common';

export const GET_SHEET = Symbol();
export const BEGIN_GET_SHEET = Symbol();
export const END_GET_SHEET = Symbol();
export const ERROR_GET_SHEET = Symbol();

export const QUERY_SHEETS = Symbol();
export const BEGIN_QUERY_SHEETS = Symbol();
export const END_QUERY_SHEETS = Symbol();
export const ERROR_QUERY_SHEETS = Symbol();

export const CREATE_SHEET = Symbol();
export const BEGIN_CREATE_SHEET = Symbol();
export const END_CREATE_SHEET = Symbol();
export const ERROR_CREATE_SHEET = Symbol();

export const UPDATE_SHEET = Symbol();
export const BEGIN_UPDATE_SHEET = Symbol();
export const END_UPDATE_SHEET = Symbol();
export const ERROR_UPDATE_SHEET = Symbol();

export const getSheet = (id) => action(GET_SHEET, { id });
export const beginGetSheet = () => action(BEGIN_GET_SHEET);
export const endGetSheet = (result) => action(END_GET_SHEET, { result });
export const errorGetSheet = () => action(ERROR_GET_SHEET);

export const querySheets = (request) => action(QUERY_SHEETS, { request });
export const beginQuerySheets = () => action(BEGIN_QUERY_SHEETS);
export const endQuerySheets = (result) => action(END_QUERY_SHEETS, { result });
export const errorQuerySheets = () => action(ERROR_QUERY_SHEETS);

export const createSheets = (request) => action(CREATE_SHEET, { request });
export const beginCreateSheets = () => action(BEGIN_CREATE_SHEET);
export const endCreateSheets = () => action(END_CREATE_SHEET);
export const errorCreateSheets = (result) => action(END_CREATE_SHEET, { result });

export const updateSheets = (request) => action(UPDATE_SHEET, { request });
export const beginUpdateSheets = () => action(BEGIN_UPDATE_SHEET);
export const endUpdateSheets = () => action(END_UPDATE_SHEET);
export const errorUpdateSheets = (result) => action(ERROR_UPDATE_SHEET, { result });