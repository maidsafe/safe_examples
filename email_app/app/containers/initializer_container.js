import { connect } from 'react-redux';
import Initializer from '../components/initializer';
import { setInitializerTask, authoriseApplication, getEmailIds,
          refreshConfig, refreshEmail } from '../actions/initializer_actions';

const mapStateToProps = state => {
  return {
    app_status: state.initializer.app_status,
    app: state.initializer.app,
    email_ids: state.initializer.email_ids,
    accounts: state.initializer.accounts,
    tasks: state.initializer.tasks,
    coreData: state.initializer.coreData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitializerTask: task => (dispatch(setInitializerTask(task))),
    authoriseApplication: () => (dispatch(authoriseApplication())),
    getEmailIds: () => (dispatch(getEmailIds())),
    refreshConfig: () => (dispatch(refreshConfig())),
    refreshEmail: (account) => (dispatch(refreshEmail(account)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
