import React from 'react';
import history from '../history';
import * as routes from '../constants/routes';

import firebase, { auth, provider } from '../firebase/firebase';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = {

    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: 15,
        marginLeft: "calc(50% - 50px)",
        border: "solid",
        borderColor: "#F2105A",
    },
    card: {
        // maxWidth: '600px',
        // marginLeft: "calc(50% - 250px)",
        display: 'block',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        padding: '5px',
    },
    tabLabel: {
        width: "33%",
        color: "#eee",
    },
    font: {
        font: "roboto",
    },
    popover: {
        margin: "15px",
    },
    // DEF CLASSES
    showKey: {
        width: "200px",
        padding: "5px",
        marginLeft: "calc(50% - 100px)",
    },
    privateKey: {
        // visibility: "hidden"
    },
    longText: {
        width: "70%",
        marginLeft: "15%",
    },
    hintButtons: {
        width: "400px",
        marginLeft: "calc(50% - 100px)",
    },
    input: {
        width: "180",
        padding: "5px",
        marginLeft: "calc(50% - 90px)",
    }

}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};



let id = 0;
function createData(name, tokens) {
  id += 1;
  return { id, name, tokens };
}

const data = [
  createData('User1', 3002),
  createData('User2', 2342),
  createData('User3', 2344),
  createData('User4', 4241),
  createData('User5', 3431),
  createData('User6', 3931),
  createData('User7', 5545),
  createData('User8', 2342),
  createData('User9', 5324),
];



class HomePage extends React.Component {
    constructor(props){
        super(props);
        
        this.print = this.print.bind(this);
    }



    componentDidMount(){
        console.log(this.state);
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState(() => ({ authUser }));
                this.setState(() => ({ value:0 }));
            } 
            else {
                console.log("testHome");
                this.setState(() => ({ authUser: null}));
            };

        });
        
    }

    print(){
        console.log(this.state.authUser);
    }


    submitAnswer = {
    //Sumar 1 a la estacion
    }

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

handleClose = () => {
this.setState({
    anchorEl: null,
});
};

    render() {
        return (
            <div style={styles.root}>
                <Tabs value={0} onChange={this.handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    centered
                >
                    <Tab style={styles.tabLabel} label="Profile" />
                    <Tab style={styles.tabLabel} label="Hunt" />
                    <Tab style={styles.tabLabel} label="Ranking"/>
                </Tabs>


                        {this.state.value === 0 && <TabContainer>

<Card style={styles.card}>

   <CardContent>

       <Avatar  src={this.state.authUser ? this.state.authUser.photoURL : "none"}  style={styles.bigAvatar} />

       <Typography variant="title" align="center">

           {this.state.authUser ? this.state.authUser.displayName : "none"}

       </Typography>  <br/>

       <Typography variant="subheading" align="center" gutterBottom>

           Ethereum address:

       </Typography>

       <Typography variant="body1" align="center" noWrap gutterBottom>

           1Ace0e17b704A0ea258C089a60fFAf9412f4D395

       </Typography> <br/>

       <Typography variant="subheading" align="center" gutterBottom>

           Marrocoins tokens:

       </Typography>

       <Typography variant="body1" align="center" gutterBottom>

           70.04

       </Typography> <br/>

       <Button  variant="outlined" size="medium" color="primary" style={styles.showKey}> Mostrar llave privada </Button>

       <Typography variant="body1" align="center" noWrap gutterBottom>

           <br/>
           bf907a8dcd5cd838c6c944eead0ea2307886d31dca77ea768d3e24a4a59ba7f3

       </Typography>

       <br/>

       

 </CardContent>

</Card>
</TabContainer>}

                <h1>HomeComponent</h1>
                <Button color="secondary" variant="contained" onClick={this.print}>
                Test
                </Button>
            </div>
        )
    }
}

export default HomePage;
