export default {
  // #################### MISC API CALL'S #####################################
  baseUrl: 'https://api.dealmanager.co.uk/',
  tokenType: "Bearer",
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: 'refreshToken',
  registerEndpoint: "sanctum/register",
  refreshToken: "api/refreshToken",
  // #################### ADMINISTRATOR API CALL'S ############################
  // ##  MISC ##
  loginAdmin: "api/admin/loginAdmin",
  logoutAdmin: "api/admin/logoutAdmin",
  // ##  SETS ##
  setAdminOnlineStatus: "api/admin/setAdminOnlineStatus",
  // ## UPDATES ##
  updateAdminDetails: "api/admin/updateAdminDetails",
  updateAdminStatus: "api/admin/updateAdminStatus",
  updateAdminDealStatus: "api/admin/updateAdminDealStatus",
  updateAdminDealDetails: "api/admin/updateAdminDealDetails",
  updateAdminUserStatus: "api/admin/updateAdminUserStatus",
  updateAdminUserDetails: "api/admin/updateAdminUserDetails",
  // ##  SUBSCRIBERS ##
  subscribeToAdminDealsList: "api/admin/subscribeToAdminDealsList",
  subscribeToAdminUserList: "api/admin/subscribeToAdminUserList",
  subscribeToAdminList: "api/admin/subscribeToAdminList",
  // ##  DELETES ##
  deleteAdminDeal: "api/admin/deleteAdminDeal",
  deleteAdminUser: "api/admin/deleteAdminUser",
  deleteAdmin: "api/admin/deleteAdmin",
  // ##  GETS ##
  getAdminData: "api/admin/getAdminData",
  getAdminDealData: "api/admin/getAdminDealData",
  getAdminCountries: "api/admin/getAdminCountries",
  getAdminCities: "api/admin/getAdminCities",
  getAdminAirports: "api/admin/getAdminAirports",
  getAdminAllData: "api/admin/getAdminAllData",
  getAdminUserData: "api/admin/getAdminUserData",
  // #################### USER API CALL'S ####################################
  // ##  MISC ##
  sendUserMsg: "api/front/sendUserMsg",
  loginUser: "api/front/loginUser",
  logoutUser: "api/front/logoutUser",
  // ##  SETS ##
  setUserOnlineStatus: "api/front/setUserOnlineStatus",
  // ##  ADDS ##
  addUserNewDeal: "api/front/addUserNewDeal",
  // ##  DELETES ##
  deleteUserDeal: "api/front/deleteUserDeal",
  deleteUserAccount: "api/front/deleteUserAccount",
  // ##  UPDATES ##
  updateUserDealDetails: "api/front/updateUserDealDetails",
  updateUserDealStatus: "api/front/updateUserDealStatus",
  updateUserDetails: "api/front/updateUserDetails",
  updateUserStatus: "api/front/updateUserStatus",
  // ##  SUBSCRIBERS ##
  subscribeToUserChatsList: "api/front/subscribeToUserChatsList",
  // ##  GETS ##
  getUserData: "api/front/getUserData",
  getUserFrontOffersData: "api/front/getUserFrontOffersData",
  getUserFrontSidebarData: "api/front/getUserFrontSidebarData",
  getUserCountries: "api/front/getUserCountries",
  getUserDataForChat: "api/front/getUserDataForChat",
  getUserChatContacts: "api/front/getUserChatContacts",
  getUserChat: "api/front/getUserChat",
  getUserMoreMsgs: "api/front/getUserMoreMsgs",
  getUserListUserDeals: "api/front/getUserListUserDeals",
  getUserAllData: "api/front/getUserAllData",
  getTheUserChatContact: "api/front/getTheUserChatContact"
}