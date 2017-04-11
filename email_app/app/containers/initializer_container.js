import { connect } from 'react-redux';
import Initializer from '../components/initializer';
import { setInitializerTask, authoriseApplication,
          refreshConfig, refreshEmail } from '../actions/initializer_actions';

const mapStateToProps = state => {
  return {
    auth_status: state.initializer.auth_status,
    app: state.initializer.app,
    accounts: state.initializer.accounts,
    tasks: state.initializer.tasks,
    config: state.initializer.config,
    coreData: state.initializer.coreData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitializerTask: task => (dispatch(setInitializerTask(task))),
    authoriseApplication: (appInfo, permissions, opts) =>
                    (dispatch(authoriseApplication(appInfo, permissions, opts))),
    refreshConfig: () => (dispatch(refreshConfig())),
    refreshEmail: (account) => (dispatch(refreshEmail(account)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
