import { createAction } from "redux-actions";
import * as actions from "../constant";

export const SaveInRequest = createAction(actions.SAVE_IN_REQUEST);
export const SaveInSuccess = createAction(actions.SAVE_IN_SUCCESS);
export const SaveInError = createAction(actions.SAVE_IN_ERROR);