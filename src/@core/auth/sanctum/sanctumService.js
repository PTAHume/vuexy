import axios from "axios"
import sanctumDefaultConfig from "./sanctumDefaultConfig"
import getCsrfToken from "@src/auth/sanctum/csrf"

export default class sanctumService {
  sanctumConfig = { ...sanctumDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(sanctumOverrideConfig) {
    this.sanctumConfig = { ...this.sanctumConfig, ...sanctumOverrideConfig }
    axios.defaults.withCredentials = true // add this line
    axios.defaults.headers.post["Accept"] = "application/json"
    axios.defaults.headers.post["Content-Type"] = "application/json"

    if (!sanctumService.interceptorsSetup) {
      this.setupAxiosInterceptors()
      sanctumService.interceptorsSetup = true
    }
  }

  // REMOVE all and forward to Login Page
  clearStorageAndRedirect(config) {
    localStorage.removeItem("userData") //  we delete admin localstorage
    localStorage.removeItem("frontUserData") // we delete front user details
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
    //window.location.href = "/admin/login"
    window.location.href = "/login"
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      async (config) => {
        try {
          const token = await getCsrfToken()

          if (!config.headers.common) config.headers.common = {}
          config.headers.common["X-XSRF-TOKEN"] = token
          //console.log(config.headers.common['X-CSRF-TOKEN'])
          if (!config.headers.Authorization) {
            config.headers.Authorization = {}
          }
          const accessToken = this.getToken()
          if (accessToken) {
            config.headers.Authorization = `${this.sanctumConfig.tokenType
              } ${accessToken.replace(/"/g, "")}`
          }
          return config
        } catch (error) {
          return Promise.reject(error)
        }
      },
      (error) => Promise.reject(error)
    )

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error
        const originalRequest = config

        // Check if the request has already been retried
        if (config._retry) {
          return Promise.reject(error)
        }

        if (response && (response.status === 401 || response.status === 419)) {
          console.log("before isAlreadyFetchingAccessToken")
          // Handle 401 error: Invalid access token
          if (!this.isAlreadyFetchingAccessToken) {
            console.log("after isAlreadyFetchingAccessToken")
            this.isAlreadyFetchingAccessToken = true

            //in 401 (invalid access token we try to refresh token)
            this.refreshToken()
              .then((r) => {
                console.log("resreshToken inside")
                this.isAlreadyFetchingAccessToken = false
                this.setToken(r.data.accessToken)
                this.setRefreshToken(r.data.refreshToken)
                this.onAccessTokenFetched(r.data.accessToken)
              })
              .catch((error) => {
                console.log('refreshToken error:', error)
                // if refreshToken request fails due to non-existing token in DB (at all) or
                if (error.response && (error.response.status === 401)) { //experimental 419
                  console.log(error)
                  console.log("before clearStorageAndRedirect")
                  this.clearStorageAndRedirect(config)
                }
              })

            // Mark the request as retried
            config._retry = true

            return new Promise((resolve) => {
              this.addSubscriber((accessToken) => {
                originalRequest.headers.Authorization = `${this.sanctumConfig.tokenType} ${accessToken}`
                resolve(axios(originalRequest))
              })
            })
          }
        }

        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken)
    )
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.sanctumConfig.storageTokenKeyName)
  }

  authorizaRequest(id, socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.pusherAuth}${id}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  getAdminData(id) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getadmindata}${id}`
    )
  }

  getRefreshToken() {
    const refreshToken = localStorage.getItem(
      this.sanctumConfig.storageRefreshTokenKeyName
    )
    const accessToken = this.getToken()

    // If both refreshToken and accessToken are missing, or refreshToken is missing
    if ((!refreshToken && !accessToken) || !refreshToken) {
      localStorage.removeItem("userData")
      localStorage.removeItem(this.sanctumConfig.storageTokenKeyName)
      localStorage.removeItem(this.sanctumConfig.storageRefreshTokenKeyName)
      return // Return undefined when no valid refresh token is found
    }

    // Return refreshToken without surrounding quotes
    return refreshToken.replace(/"/g, "")
  }

  adminLogout() {
    const refreshToken = this.getRefreshToken()
    const accessToken = this.getToken()

    // If refresh token is not present, remove the local storage items and resolve the promise with an error
    if (!refreshToken && !accessToken) {
      localStorage.removeItem("userData")
      localStorage.removeItem(this.sanctumConfig.storageTokenKeyName)
      localStorage.removeItem(this.sanctumConfig.storageRefreshTokenKeyName)
      return Promise.resolve({
        data: { code: "no_refresh_token", message: "Refresh token not found." }
      })
    }

    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.logoutEndpoint}`
    )
  }

  setToken(value) {
    localStorage.setItem(this.sanctumConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.sanctumConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.loginEndpoint}`,
      ...args
    )
  }

  register(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.registerEndpoint}`,
      ...args
    )
  }

  refreshToken() {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.refreshEndpoint}`,
      {
        refreshToken: this.getRefreshToken()
      }
    )
  }

  getData() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getData}`
    )
  }

  //status change in admins list page
  async updateAdminStatus(adminId, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminStatus}${adminId}`,
      { status }
    )
    return response.data
  }

  baseurl() {
    //this is for the urls where we cant come here to sanctum DONT CONFUSE with baseUrl in config
    return this.sanctumConfig.baseUrl.replace(/\s/g, "")
  }

  //*****************ADMIN MANAGEMENT  ************************************/
  //when you press submit in admin editing page
  updateAdmin(data) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminDetail
      }${data.get("id")}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  deleteAdmin(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteAdmin}${id}`
    )
  }

  ///**********************************WEBSOCKET *********************/
  //websocket update admin list
  subscribeToAdminsList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeAdminLists}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  //***********************DEALS **************************************/
  //websocket update deal list
  subscribeToDealsList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeDealLists}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  deleteDeal(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteDeal}${id}`
    )
  }

  //when you press submit in deal editing page
  updateDeal(data, id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateDealDetail}${id}`,
      data
    )
  }

  async getDealsData(page, perPage, search) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getDealsData}?page=${page}&perPage=${perPage}&search=${search}`
    )
  }


  //status change in deals list page
  async updateDealStatus(adminId, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateDealStatus}${adminId}`,
      { status }
    )
    return response.data
  }

  getDealData(id) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getdealdata}${id}`
    )
  }

  getcountries() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getcountries}`
    )
  }

  getcities() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getcities}`
    )
  }

  getairports() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getairports}`
    )
  }

  async getAllData() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAllData}`
    )
  }

  //*************USERS */
  //when you press submit in admin editing page
  updateUser(data) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserDetail
      }${data.get("id")}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  deleteUser(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteUser}${id}`
    )
  }

  getAllUserData() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAllUserData}`
    )
  }


  getuserData(id) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserData}${id}}`
    )
  }


  //websocket update user list
  subscribeToUsersList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeUserLists}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }


  async updateUserStatus(userId, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserStatus}${userId}`,
      { status }
    )
    return response.data
  }


  //############################## FRONTEND INTERFACE ##########################/
  frontLogin(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.frontLogin}`,
      ...args
    )
  }

  async setOnlineStatus(id, status) {
    const response = await axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.setOnlineStatus}${id}`,
      { status }
    )
    return response
  }

  frontLogout() {
    const refreshToken = this.getRefreshToken()
    const accessToken = this.getToken()

    // If refresh token is not present, remove the local storage items and resolve the promise with an error
    if (!refreshToken && !accessToken) {
      localStorage.removeItem("frontUserData")
      localStorage.removeItem(this.sanctumConfig.storageTokenKeyName)
      localStorage.removeItem(this.sanctumConfig.storageRefreshTokenKeyName)
      return Promise.resolve({
        data: { code: "no_refresh_token", message: "Refresh token not found." }
      })
    }

    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.frontLogout}`
    )
  }

  getFrontOffersData({
    page,
    per_page,
    sortBy,
    q,
    minPrice,
    maxPrice,
    delivery_type,
    departure_date,
    arrival_date,
    arrival_airport,
    arrival_city,
    arrival_country,
    departure_airport,
    departure_city,
    departure_country,
    weight
  }) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getFrontOffersData}`,
      {
        params: {
          page,
          per_page,
          sortBy,
          q,
          minPrice,
          maxPrice,
          delivery_type,
          departure_date,
          arrival_date,
          arrival_airport,
          arrival_city,
          arrival_country,
          departure_airport,
          departure_city,
          departure_country,
          weight
        }
      }
    )
  }

  async getFrontSidebarData(
    searchQuery,
    searchField,
    departure_country_id,
    departure_city_id,
    arrival_country_id,
    arrival_city_id,
    // departure_city,
    // arrival_country,
    // arrival_city,
    // departure_airport,
    // arrival_airport,
    arrival_airport_id // Add this parameter
  ) {
    return axios.get(`${this.sanctumConfig.baseUrl}${this.sanctumConfig.getFrontSidebarData}`, {
      params: {
        searchQuery,
        searchField,
        departure_country_id,
        departure_city_id,
        arrival_country_id,
        arrival_city_id,
        // departure_city,
        // arrival_country,
        // arrival_city,
        // departure_airport,
        // arrival_airport,
        arrival_airport_id // Add this parameter
      }
    })
  }

  getUserDataForChat(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserDataForChat}${id}}`
    )
  }

  getChatContacts() {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getChatContacts}`
    )
  }

  getChat(uniqueId) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getChat}${uniqueId}`
    )
  }

  getMoreMsgs(chat_id, lastMsgId) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getMoreMsgs}${chat_id}/${lastMsgId}`
    )
  }

  sendMsg(obj) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.sendMsg}`,
      obj
    )
  }

  //websocket update admin list
  subscribeToChatsList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeChatLists}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }
}