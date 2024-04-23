const useRoleCheck = (userRole, roles) => {
  console.log(userRole);
  return roles.includes(userRole);
};

export default useRoleCheck