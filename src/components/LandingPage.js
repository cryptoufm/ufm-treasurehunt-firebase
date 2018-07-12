import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import history from '../history';
import { auth, googleProvider } from '../firebase/firebase.js';



const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10,
        float: "left",
    },
    userGrid: {
        display: "flex",
        alignItems: "center"
    },
    ethGrid:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0px 0px 0px 1px black",
        backgroundColor: "#c3cbff",
    },
    card: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: 50,
    marginLeft: 0,

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  loginButton: {
      width: "200px",
      padding: "5px",
      marginLeft: "calc(50% - 100px)",
      backgroundColor: "#de1616",
      color: "#fff"
  },
  buttons:{
    backgroundColor: '#de1616',
    //color: '#de1616',
    //fontColor: '#ffffff',
  },

}

function getSteps() {
  return ['Bienvenid@ a CryptoHunter!',
  'Registro',
  'Credenciales',
  'CryptoHunt',
  'Adivinanzas',
  'Hints',
  'Estaciones',
  'Premio'];
}

function getStepContent(step) {
  switch (step) {
    // 0 : Bienvenida
    case 0:
      return `Los alumnos de Computer Science, del curso, "Technologies & Freedom",
      te damos la bienvenida a nuestro juego basado en blockchain!
      Esperamos que lo disfrutes, pero sobretodo, que experimentes un poco
      de todo lo que se puede realizar con esta nueva tecnología!`;
    // 1 : Registro
    case 1:
      return `Para ingresar a la red de "CryptoHunt", debes de crear una cuenta,
      la cual automáticamente, te creará tu "wallet", y con la cual estarás almacenando
      los "MarroCoins" que recolectes durante el juego. Recuerda no refrescar la página antes que
      aparezcan tus "MarroCoins"`;

    // 2 : Credenciales
    case 2:
      return `Al momento de crear tu cuenta, se te asignará una llave privada única,
      la cual se verá como una cadena de caracteres entre números y letras.
      Te recomendamos almacenar esta credencial junto con tu contraseña en un lugar seguro`;

    // 3 : CryptoHunt
    case 3:
      return `CryptoHunt, es un juego basado en la metodología de "búsqueda del tesoro",
      pero en este caso, cada vez que cumplas con el reto asignado, dependiendo de tu
      efectividad para resolverlo, se te acreditará cierta cantidad de MarroCoins en tu wallet.
      Mientras más rápido te muevas, más MarroCoins ganas.`;

    // 4 : Adivinanzas
    case 4:
      return `Para cumplir cada reto, se te presentará una adivinanza o acertijo, que te
      indicará el CryptoSpot exacto al que te debes de
      dirigir para que se te presente el siguiente reto.`;

    // 5 : Hints
    case 5:
      return `En caso de que no logres descifrar el acertijo, dispones de 2 "hints" para comprar.
      Ambos son pagados pero con diferente precio. Por el primero, se te descontarán 15 MarroCoins (MC),
      mientras que por el segundo, 25 MarroCoins. No refresques la página.`;

    // 6 : Estaciones
    case 6:
      return `Para identificar el CryptoSpot al que te llevará el acertijo del reto,
      encontrarás un sticker con el logo de CryptoHunt y un código, el cual debes de ingresar
      en la plataforma para que se te asigne el siguiente reto.
      `;

    // 7 : Premio
    case 7:
      return `Al final del juego, se premiará al CryptoHunter que tenga la wallet más llena,
      es decir, que haya recolectado la mayor cantidad de MarroCoins`;

    // 8 : LoginPage (Facebook || Googl

    default:
      return 'Unknown step';
  }
}


class LandingPage extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        // this.print = this.print.bind(this);
    }

    login(){
        console.log("login");
        console.log(this.props);
        auth.signInWithRedirect(googleProvider);
    }

    state = {
   activeStep: 0,
 };

 handleNext = () => {
   this.setState({
     activeStep: this.state.activeStep + 1,
   });
 };

 handleBack = () => {
   this.setState({
     activeStep: this.state.activeStep - 1,
   });
 };

 handleReset = () => {
   this.setState({
     activeStep: 0,
   });
 };


     render() {


        const steps = getSteps();
   const { activeStep } = this.state;

        return(


                            <div className={styles.root}>
                   <Stepper activeStep={activeStep} orientation="vertical">
                     {steps.map((label, index) => {
                       return (
                         <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                           <StepContent>
                             <Typography  align="justify">{getStepContent(index)}</Typography> <br/>
                             <div className={styles.actionsContainer}>
                               <div>
                                 <Button
                                   disabled={activeStep === 0}
                                   onClick={this.handleBack}
                                   className={styles.button}
                                 >
                                   Atrás
                                 </Button>
                                 <Button style={styles.buttons}
                                   variant="contained"
                                   color="primary"
                                   onClick={this.handleNext}
                                   className={styles.button}
                                 >
                                   {activeStep === steps.length - 1 ? 'Comenzar' : 'Siguiente'}
                                 </Button>
                               </div>
                             </div>
                           </StepContent>
                         </Step>
                       );
                     })}
                   </Stepper>
                   <Button variant="contained" onClick={this.login} style={styles.loginButton}>
                     Log In
                   </Button>
                   <br/><br/>

                 </div>


        );
    }
}

export default LandingPage;
