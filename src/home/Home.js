import React, { Component } from 'react';
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
import Popover from '@material-ui/core/Popover';
import history from '../history';
import * as routes from '../constants/routes';
import firebase, { provider } from '../firebase/firebase';
import { auth, googleProvider } from '../firebase/firebase.js';


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
        this.logout = this.logout.bind(this);
        this.print = this.print.bind(this);
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


    state = {
            value: 0,
          };


        state = {
            gameStarted: true,
        }

        handleChange = (event, value) => {
          this.setState({ value });
        };


        componentWillMount() {

            this.setState( { value: 0 })
            this.setState( { gameStarted: true })
        }

        logout() {
            console.log("logout");
            console.log(this.props);
            auth.signOut().then(function() {
                console.log("logoutsuccessful")
                history.replace(routes.LANDING);
            }).catch(function(error) {
                console.log(error);
            });

        }

        goTo(route) {
            this.props.history.replace(`/${route}`)
        }


        submitAnswer = {

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

        const { value } = this.state;
        const { profile } = this.state;
        const { anchorEl } = this.state;
        const { gameStarted } = this.state


        return (


            <div style={styles.root}>


                <Tabs value={value} onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="primary"
                  centered>
                  <Tab style={styles.tabLabel} label="Profile" />
                  <Tab style={styles.tabLabel} label="Hunt" />
                  <Tab style={styles.tabLabel} label="Ranking"/>
                </Tabs>



                {/* PROFILE PAGE */}
                {value === 0 && <TabContainer>

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

                           <Button variant="contained" size="medium" color="primary" style={styles.showKey} onClick={this.logout}> Log Out </Button>  <br/> <br/>

                     </CardContent>

                   </Card>

                </TabContainer>}


                {/* HUNT PAGE */}
                {value === 1 && <TabContainer>


                    {!this.gameStarted  ? (

                        <Card style={styles.card}>

                            <CardContent>

                                <Typography variant="headline" align="center" gutterBottom>

                                     Encuentra el lugar...

                                 </Typography> <br/>

                                 <Typography variant="body1" align="justify" wrap style={styles.longText} >

                                        El original está en Puebla, México
                                        Line ssigned a value but never used
                                        Linassigned a value but never used
                                        Li is assigned a value but never used

                                </Typography> <br/> <br/>

                                <div style={styles.hintButtons}>

                                    <Button size="medium" color="secondary" align="center" onClick={this.handleClick}>
                                        Hint no. 1
                                    </Button>


                                    <Button size="medium" color="secondary" align="right" onClick={this.handleClick}>
                                        Hint no. 2
                                    </Button>

                                </div> <br/>


                                <Popover
                                    className={styles.popover}
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                 >

                                 <Typography style={styles.typography}>
                                     Esta es la pista... </Typography>
                                 </Popover>


                                <Input
                                    centered
                                    placeholder="Código"
                                    style={styles.input}
                                    inputProps={{
                                      'aria-label': 'Description',
                                    }}
                                  /> <br/><br/>


                                <Button variant="contained" size="big" color="primary" style={styles.showKey} onClick={this.submitAnswer}>
                                    Enviar
                                </Button>

                            </CardContent>

                        </Card>

                        ) : (

                            <Card style={styles.card}>

                                <CardContent>

                                    <Button variant="contained" size="big" color="primary" style={styles.showKey} onClick={this.start}>
                                      Comenzar
                                    </Button>


                                </CardContent>

                            </Card>

                        )
                    }

                </TabContainer>}


                {/* RANKING PAGE */}
                {value === 2 && <TabContainer>

                    <Card style={styles.card}>

                       <CardContent>


                           <Typography variant="title" align="center">

                              Live Score

                           </Typography> <br/>


                           <Typography variant="subheading" align="left">

                              Marrocoins:

                          </Typography>

                          <Typography variant="body1" align="center">

                              3492398 tokens

                           </Typography> <br/>

                           <Typography variant="subheading" align="left">

                              Hunters:

                           </Typography>

                           <Table>

                                <TableHead>
                                    <TableRow>

                                        <TableCell> Name</TableCell>
                                        <TableCell numeric>Tokens</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data.map(n => {
                                        return (
                                            <TableRow key={n.id}>
                                                <TableCell component="th" scope="row">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell numeric>
                                                    {n.tokens}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>

                       </CardContent>

                   </Card>

                </TabContainer>}

            </div>




               )
    }
}

export default HomePage;
