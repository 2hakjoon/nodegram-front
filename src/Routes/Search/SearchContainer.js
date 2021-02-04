import React from "react";
import { useQuery } from "react-apollo-hooks";
import {withRouter} from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH_POSTS } from "./SearchQueries";

export default withRouter(({ location: {search}}) =>{
    const searchTerm = search.split("=")[1];
    const {data, loading} = useQuery(SEARCH_POSTS, {
        skip:searchTerm === undefined,
        variables:{
            term : searchTerm
        }
    });
    return <SearchPresenter searchTerm = {searchTerm} loading={loading} data={data}/>;
})