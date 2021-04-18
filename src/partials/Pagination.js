import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import MediaQuery from 'react-responsive';


class Pagination extends Component {
	constructor(props) {
		super(props);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.state = {
			offset: 0,
		};
	}
	handlePageClick(data) {
		const selected = data.selected;
		const offset = Math.ceil(selected * this.props.perPage);

		this.setState({
			offset: offset
		}, () => {
			this.props.handlePageClick(selected, offset);
		});
	}
	render() {
		return (
			<React.Fragment>
				<MediaQuery query="(max-width: 767px)">
					<div className={`pagination-wrapper ${this.props.className || ''}`}>
						<ReactPaginate previousLabel={'<<'}
							nextLabel={'>>'}
							breakLabel={'…'}
							breakClassName={"break-me page-item"}
							pageCount={this.props.size}
							marginPagesDisplayed={1}
							pageRangeDisplayed={1}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							subContainerClassName={"pages pagination"}
							pageClassName="page-item"
							pageLinkClassName="page-link"
							previousClassName="page-item"
							previousLinkClassName="page-link"
							nextClassName={this.props.size? 'page-item': 'page-item disabled'}
							nextLinkClassName="page-link"
							forcePage={this.props.page}
							hrefBuilder={(page) => (this.props.pageLink + '?p=' + page)}
							activeClassName={"active"} />
					</div>
				</MediaQuery>
				<MediaQuery query="(min-width: 768px)">
					<div className={`pagination-wraper ${this.props.className || ''}`}>
						<ReactPaginate previousLabel={'Previous'}
							nextLabel={'Next'}
							breakLabel={'…'}
							breakClassName={"break-me page-item"}
							pageCount={this.props.size}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							subContainerClassName={"pages pagination"}
							pageClassName="page-item"
							pageLinkClassName="page-link"
							previousClassName="page-item"
							previousLinkClassName="page-link"
							nextClassName={this.props.size? 'page-item': 'page-item disabled'}
							nextLinkClassName="page-link"
							forcePage={this.props.page}
							hrefBuilder={(page) => (this.props.pageLink + '?p=' + page)}
							activeClassName={"active"} />
					</div>
				</MediaQuery>
			</React.Fragment>
		);
	}
};

Pagination.defaultProps = {
	perPage: 5
}

export default Pagination;