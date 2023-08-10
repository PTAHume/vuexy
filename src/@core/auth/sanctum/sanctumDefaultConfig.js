// ** Auth Endpoints
export default {
  baseUrl: 'http://localhost/', // or your base URL
  loginEndpoint: "api/admin/login", 
  registerEndpoint: "sanctum/register",
  refreshEndpoint: "api/admin/refreshtoken",
  logoutEndpoint: "api/admin/logout", 

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: 'refreshToken',

  //########################ADMIN MANAGEMENT ############################/
  
  //when we press submit button
  updateAdminDetail : "api/admin/updateadmindetails/",
  deleteAdmin : "api/admin/deleteadmin/",
  setOnlineStatusForAdmin : "api/admin/setOnlineStatusForAdmin/",

  //*********************************WEBSOCKET *******************/
  subscribeAdminLists : "api/admin/subscribe-admin-list",
  pusherAuth: "api/admin/update-admin-details/",
  getData: "api/admin/getdata",
  updateAdminStatus :  "api/admin/updateadminstatus/",
  getadmindata : "api/admin/getdata/",


  //****************DEALS */************************ */
  subscribeDealLists : "api/admin/subscribe-deals-list",
  deleteDeal : "api/admin/deletedeal/",
  updateDealDetail : "api/admin/updatedealdetails/",
  getDealsData: "api/admin/getdealdata",
  updateDealStatus : "api/admin/updatedealstatus/",
  getdealdata :  "api/admin/getdealdata/",
  getcountries : "api/admin/getcountries",
  getcities :   "api/admin/getcities",
  getairports: "api/admin/getairports",
  getAllData : "api/admin/getAllData",



  //********************************USERS *******************/
  //when we press submit button
  updateUserDetail : "api/admin/updateuserdetails/",
  deleteUser : "api/admin/deleteuser/",

  //*********************************WEBSOCKET *******************/
  subscribeUserLists : "api/admin/subscribe-user-list",
  pusherUserAuth: "api/admin/update-user-details/",
  getUserData: "api/admin/getuserdata/",
  updateUserStatus :  "api/admin/updateuserstatus/",
  getAllUserData : "api/admin/getuserdata",
 

  //######################## FRONT end MANAGEMENT ############################/
  frontLogin: "api/front/login", 
  frontLogout: "api/front/logout", 
  getFrontOffersData : "api/front/getfrontoffersdata",
  getFrontSidebarData: "api/front/getFrontSidebarData",
  getCountries: "api/front/getCountries",
  setOnlineStatus : "api/front/setOnlineStatus/",
  getUserDataForChat : "api/front/getUserDataForChat/",
  getChatContacts : "api/front/getChatContacts",
  getChat : "api/front/getChat/",
  sendMsg : "api/front/sendMsg",
  getMoreMsgs: "api/front/getMoreMsgs/",

  subscribeChatLists : "api/front/subscribe-chat-list",
};
