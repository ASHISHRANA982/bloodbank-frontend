
import { configureStore } from "@reduxjs/toolkit";
import matchedReducer from "./userRedux/matchedSlice";
import  searchBloodReducer  from "./homeRedux/searchBloodSlice";
import loginReducer from "./donorRedux/donorLoginSlice"
import forgetPasswordReducer from "./donorRedux/forgotPasswordSlice"
import profileReducer from "./donorRedux/profileSlice"
import bloodBankReducer from  "./bloodbankRedux/bloodBankSlice"
import bloodBankLoginReducer from "./bloodbankRedux/bloodBankLogin"
import bloodBankForgetReducer from "./bloodbankRedux/forgetPasswordSlice"
import BloodbankProfileReducer from "./bloodbankRedux/bloodBankProfileSlice"
import StockFacilityReducer from "./bloodbankRedux/stockFacilitySlice"


export const store = configureStore({
  reducer: {
    matched: matchedReducer,
    searchBlood: searchBloodReducer,
    auth:loginReducer,
    forgotPassword:forgetPasswordReducer,
    profile:profileReducer,
    bloodBank:bloodBankReducer,
    bloodBankLogin:bloodBankLoginReducer,
    bloodBankForget:bloodBankForgetReducer,
    bloodBankProfile:BloodbankProfileReducer,
    stockFacility:StockFacilityReducer,
  },
});
