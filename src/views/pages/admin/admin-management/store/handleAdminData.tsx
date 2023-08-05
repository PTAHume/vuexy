// In your actions file
export const fetchAdminDataStart = () => ({
  type: 'FETCH_ADMIN_DATA_START'
});

export const fetchAdminDataSuccess = (adminData) => ({
  type: 'FETCH_ADMIN_DATA_SUCCESS',
  payload: adminData
});