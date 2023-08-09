import "@styles/react/libs/spinner/spinner.scss";
import { useSelector } from 'react-redux';
import AdminEditContainer from './AdminEditContainer';
import FetchAdminData from './data/FetchAdminData';

const EditAdmin = () => {
  //get all data saved in redux
  const admin = useSelector((state) => state.adminData);

  //loading while fetching a data
  const loading = admin.loading;

  return (
    <div>
      <FetchAdminData dataVersion={admin.version} redux={admin} />
      {loading ? (
        <div id='loading-overlay' style={{ display:  'flex'}}>
          <div className='loader'></div>
        </div>
      ) : (
        <AdminEditContainer dataVersion={admin.version} redux={admin} />
      )}
    </div>
  );
};

export default EditAdmin;
