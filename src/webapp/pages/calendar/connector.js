import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Calendar } from './calendar';
import { 
  deleteTask,
  fetchUserDataByIdRequest
 } from 'actions';
import { splitTasks } from 'helpers/modify-tasks';

const tasksSelector = ({ userData: { tasks } }) => {
  const splittedTasks = splitTasks(tasks);

  return {
    amTasks: splittedTasks.am,
    pmTasks: splittedTasks.pm
  };
};

const mapStateToProps = store => ({
  ...tasksSelector(store),
  userName: store.userData.name,
  userId: store.userData.id
});

const mapDispatchToProps = {
  deleteTask,
  fetchUserDataById: fetchUserDataByIdRequest,
  navigateToLoginPage: () => push('/login')
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
