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
  // #################### MISC API CALL'S #####################################
  baseurl() {
    //this is for the urls where we cant come here to sanctum DONT CONFUSE with baseUrl in config
    return this.sanctumConfig.baseUrl.replace(/\s/g, "")
  }

  clearStorageAndRedirect(config) {
    localStorage.removeItem("userData") //  we delete admin localstorage
    localStorage.removeItem("frontUserData") // we delete front user details
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
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

  setToken(value) {
    localStorage.setItem(this.sanctumConfig.storageTokenKeyName, value)
  }

  refreshToken() {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.refreshToken}`,
      {
        refreshToken: this.getRefreshToken()
      }
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

  setRefreshToken(value) {
    localStorage.setItem(this.sanctumConfig.storageRefreshTokenKeyName, value)
  }

  register(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.registerEndpoint}`,
      ...args
    )
  }

  // #################### ADMINISTRATOR API CALL'S #####################################
  updateAdminDetails(data = null, id = null, socketId = null, channelName = null) {
    if (data) {
      return axios.post(
        `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminDetails
        }/${data.get("id")}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
    }
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminDetails}/${id}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  // ##  GETS ##
  getAdminData(id = null) {
    let url = `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAdminData}`
    if (id) {
      url += `/${id}`
    }
    return axios.get(url)
  }

  async getAdminDealData(id = null, page = null, perPage = null, search = null) {
    if (id) {
      return axios.get(
        `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAdminDealData}/${id}`
      )
    }
    page = page || 0
    perPage = perPage || 5
    search = search || ''
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAdminDealData}?page=${page}&perPage=${perPage}&search=${search}`
    )
  }

  async getAdminAllData() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAdminAllData}`
    )
  }

  getAdminUserData(id = null) {
    let url = `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getAdminUserData}`
    if (id) {
      url += `/${id}`
    }
    return axios.get(url)
  }

  logoutAdmin() {
    try {
      localStorage.removeItem("userData")
      localStorage.removeItem(this.sanctumConfig.storageTokenKeyName)
      localStorage.removeItem(this.sanctumConfig.storageRefreshTokenKeyName)
      axios.post(
        `${this.sanctumConfig.baseUrl}${this.sanctumConfig.logoutAdmin}`)
    } catch (error) {
      console.error(error)
    }
  }

  loginAdmin(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.loginAdmin}`,
      ...args
    )
  }

  async updateAdminStatus(adminId, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminStatus}/${adminId}`,
      { status }
    )
    return response.data
  }

  updateAdminDealDetails(data, id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminDealDetails}/${id}`,
      data
    )
  }

  async updateAdminDealStatus(adminId, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminDealStatus}/${adminId}`,
      { status }
    )
    return response.data
  }

  updateUserDealDetails(data, id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserDealDetails}/${id}`,
      data
    )
  }

  updateAdminUserDetails(data) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateAdminUserDetails
      }/${data.get("id")}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  deleteAdminDeal(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteAdminDeal}/${id}`
    )
  }

  deleteAdmin(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteAdmin}/${id}`
    )
  }

  deleteAdminUser(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteAdminUser}/${id}`
    )
  }

  subscribeToAdminList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeToAdminList}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  subscribeToAdminDealsList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeToAdminDealsList}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  subscribeToAdminUserList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeToAdminUserList}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  async getUserListUserDeals(id = null, page = null, perPage = null, search = null) {
    if (id) {
      return axios.get(
        `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserListUserDeals}/${id}`
      )
    }
    page = page || 0
    perPage = perPage || 5
    search = search || ''
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserListUserDeals}?page=${page}&perPage=${perPage}&search=${search}`
    )
  }

  getUserData(id) {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserData}/${id}`
    )
  }

  async updateUserDealStatus(id, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserDealStatus}/${id}`,
      { status }
    )
    return response.data
  }

  async updateUserStatus(id, status) {
    // we can use async and await here.
    const response = await axios.put(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserStatus}${id}`,
      { status }
    )
    return response.data
  }

  getUserCountries() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserCountries}`
    )
  }

  getUserAirports() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserAirports}`
    )
  }

  async getUserAllData() {
    return axios.get(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserAllData}`
    )
  }

  getUserFrontOffersData({
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
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserFrontOffersData}`,
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

  async getUserFrontSidebarData(
    searchQuery,
    searchField,
    departure_country_id,
    departure_city_id,
    arrival_country_id,
    arrival_city_id,
    arrival_airport_id // Add this parameter
  ) {
    return axios.get(`${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserFrontSidebarData}`, {
      params: {
        searchQuery,
        searchField,
        departure_country_id,
        departure_city_id,
        arrival_country_id,
        arrival_city_id,
        arrival_airport_id // Add this parameter
      }
    })
  }

  getUserDataForChat(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserDataForChat}/${id}}`
    )
  }

  getUserChatContacts() {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserChatContacts}`
    )
  }

  getUserChat(uniqueId) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserChat}/${uniqueId}`
    )
  }

  getUserMoreMsgs(chat_id, lastMsgId) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.getUserMoreMsgs}/${chat_id}/${lastMsgId}`
    )
  }

  updateUserDetails(data) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.updateUserDetails
      }/${data.get("id")}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }

  loginUser(...args) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.loginUser}`,
      ...args
    )
  }

  async setUserOnlineStatus(id, status) {
    const response = await axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.setUserOnlineStatus}/${id}`,
      { status }
    )
    return response
  }

  logoutUser() {
    try {
      localStorage.removeItem("frontUserData")
      localStorage.removeItem(this.sanctumConfig.storageTokenKeyName)
      localStorage.removeItem(this.sanctumConfig.storageRefreshTokenKeyName)
      axios.post(
        `${this.sanctumConfig.baseUrl}${this.sanctumConfig.logoutUser}`)
    } catch (error) {
      console.log(error)
    }
  }

  addUserNewDeal(data) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.addUserNewDeal}`,
      data
    )
  }

  sendUserMsg(obj) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.sendUserMsg}`,
      obj
    )
  }

  subscribeToUserChatsList(socketId, channelName) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.subscribeToUserChatsList}`,
      {
        socket_id: socketId,
        channel_name: channelName
      }
    )
  }

  deleteUserDeal(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteUserDeal}/${id}`
    )
  }

  deleteUserAccount(id) {
    return axios.post(
      `${this.sanctumConfig.baseUrl}${this.sanctumConfig.deleteUserAccount}/${id}`
    )
  }
}