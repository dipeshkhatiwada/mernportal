import React from 'react';
import {Link, withRouter} from "react-router-dom";

const Breadcrumb = ({
    history
}) => {
    let parts = history.location.pathname.split('/');

    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/"><i className="fas fa-tachometer-alt"></i> Home</a></li>
            <li className="breadcrumb-item"><Link to={"/"+parts[1]+"/"+parts[2]+"/list"} style={{ textTransform: 'capitalize'}}> {parts[2]}</Link></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ textTransform: 'capitalize'}}>{parts[3]}</li>
            </ol>
        </nav>
    )
};
export default withRouter(Breadcrumb);