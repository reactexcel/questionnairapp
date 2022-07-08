import { combineReducers } from "redux";
import SaveInReducer from "./saveInReducer";
const rootReducer = combineReducers({
    SaveInReducer: SaveInReducer,
});

export default rootReducer;