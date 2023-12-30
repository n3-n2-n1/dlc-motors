
import UserList from "../../components/UserList/UserList";

const Users = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
