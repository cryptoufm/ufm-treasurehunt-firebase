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


const accent = "555"

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
        borderColor: "#de1616",
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
        color: "#fff",
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
    },
    tabscolor: {
        marginTop: "-2px",
        backgroundColor: "#de1616",
    },
    buttons:{
      width: "200px",
      padding: "5px",
      marginLeft: "calc(50% - 100px)",
      backgroundColor: '#de1616',
      //color: '#de1616',
      //fontColor: '#ffffff',
    },
    showKey2: {
        width: "200px",
        padding: "5px",
        marginLeft: "calc(50% - 100px)",
        color: '#de1616',
    },

}

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/pgj2AMYqLApaPNytv7KF"));
var Tx = require('ethereumjs-tx');

var account;
var key;

var contractAddress;
var abi;
var ownerPub;
var ownerPriv;
var contract;

var database = firebase.database();


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


getGameConfig();

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.print = this.print.bind(this);
        this.updateTokens = this.updateTokens.bind(this);
        this.state = { tokens: 0};
        this.account = account;
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

    updateTokens(amount) {
      this.setState({tokens : amount})
    }

    componentDidMount(){
        var changestate = this.updateTokens;
        this.timerID = setInterval(
          () => printContractBalance(function(res){
            changestate(res);
          }), 5000
        );

        console.log(this.state);
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState(() => ({ authUser }));
                this.setState(() => ({ value:0 }));
                console.log(this.state.authUser);
                var uid = this.state.authUser.uid;
                setAccountInfo(uid);
                console.log(account);
                console.log();
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
                  indicatorColor="accent"
                  style={styles.tabscolor}
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

                               {this.account}
                               {console.log(this.account)}

                           </Typography> <br/>

                           <Typography variant="subheading" align="center" gutterBottom>

                               Marrocoins tokens:

                           </Typography>

                           <Typography variant="body1" align="center" gutterBottom>

                               {this.state.tokens + " mc" }

                           </Typography> <br/>

                           <Button  variant="outlined" size="medium" color="primary" style={styles.showKey2}> Mostrar llave privada </Button>

                           <Typography variant="body1" align="center" noWrap gutterBottom>

                               <br/>
                               bf907a8dcd5cd838c6c944eead0ea2307886d31dca77ea768d3e24a4a59ba7f3

                           </Typography>

                           <br/>

                           <Button variant="contained" size="medium" color="primary" style={styles.buttons} onClick={this.logout}> Log Out </Button>  <br/> <br/>

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


                              <Button variant="contained" size="big" color="primary" style={styles.buttons} onClick={this.submitAnswer}>
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



function getGameConfig(){
    database.ref('/ufm-demo/gameInfo').once('value').then(function(snapshot) {
      var data = snapshot.val();
      contractAddress = data["contract"];
      abi = JSON.parse(data["contractAbi"]);
      ownerPub = data["ownerPub"];
      ownerPriv = new Buffer (data["ownerPriv"], 'hex');

      contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
        gasLimit: 3000000,
      });

    });
}

function printContractBalance(callback){
    contract.methods.balanceOf(account).call( function(error, result){
      var res = result/1000000000000000000;
      callback(res);
    });
}

function printBalance() {
    var balance = web3.eth.getBalance(account);
    var wei = web3.utils.toWei(balance, 'ether');
    return wei;
}

function newlyCreated(){
    console.log("jalando funcion");
    var uid = "DYrvUE5nwBRpaRoK62yOlYcPZmf1"
    var nickname = "JLLopez"
    var acc = web3.eth.accounts.create();
    account = acc.address;

    key = new Buffer(acc.privateKey.substring(2), 'hex');

    getGameStations(function(data){
      console.log("entro");

      var spotList = getSpotOrder(data);

      const json = {
            finishedGame : 0,
            nickname : nickname,
            privKey : acc.privateKey,
            pubKey : account,
            spots : spotList,
            tokens : 0
          }
      console.log(json);
      firstEth(function(){
        initAccount();
        setInfo("ufm-demo/cryptoHunters/"+uid, json);
      });


    });
}

function getGameStations(callback){
    var ref = database.ref('ufm-demo/gameInfo/spots');
    ref.on('value', function(snapshot) {
        var data = (snapshot.val());
        console.log(data);
        callback(data);
    });
}

