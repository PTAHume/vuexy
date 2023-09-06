// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import { authSlice } from "./authentication"
import { adminSlice } from "../views/pages/admin/admin-management/store/adminSlice"
import { dealSlice } from "../views/pages/admin/deals-management/store/dealSlice"
import { userSlice } from "../views/pages/admin/user-management/store/userSlice"
import { dealsSlice } from "@src/views/pages/front/add-deal/store"
import { editDealsSlice } from "@src/views/pages/front/my-deals/store"
import { offersSlice } from '@src/views/pages/front/offers/store'
import FrontAuthentication from "../views/pages/front/authentication/store/FrontAuthentication"
import { appChatSlice } from "../views/pages/front/chat/store"


const rootReducer = {
  navbar,
  layout,
  authentication: authSlice.reducer,
  frontauthentication: FrontAuthentication, // Change the key here
  adminData: adminSlice.reducer,
  dealData: dealSlice.reducer,
  userData: userSlice.reducer,
  useDealData: dealsSlice.reducer,
  useEditDealData: editDealsSlice.reducer,
  ecommerce: offersSlice.reducer, //
  chatData: appChatSlice.reducer
}

export default rootReducer
