
export class blockChainFunc {

  constructor(){
    this.account;
    this.key;

    this.contractAddress;
    this.abi;
    this.ownerPub;
    this.ownerPriv;
    this.contract;

    this.Web3 = require('web3');
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/pgj2AMYqLApaPNytv7KF"));
    this.Tx = require('ethereumjs-tx');

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



  var config = {
      apiKey: "AIzaSyD9x3ecmctrxTEq9R8lxi4tfnhhbMTbYHY",
      authDomain: "ufm-treasurehunt.firebaseapp.com",
      databaseURL: "https://ufm-treasurehunt.firebaseio.com",
      projectId: "ufm-treasurehunt",
      storageBucket: "ufm-treasurehunt.appspot.com",
      messagingSenderId: "1091186750130"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  getGameConfig();

  function printContractBalance(callback){
    contract.methods.balanceOf(account).call( function(error, result){
      var res = result/1000000000000000000;
      callback(res);
    });
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


  function getSpotOrder(data){
    var orden = ordenEstaciones(Object.keys(data).length-1);
    var spotList = [];

    var i;

    for (i =0; i<Object.keys(data).length-1; i++){
      spotList.push(
        {
            completed : 0,
            name : data[orden[i]]["nombre"],
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
          name : data[6]["nombre"],
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

  function ordenEstaciones(n){
    var arr = []
    while(arr.length < n){
      var randomnumber = Math.floor(Math.random()*(n));
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr;
  }

  function getGameStations(callback){
    var ref = database.ref('ufm-demo/gameInfo/spots');
    ref.on('value', function(snapshot) {
        var data = (snapshot.val());
        console.log(data);
        callback(data);
    });

  }

  function printBalance() {
    var balance = web3.eth.getBalance(account);
    var wei = web3.utils.toWei(balance, 'ether');
    return wei;
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

  function reward(time, distance){
    const reward = contract.methods.recompensa(time, distance);
    callContractMethod(reward,"reward");
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
}
