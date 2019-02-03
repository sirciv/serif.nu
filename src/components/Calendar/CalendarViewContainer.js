import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { sectionsSelector } from 'selectors';
import CalendarView from './CalendarView';

/* istanbul ignore next */
const mapStateToProps = state => ({
  sections: sectionsSelector(state),
});

export default connect(mapStateToProps)(toJS(CalendarView));