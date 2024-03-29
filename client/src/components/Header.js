import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

//using class based because we will use helper/functions in here
//easy to organize in class components
class Header extends Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (<li>
                    <a href="/auth/google">Login with Google</a>
                </li>)
            default:
                return [
                <li key="1"><Payments/></li>,
                <li key="3" style={{margin: '0 10px'}}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="2">
                <a href="/api/logout">Logout</a>
            </li>]
        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                <Link to={this.props.auth ? '/surveys' : '/'} 
                className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        )
    }
}
//hooks component to redux store
function mapStateToProps({auth}) { //destructured from state object of redux store
    return { auth }; // destructuring { auth: state.auth }
}

export default connect(mapStateToProps)(Header);