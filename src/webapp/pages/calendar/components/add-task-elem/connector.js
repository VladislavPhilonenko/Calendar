import { connect } from 'react-redux';
import { AddTaskElem } from './add-task-elem';
import { addTask } from 'actions';

const mapStateToProps = store => ({
  userId: store.userData.id
})

const mapDispatchToProps = {
  addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskElem);