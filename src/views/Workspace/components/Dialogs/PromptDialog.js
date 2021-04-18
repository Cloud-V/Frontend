import React, {
	Component
} from 'react';

import {
	Button
} from 'reactstrap';

import BaseDialog from './BaseDialog';


class PromptDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: 'cancel'
		}
	}

	render() {
		return (
			<BaseDialog
				{...this.props}
				toggle={() => {
					this.setState({
						response: 'cancel'
					});
					this.props.toggle();
				}}
				title={this.props.title}
				onClosed={() => {
					if (this.props.callback) {
						return this.props.callback(this.state.response);
					}
				}}
				body={(<div>
					{this.props.body}
					<div className="w-100 d-flex justify-content-end align-items-center mt-2">
						{!this.props.hideNo && <Button type="submit" className="action-button pull-right mr-2" disabled={this.props.disabled} onClick={() => {
							this.setState({
								response: 'no'
							});
							this.props.toggle();
							
						}}>No</Button>}
						{!this.props.hideYes && <Button type="submit" className="action-button pull-right" disabled={this.props.disabled} onClick={() => {
							this.setState({
								response: 'yes'
							});
							this.props.toggle();
						}}>Yes</Button>}
					</div>
				</div>)}
			/>
		);
	}
}


export default PromptDialog;