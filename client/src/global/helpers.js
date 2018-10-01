export const checkIfUserIsLoggedIn = props => {
  if (!props.auth) {
    return props.history.push('/login/');
  }
};
export const checkIfUserConfigIsComplete = props => {
  if (!props.auth) return props.history.push('/login/');
  if (!props.auth.alias) return props.history.push('/account');
};
