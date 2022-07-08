import * as actions from "../constant";

const initialState={
    isLoading:false,
    isSavedIn:false,
};
export const SaveInReducer =(state=initialState,action)=>{
    // console.log(action,"ccccccccc")
    switch(action.type){
        case actions.SAVE_IN_REQUEST:
            return{
                ...state,
                result: action.payload
            }
            default:
                return state;
    }
}
export default SaveInReducer;