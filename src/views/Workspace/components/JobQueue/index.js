import React, {
	Component
} from 'react';

import {
	Container
} from 'reactstrap';
import {
	connect
} from 'react-redux';
import mapDispatchToProps from './mapDispatchToProps';
import mapStateToProps from './mapStateToProps';

class JobQueue extends Component {
	render() {
		return (
			<Container fluid>
			</Container>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(JobQueue);