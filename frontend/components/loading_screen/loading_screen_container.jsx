import { connect } from 'react-redux';
import LoadingScreen from './loading_screen';

const mapStateToProps = ({ loading }) => {
  return {
    loading : loading.loading
  }
};

export default connect(
  mapStateToProps,
  null
)(LoadingScreen);
