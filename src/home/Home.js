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
import { geolocated } from 'react-geolocated';

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
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/Ok9Gq6dRJtzU6g3CBzyf"));
var Tx = require('ethereumjs-tx');
var account;
var privKey;
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
        this.updateAccount = this.updateAccount.bind(this);
        this.updateSpot = this.updateSpot.bind(this);

        this.getCryptoHunters = this.getCryptoHunters.bind(this);
        this.updateCryptoHunters = this.updateCryptoHunters.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setSpot = this.setSpot.bind(this);
        this.callHint1 = this.callHint1.bind(this);
        this.callHint2 = this.callHint2.bind(this);
        this.stupidFunction = this.stupidFunction.bind(this);
        this.hidehints = this.hidehints.bind(this);
        this.updateHint1 = this.updateHint1.bind(this);
        this.updateHint2 = this.updateHint2.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.state = {
          tokens: "Leyendo al blockchain",
          isStarted: false,
          hint1Shown: false,
          hint2Shown: false,
        };
    }


    distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit==="K") { dist = dist * 1.609344 }
        if (unit==="N") { dist = dist * 0.8684 }

        return dist
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
    updateAccount(address,key) {
      this.setState({pub : address, priv: key})
    }

    getCryptoHunters(){
        var uch = this.updateCryptoHunters;
        console.log("test");
        database.ref('ufm-demo/cryptoHunters/').on('value',function(snapshot) {
            uch(snapshot.val())
          });
    }

    updateCryptoHunters(jsonObject){
        this.setState({cryptoHunters: jsonObject});
    }


    componentDidMount(){
        document.getElementById("llavePriv").style.display = "none"
        var changeaccount = this.updateAccount;


        var changestate = this.updateTokens;
        this.timerID = setInterval(
          () => printContractBalance(function(res){
            changestate(res);
            changeaccount(account, privKey);
          }), 5000
        );

        console.log(this.state);
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState(() => ({ authUser }));
                this.setState(() => ({ value:0 }));
                IsUserNew(authUser);
                //get data from database
                this.getCryptoHunters();
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

    handleChange = (event, value) => {
        this.setState({ value });
    };
    componentWillMount() {
        this.setState( { value: 0 })

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

    hidehints(){
      this.setState({
        hint1Shown: false,
        hint2Shown: false
      })
    }

    submitAnswer() {
        var changeHint1 = this.updateHint1;
        var changeHint2 = this.updateHint2;

        var answerUsuario = document.getElementById("textBox").value;
        var code = this.state.codigo;
        var time = Math.ceil(Math.abs(new Date() - new Date(this.state.time))/60000); //missing
        var dist = 0.02; //missing

        var uid = this.state.authUser.uid;
        var station = this.state.currentStation;
        var changespot = this.setSpot;
        var hiddenhints = this.hidehints;
        gradeAnswer(answerUsuario, code, time, dist, function(confirm){
          if(confirm){
            if (station == '6'){
              console.log("HAS TERMINADO");
              setInfo('ufm-demo/cryptoHunters/'+uid+'/currentStation/', station + 1);
              changespot();
              changeHint1();
              changeHint2();
              document.getElementById("textBox").style.display = "none";
              document.getElementById("bendiButton").style.display = "none";
            }else{
              setInfo('ufm-demo/cryptoHunters/'+uid+'/currentStation/', station + 1);
              setInfo('ufm-demo/cryptoHunters/'+uid+'/spots/'+(parseInt(station)+1).toString()+'/timeStart/',new Date().toUTCString());
              changespot();
              hiddenhints();
              document.getElementById("textBox").value = "";
            }

          }
        });
    }

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

    updateSpot(spot, timestamp, station){
      this.setState({
        currentStation: station,
        adivinanza: spot.adivinanza,
        pista1: spot.hint1,
        pista2: spot.hint2,
        codigo: spot.codigo,
        latitud: spot.latitud,
        longitud: spot.longitud,
        nombre: spot.nombre,
        time: timestamp
      })
    }

    setSpot(){

      var changespot = this.updateSpot;
      var uid = this.state.authUser.uid;
      getInfo('ufm-demo/cryptoHunters/'+uid,function(uInfo){
        var station = uInfo.currentStation
        var time2check = uInfo.spots[0].timeStart
        var nextSpot = uInfo.spots[station].name
        var timestamp = new Date().toUTCString();
        console.log(station);
        console.log(time2check);
        if( time2check == ""){
          setInfo('ufm-demo/cryptoHunters/'+uid+'/spots/'+station+'/timeStart', timestamp);
        }else{
          getInfo('ufm-demo/cryptoHunters/'+uid+'/spots/'+station+'/timeStart',function(time){
            timestamp = time
          });
        }

      getInfo('/ufm-demo/gameInfo/spots/'+ nextSpot, function(spot){
          console.log(spot.adivinanza)
          changespot(spot, timestamp, station)
        });
      });

    }

    startGame() {
      console.log("benditions");
      console.log(this.state.isStarted);



      this.setState({
        isStarted:true,
      });
      console.log(this.state.isStarted);
    }

    updateHint1() {
      this.setState({
        hint1Shown: true
      })
    }

    updateHint2() {
      this.setState({
        hint2Shown: true
      })
    }

    callHint1(){
      var changeHint1 = this.updateHint1;
      buyHint1(function(value){
        console.log('mostrar hint 1');
        changeHint1();
      });
    }

    callHint2(){
        var changeHint2 = this.updateHint2;
      buyHint2(function(value){
        console.log('mostrar hint 2');
        changeHint2();
      });
    }

    stupidFunction(){
      this.startGame();
      this.setSpot();
    }




    render() {

        const { value } = this.state;
        const { profile } = this.state;
        const { anchorEl } = this.state;


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

                           {/*
                           {!this.props.isGeolocationAvailable ? <div>Your browser does not support Geolocation</div> :
                           !this.props.isGeolocationEnabled ? <div>Geolocation is not enabled</div> : this.props.coords
                           ?
                           <div>
                           <p>{this.props.coords.latitude}</p>
                           <p>{this.props.coords.longitude}</p>
                           </div>
                             : <div>Getting the location data&hellip; </div>}


                           <p>Test distancia Escuela Negocios: {this.props.coords
? this.distance(this.props.coords.latitude,this.props.coords.longitude,14.604608,-90.505463, "K") + " km"
: "none"}</p>
*/}
                           <Typography variant="subheading" align="center" gutterBottom>

                               Ethereum address:
                               <p id="puKey"></p>


                           </Typography>

                           <Typography variant="body1" align="center" noWrap gutterBottom>

                               {this.state.pub}

                           </Typography> <br/>

                           <Typography variant="subheading" align="center" gutterBottom>

                               Marrocoins tokens:

                           </Typography>

                           <Typography variant="body1" align="center" gutterBottom>

                               {this.state.tokens + " mc" }

                           </Typography> <br/>

                           <Button  variant="outlined" size="medium" color="primary" style={styles.showKey2} onClick={function(){
                             document.getElementById("llavePriv").style.display = "block"
                           }}> Mostrar llave privada </Button>

                           <Typography id="llavePriv" variant="body1" align="center" noWrap gutterBottom>

                               <br/>

                               {this.state.priv}
                           </Typography>

                           <br/>
                          <br/>
                           <Button variant="contained" size="medium" color="primary" style={styles.buttons} onClick={this.logout}> Log Out </Button>  <br/> <br/>

                     </CardContent>

                   </Card>

                </TabContainer>}


                {/* HUNT PAGE */}
                {value === 1 && <TabContainer>

                    {this.state.isStarted  ? (

                        <Card style={styles.card}>

                            <CardContent>
                                <Typography variant="title" align="left" wrap style={styles.longText} >
                                  {this.state.tokens + " mc" }
                                </Typography>
                                <Typography variant="headline" align="center" gutterBottom>

                                     Estacion numero: {parseInt(this.state.currentStation)+1}

                                 </Typography> <br/>

                                 <Typography variant="subheading" align="centered" wrap  >

                                        {this.state.adivinanza}

                                </Typography> <br/> <br/>


                                {this.state.hint1Shown ? (
                                  <Typography variant="subheading" align="centered" wrap  >

                                         {this.state.pista1}

                                 </Typography>
                                ) : (
                                    <div style={styles.hintButtons}>
                                  <Button size="medium" color="secondary" align="center" onClick={this.callHint1}>
                                      Hint no. 1
                                  </Button>
                                  </div>
                                )

                                }



                                {this.state.hint2Shown ? (
                                  <Typography variant="subheading" align="centered" wrap  >

                                         {this.state.pista2}

                                 </Typography>
                                ) : (
                                    <div style={styles.hintButtons}>
                                  <Button size="medium" color="secondary" align="center" onClick={this.callHint2}>
                                      Hint no. 2
                                  </Button>
                                  </div>
                                )

                                }

                                <br/>




                                <Input
                                    id="textBox"
                                    centered
                                    placeholder="Código"
                                    style={styles.input}
                                    inputProps={{
                                      'aria-label': 'Description',
                                    }}
                                  /> <br/><br/>


                              <Button id="bendiButton" variant="contained" size="big" color="primary" style={styles.buttons} onClick={this.submitAnswer}>
                                    Enviar
                                </Button>

                            </CardContent>

                        </Card>

                        ) : (

                            <Card style={styles.card}>

                                <CardContent>

                                    <Button variant="contained" size="big" color="primary" style={styles.showKey} onClick={this.stupidFunction}>
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
                                {
                                        !this.state.cryptoHunters
                                            ? console.log("not set CH")
                                            : Object.values(this.state.cryptoHunters).map((user) => {

                                                return (
                                                    <TableRow key = {user.privKey}>
                                                        <TableCell component = "th" scope = "row">
                                                            {user.nickname}
                                                        </TableCell>
                                                        <TableCell numeric>
                                                            {user.tokens}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        )
                                }
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
function newlyCreated(userToken, nick){
    console.log("jalando funcion");
    var uid = userToken;
    var nickname = nick;
    var acc = web3.eth.accounts.create();
    account = acc.address;
    privKey = acc.privateKey;
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
            tokens : 0,
            currentStation: 0
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
    spotList.push(
      {
          completed : 0,
          name : 7,
          timeFinish: "",
          timeStart : "",
          tokensEarnead: 0,
          useHint1 : 0,
          useHint2 : 0
      }
    );
    return spotList;
}
function IsUserNew(user){
    database.ref('ufm-demo/cryptoHunters/'+user['uid']).once('value').then(function(snapshot){
      console.log(snapshot.val());
      if(snapshot.val()==null){
        console.log("creando usuario");
        newlyCreated(user['uid'], user['displayName']);
      }
      else{
        console.log("usuario ya creado");
        setAccountInfo(user['uid']);
      }
    });
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
          value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
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
function getInfo(path, callback){
    var info = database.ref(path).once('value').then(function(snapshot){
      var info = (snapshot.val());
      callback(info);
    });
}

function setAccountInfo(uid){
  database.ref('ufm-demo/cryptoHunters/'+uid).once('value').then(function(snapshot) {
    var info = (snapshot.val());
    //console.log(info);
    account = info.pubKey;
    privKey = info.privKey;
    //console.log(account);
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
    callContractMethod(initAc,"init", function(valid){
      console.log("cuenta creada");
    });
}
function buyHint1(callback){
    const buyHint1 = contract.methods.hint1();
    callContractMethod(buyHint1,"hint1", function(valid){
      callback(valid);
    });

}
function buyHint2(callback){
    const buyHint2 = contract.methods.hint2();
    callContractMethod(buyHint2,"hint2", function(valid){
      callback(valid);
    });
}
function callContractMethod(contractFunction, methType, callback){

    const functionAbi = contractFunction.encodeABI();
    let estimatedGas;
    let nonce;

    console.log("Getting gas estimate");
    let conf = false;
    web3.eth.getGasPrice().then((gasAmount) => {
      estimatedGas = gasAmount.toString(16);
      console.log(gasAmount);
      console.log("Estimated gas: " + estimatedGas);

      web3.eth.getTransactionCount(account).then(_nonce => {
        nonce = _nonce.toString(16);

        console.log("Nonce: " + nonce);
        const txParams = {
          gasPrice: web3.utils.toHex(21000000000),
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
          console.log(receipt);
          callback(true);
        });
      });
    });

}
function gradeAnswer(answerUsuario, answerCorrecta, time, distance, callback){
  console.log(answerUsuario)
  console.log(answerCorrecta)
  console.log(time)
	if(answerUsuario===answerCorrecta & distance < 0.03){
    console.log("acepto")
		reward(time, 9, function(confirm){
      console.log(confirm);
      if(confirm){
        callback(confirm);
      }
    });
	}
}
function reward(time, distance, callback){
    const reward = contract.methods.recompensa(time, distance);
    callContractMethod(reward, "reward" ,function(confirm){
      if(confirm){
        callback(confirm);
      }
    });
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  watchPosition: true,
userDecisionTimeout: 5000,
})(HomePage);
