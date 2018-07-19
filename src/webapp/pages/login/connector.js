import { connect } from 'react-redux';
import { Login } from './login';
import { fetchUserDataRequest } from 'actions';

const mapDispatchToProps = {
  fetchUserData: fetchUserDataRequest
};

export default connect(null, mapDispatchToProps)(Login);
