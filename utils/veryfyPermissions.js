export const verifyPermissions = async (
  status,
  PermissionStatus,
  requestPermission,
  Alert,
  alertTitle,
  alertMessage
) => {
  if (status.status === PermissionStatus.DENIED) {
    return Alert.alert(alertTitle, alertMessage);
  }

  const permissionResponse = await requestPermission();
  return permissionResponse.granted; // true or false
};
