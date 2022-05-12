import React, { Component } from "react";

import SearchForm from "./SearchForm";

class SearchBox extends Component {
    render() {
        return (
            <SearchForm
                className={this.props.className || ""}
                onSubmit={
                    this.props.onSearch
                        ? (e) => this.props.onSearch(e.toJS())
                        : (_) => null
                }
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
            />
        );
    }
}

export default SearchBox;
