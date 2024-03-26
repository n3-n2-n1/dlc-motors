
import UserList from "../../components/UserList/UserList";
import PageTitle from "../../components/PageTitle/PageTitle";
const Users = () => {
  return (
    <>
    <PageTitle title="DLC Motors • Usuarios" />
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm transition-colors duration-300">
        <div className="flex-grow overflow-hidden h-full flex flex-col transition-colors duration-300">
          <div className="flex-grow flex overflow-x-hidden transition-colors duration-300">
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
