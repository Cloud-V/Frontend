import React, {
	Component
} from 'react';

import {
	Field,
	reduxForm
} from 'redux-form/immutable';
import {
	Form,
	Input,
} from 'reactstrap';

const validate = values => {
	const errors = {};
	return errors;
};

class RenderField extends Component {
	render() {
		const {
			input,
			type,
			placeholder,
			autoComplete,
			tabIndex
		} = this.props;

		return (<Input {...input} type={type} tabIndex={tabIndex} autoComplete={autoComplete || ''} placeholder={placeholder || ''} />);
	}
}
class SearchForm extends Component {
	constructor(props) {
		super(props);
		if (this.props.defaultValue) {
			this.props.initialize({
				q: this.props.defaultValue
			});
		}
	}
	render() {
		const {
			handleSubmit,
			// submitting
		} = this.props;

		return (
			<Form className={`search-box ${this.props.className || ''}`} onSubmit={handleSubmit}>
				<Field
					name="q"
					type="search"
					component={RenderField}
					placeholder={this.props.placeholder || 'Search for…'}
					autoComplete="search"
				/>
			</Form>
		);
	};
}

export default reduxForm({
	form: 'searchForm',
	validate,
})(SearchForm);