function getSpotOrder(data){
    var orden = ordenEstaciones(Object.keys(data).length-1);
    var spotList = [];

    var i;

    for (i =0; i<Object.keys(data).length-1; i++){
      spotList.push(
        {
            completed : 0,
            name : orden[i],
            timeFinish: "",
            timeStart : "",
            tokensEarnead: 0,
            useHint1 : 0,
            useHint2 : 0
        }
      );
    }

    spotList.push(
      {
          completed : 0,
          name : 6,
          timeFinish: "",
          timeStart : "",
          tokensEarnead: 0,
          useHint1 : 0,
          useHint2 : 0
      }
    );
    return spotList;
}

function firstEth(callback){

    let estimatedGas;
    let nonce;

    web3.eth.getGasPrice().then((gasAmount) => {
      estimatedGas = gasAmount.toString(16);
      console.log(estimatedGas);
      web3.eth.getTransactionCount(ownerPub).then(_nonce => {
        nonce = _nonce.toString(16);

        console.log(nonce);
        console.log(account);
        console.log(ownerPub);
        const txParams = {
          gas: web3.utils.toHex(21000),
          gasLimit: web3.utils.toHex(30000),
          gasPrice: web3.utils.toHex(estimatedGas),
          to: account,
          from: ownerPub,
          value: web3.utils.toHex(web3.utils.toWei('0.001', 'ether')),
          nonce: '0x' + nonce,
          chainId: web3.utils.toHex(3)
        };

        const tx = new Tx(txParams);
        tx.sign(ownerPriv);
        const serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', function(receipt){
          console.log(receipt);
          callback();
        });

      });
    });
}

function setInfo(path, objeto){
    database.ref(path).set(
       objeto
     );
}

function getInfo(path){
    database.ref(path).once('value').then(function(snapshot){
      var info = (snapshot.val());
      return info;
    });
}

function setAccountInfo(uid){
  database.ref('ufm-demo/cryptoHunters/'+uid).once('value').then(function(snapshot) {
    var info = (snapshot.val());
    console.log(info);
    account = info.pubKey;
    console.log(account);
    key = new Buffer(info.privKey.substring(2), 'hex');
  })
}

function ordenEstaciones(n){
    var arr = []
    while(arr.length < n){
      var randomnumber = Math.floor(Math.random()*(n));
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr;
}

function initAccount(){
    const initAc = contract.methods.initCoins();
    callContractMethod(initAc,"init");
}

function buyHint1(){
    const buyHint1 = contract.methods.hint1();
    callContractMethod(buyHint1,"hint1");
}

function buyHint2(){
    const buyHint2 = contract.methods.hint2();
    callContractMethod(buyHint2,"hint2");
}

function callContractMethod(contractFunction, methType){

    const functionAbi = contractFunction.encodeABI();
    let estimatedGas;
    let nonce;

    console.log("Getting gas estimate");

    contractFunction.estimateGas({from: account}).then((gasAmount) => {
      estimatedGas = gasAmount.toString(16);
      console.log(gasAmount);
      console.log("Estimated gas: " + estimatedGas);

      web3.eth.getTransactionCount(account).then(_nonce => {
        nonce = _nonce.toString(16);

        console.log("Nonce: " + nonce);
        const txParams = {
          gasPrice: web3.utils.toHex(gasAmount),
          gasLimit: web3.utils.toHex(3000000),
          to: contractAddress,
          data: functionAbi,
          from: account,
          nonce: '0x' + nonce,
          chainId: web3.utils.toHex(3)
        };

        const tx = new Tx(txParams);
        tx.sign(key);
        const serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', function(receipt){
          if(methType == "hint1" || methType == "hint2"){
            document.getElementById("displayHint1").innerHTML = "Desplegando hint 1"
          }
          console.log(receipt);
        });
      });
    });
}

function gradeAnswer(answerUsuario, spot, time, distance){
	var answerCorrecta = getInfo('ufm-treasurehunt/'+'ufm-demo/'+'gameInfo/'+'spots/'+spot+'/codigo');
	if(answerUsuario===answerCorrecta){
		reward(time, distance)
	}
}

function reward(time, distance){
    const reward = contract.methods.recompensa(time, distance);
    callContractMethod(reward);
}


export default HomePage;
