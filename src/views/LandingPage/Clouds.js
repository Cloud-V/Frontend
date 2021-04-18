import React, {
	Component
} from 'react';

class Clouds extends Component {
	render() {
		return (
			<div data-depth={this.props.dataDepth} style={this.props.style || {}} className={`d-sm-down-none cloud ${this.props.className || ''}`}>
				<span className={`cloud-circle cloud-circle-1 ${this.props.innerClassName || ''}`}></span>
				<span className={`d-md-down-none cloud-circle cloud-circle-2 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-3 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-4 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-5 ${this.props.innerClassName || ''}`}></span>
				<span className={`d-md-down-none cloud-circle cloud-circle-6 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-7 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-8 ${this.props.innerClassName || ''}`}></span>
				<span className={`cloud-circle cloud-circle-9 ${this.props.innerClassName || ''}`}></span>
			</div>
		);
	}
}

export default Clouds;