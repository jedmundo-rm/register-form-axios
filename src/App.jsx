
import React, { useState } from "react";
import axios from "axios";
import "./App.scss"

let urlApi = "https://get-talent-75b1b-default-rtdb.firebaseio.com/.json";

const pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?])[A-Za-z\d@$!%?]{6,20}$/;
// const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?]).{6,20}$/;

export default function App() {

  // Error
  const [error, setError] = useState(false);

  // Inicializar el estado del formulario en blanco
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Para el Select
  const [addrtype, setAddrtype] = useState(["", "Employee", "Applicant"])
  console.log('addrtype:', addrtype)
  const [role, setRole] = useState('')

  const Add = addrtype.map(Add => Add)
  const handleAddrTypeChange = (e) => { 
            console.clear(); 
            console.log((addrtype[e.target.value])); 
            setRole(addrtype[e.target.value]) 
  }

  // Esto es para el checkbox

  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  }

  // When the button is clicked
  const btnHandler = () => {
    alert('The buttion is clickable!');
  };

  
  // Inicializar el estado de error y éxito
  /* const [error, setError] = React.useState('');*/
  const [success, setSuccess] = React.useState(false);

  // GET
  const axios = require('axios').default;

  axios.get(urlApi)
    .then(resp => {
        console.log(resp.data);
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
  });

  // POST
  const newPost = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    role: role
  };

  const sendPostRequest = async () => {
    try {
        const resp = await axios.post(urlApi, newPost);
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };

  //sendPostRequest();

  const handleSubmit = (event) => {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Resetear el estado de error
    setError("");

    // Validar el formulario
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      role.trim() === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Asegurarse que las contraseñas coincidan
    if (password.trim() !== confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }

    // Enviar los datos
    sendPostRequest();

    console.log(`
    Data submitted:
    name: ${name}
    email: ${email}
    password: ${password}
    confirmPassword: ${confirmPassword}
    role: ${role}
    `);
  };

  // Mostrar el mensaje de éxito si el estado success es true
  if (success)
    return (
      <div className="registrationForm registrationForm__success">
        Registered successfully
      </div>
    );


  // Mostrar el formulario
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center">

            <div className="card text-center" style={{width: "100%", maxWidth: "550px"}}>
              <div className="card-header">Registro</div>
              <div className="card-body">

                <form className="ingreso " onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  
                  {/* Name */}
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </label>

                  {/* Email */}
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </label>

                  {/* Password */}
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={password}
                      pattern={pattern.toString().slice(1, -1)}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <p className="message alert alert-warning">
                      La contrasenia debe contener Minimo 6 y maximo 20
                      caracteres, al menos una mayuscula, un caracter especial y
                      un numero
                    </p>
                  </label>

                  {/* Confirm Password */}
                  <label>
                    Confirm Password:
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.currentTarget.value)
                      }
                    />
                  </label>

                  {/* Role */}
                  <label for="role">Choose a Role:
                    <select
                        onChange={e => handleAddrTypeChange(e)}
                        className="browser-default custom-select">
                        {
                            Add.map((address, key) => 
                            <option 
                            key={key} 
                            value={key}>{address}</option>)
                        }
                    </select >                  
                  </label>

                  {/* Terminos y Condiciones */}
                  <div className="d-flex flex-row justify-content-center text-white my-3">
                    <input className="mx-2" type="checkbox" id="agree" onChange={checkboxHandler} />
                    <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
                  </div>

                  <button  
                  disabled={!agree} 
                  type="ingresar" 
                  className="btn btn-outline-light"
                  >
                    Ingresar
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};