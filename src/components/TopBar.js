import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as routes from '../constants/routes';

import history from '../history';
import { auth, googleProvider } from '../firebase/firebase.js';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    header: {
        backgroundColor: '#de1616',
        //color: '#de1616',
        fontColor: '#ffffff',
    },
  };

class TopBar extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    login(){
        console.log("login");
        console.log(this.props);
        auth.signInWithRedirect(googleProvider);
    }

    logout(){
        console.log("logout");
        console.log(this.props);
        auth.signOut().then(function() {
            console.log("logoutsuccessful")
            history.replace(routes.LANDING);
        }).catch(function(error) {
            console.log(error);
        });


    }

    render(){
        return(
            <div styles={styles.root}>
                <AppBar position="static" style={styles.header}>
                    <Toolbar>

                        <Typography variant="subheading" color="inherit" align="center" style={styles.flex}>
                            UFM CryptoHunt
                        </Typography>

                        {/*{

                    !this.props.authUser
                            ? <Button color="default" variant="contained" onClick={this.login}>Login</Button>
                            : <Button color="secondary" variant="contained" onClick={this.logout}>Logout</Button>
                    }*/}

                    </Toolbar>
            </AppBar>
            </div>
        );
    }


}


export default TopBar;
