const useRoleCheck = (userRole, roles) => {
  return roles.includes(userRole);
};

export default useRoleCheck