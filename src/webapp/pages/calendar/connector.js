import { connect } from 'react-redux';
import { Calendar } from './calendar';
import { deleteTask } from 'actions';
import { splitTasks } from 'helpers/modify-tasks';

const mapStateToProps = store => ({
  amTasks: splitTasks(store.userData.tasks).am,
  pmTasks: splitTasks(store.userData.tasks).pm,
  userName: store.userData.name,
  userId: store.userData.id
})

const mapDispatchToProps = {
  deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);