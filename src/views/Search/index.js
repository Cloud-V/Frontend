import React, { Component } from "react";

import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import _ from "lodash";

import Repository from "./Repository";
import User from "./User";

import { connect } from "react-redux";

import queryString from "query-string";

import { search as searchRepositories, setQuery } from "store/actions/search";

import SquareSpinner from "partials/SquareSpinner";
import Pagination from "partials/Pagination";
import Navbar from "partials/Navbar";
import Footer from "partials/Footer";

import { Pagination as PaginationData } from "../../constants.js";

import classnames from "classnames";

const mapStateToProps = (state) => {
    return {
        search: state.get("search"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchRepositories: ({ query }, { repositories, users }) =>
            dispatch(
                searchRepositories(
                    {
                        query,
                    },
                    {
                        repositories,
                        users,
                    }
                )
            ),
        setQuery: (query) => dispatch(setQuery(query)),
    };
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: (queryString.parse(props.location.search).q || "").trim(),
            activeTab: "repositories",
            repositoriesPage: 0,
            usersPage: 0,
        };
        this.location = props.location;
        this.refreshRepositoriesPage = this.refreshRepositoriesPage.bind(this);
        this.handleRepositoriesPageClick =
            this.handleRepositoriesPageClick.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
    }
    fetchResults() {
        if (this.state.q.length) {
            this.props.setQuery(this.state.q);
            this.props
                .searchRepositories(
                    {
                        query: this.state.q,
                    },
                    {
                        repositories: this.state.repositoriesPage,
                        users: this.state.usersPage,
                    }
                )
                .then((action) => {
                    if (action.error && action.error.length) {
                        return;
                    }
                    const { search } = this.props;
                    const repositoriesWrapper = search
                        .get("data")
                        .get("repositories");
                    const usersWrapper = search.get("data").get("users");
                    const repositoriesCount =
                        repositoriesWrapper.get("pagination").get("count") || 0;
                    const usersCount =
                        usersWrapper.get("pagination").get("count") || 0;
                    if (!repositoriesCount && usersCount) {
                        this.setState({
                            activeTab: "users",
                        });
                    } else {
                        this.setState({
                            activeTab: "repositories",
                        });
                    }
                });
        }
    }
    async componentDidMount() {
        this.fetchResults();
    }
    async componentDidUpdate() {
        const q = (
            queryString.parse(this.props.location.search).q || ""
        ).trim();
        if (q !== this.state.q) {
            this.setState(
                {
                    q,
                },
                () => {
                    this.fetchResults();
                }
            );
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    handleRepositoriesPageClick(selectedPage, offset) {
        this.setState(
            {
                repositoriesPage: selectedPage,
            },
            () => {
                this.fetchResults();
            }
        );
    }
    refreshRepositoriesPage(tab, page) {
        if (!page) {
            const urlQuery = queryString.parse(this.props.location.search);
            page = Math.max((parseInt(urlQuery.p, 10) || 0) - 1, 0);
        }
        this.setState(
            {
                repositoriesPage: page,
            },
            () => {
                this.fetchResults();
            }
        );
    }
    handleUsersPageClick(selectedPage, offset) {
        this.setState(
            {
                usersPage: selectedPage,
            },
            () => {
                this.fetchResults();
            }
        );
    }
    refreshUsersPage(tab, page) {
        if (!page) {
            const urlQuery = queryString.parse(this.props.location.search);
            page = Math.max((parseInt(urlQuery.p, 10) || 0) - 1, 0);
        }
        this.setState(
            {
                usersPage: page,
            },
            () => {
                this.fetchResults();
            }
        );
    }
    render() {
        const { search } = this.props;

        const hasQuery = this.state.q !== "";
        if (
            search.get("status") === "loading" ||
            (search.get("status") === "" && hasQuery)
        ) {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="flex-1 h-100 mt-15 d-flex justify-content-center align-items-center">
                        <SquareSpinner />
                    </div>
                    <Footer />
                </div>
            );
        } else if (search.get("status") === "error") {
            return (
                <div className="app">
                    <Navbar location={this.location} />
                    <div className="flex-1 w-100 d-flex">
                        <Alert className="h-10 flex-1" color="danger">
                            {search.get("error")}
                        </Alert>
                    </div>
                    <Footer />
                </div>
            );
        }
        const repositoriesWrapper = search.get("data").get("repositories");
        const usersWrapper = search.get("data").get("users");
        const repositories = repositoriesWrapper.get("data");
        const users = usersWrapper.get("data");
        const repositoriesCount =
            repositoriesWrapper.get("pagination").get("count") || 0;
        const usersCount = usersWrapper.get("pagination").get("count") || 0;
        const hasRepositories = repositoriesCount > 0;
        const hasUsers = usersCount > 0;
        return (
            <div className="app">
                <Navbar location={this.location} />
                <Container
                    className="search-explore flex-1 w-100 h-100 pl-0 pr-0"
                    fluid
                >
                    {hasQuery ? (
                        <Row className="mr-0">
                            <Col
                                xl="2"
                                lg="3"
                                className="search-explore-tabs pt-2 pl-4 pr-1"
                            >
                                <Row className="search-explore-tab">
                                    <Button
                                        className={classnames({
                                            active:
                                                this.state.activeTab ===
                                                "repositories",
                                        })}
                                        onClick={() =>
                                            this.toggle("repositories")
                                        }
                                    >
                                        Repositories
                                        <div className="search-explore-tab-count">
                                            {repositoriesCount}
                                        </div>
                                    </Button>
                                </Row>
                                <Row className="search-explore-tab">
                                    <Button
                                        className={classnames({
                                            active:
                                                this.state.activeTab ===
                                                "users",
                                        })}
                                        onClick={() => this.toggle("users")}
                                    >
                                        Users
                                        <span className="search-explore-tab-count">
                                            {usersCount}
                                        </span>
                                    </Button>
                                </Row>
                            </Col>
                            <Col xl="10" lg="9" className="pr-0">
                                <TabContent
                                    activeTab={this.state.activeTab}
                                    className="search-explore-tab-content"
                                >
                                    <TabPane
                                        tabId="repositories"
                                        className="search-explore-tab-pane"
                                    >
                                        <Row className="mr-0">
                                            {hasRepositories ? (
                                                <React.Fragment>
                                                    {_.chunk(
                                                        repositories.toArray(),
                                                        3
                                                    ).map((repos, index) => (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {repos.map(
                                                                (repo) => (
                                                                    <Repository
                                                                        key={repo.get_id()}
                                                                        repository={
                                                                            repo
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                    <div className="w-100 d-flex justify-content-center mr-md-6 mr-sm-0">
                                                        <Pagination
                                                            className=""
                                                            size={Math.ceil(
                                                                repositoriesCount /
                                                                    PaginationData.ReposPerPage
                                                            )}
                                                            handlePageClick={
                                                                this
                                                                    .handleRepositoriesPageClick
                                                            }
                                                            page={
                                                                this.state
                                                                    .repositoriesPage
                                                            }
                                                            pageLink={`search?q=${this.state.q}`}
                                                            refreshPage={
                                                                this
                                                                    .refreshRepositoriesPage
                                                            }
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                                    <i className="fa fa-search fa-4x mr-4"></i>
                                                    <h3 className="d-flex justify-content-center align-items-center">
                                                        We didn't find
                                                        repositories matching
                                                        your search term.
                                                    </h3>
                                                </div>
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="users">
                                        <Row>
                                            {hasUsers ? (
                                                <React.Fragment>
                                                    {_.chunk(
                                                        users.toArray(),
                                                        3
                                                    ).map((users, index) => (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {users.map(
                                                                (user) => (
                                                                    <User
                                                                        key={user.get_id()}
                                                                        user={
                                                                            user
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                    <div className="w-100 d-flex justify-content-center mr-md-6 mr-sm-0">
                                                        <Pagination
                                                            className=""
                                                            size={Math.ceil(
                                                                usersCount /
                                                                    PaginationData.UsersPerPage
                                                            )}
                                                            handlePageClick={
                                                                this
                                                                    .handleUsersPageClick
                                                            }
                                                            page={
                                                                this.state
                                                                    .usersPage
                                                            }
                                                            pageLink={`search?q=${this.state.q}`}
                                                            refreshPage={
                                                                this
                                                                    .refreshUsersPage
                                                            }
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            ) : (
                                                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                                    <i className="fa fa-search fa-4x mr-4"></i>
                                                    <h3 className="d-flex justify-content-center align-items-center">
                                                        We didn't find users
                                                        matching your search
                                                        term.
                                                    </h3>
                                                </div>
                                            )}
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    ) : (
                        <div className="w-100 h-100 d-flex mt-20 justify-content-center align-items-center">
                            <i className="fa fa-search fa-4x mr-4"></i>
                            <h2 className="d-flex justify-content-center align-items-center">
                                Use the above search box to search Cloud V
                                repositories and users.
                            </h2>
                        </div>
                    )}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
