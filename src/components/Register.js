import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const registerDiv = document.createElement('div');

  registerDiv.classList.add('registerDiv');

  const topRegister = document.createElement('section');
  topRegister.classList.add('topRegister');
  topRegister.innerHTML += `
    <div class="imgLogo">
      <img src= "./imagenes/logoFinal.png" class = "logoPets" alt= "logo">
    </div>
  `;
  const bottomRegister = document.createElement('section');
  bottomRegister.classList.add('bottomRegister');

  const containerRegister = document.createElement('div');
  containerRegister.classList.add('containerRegister');

  const inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('placeholder', 'Nombre y Apellido');
  inputName.setAttribute('id', 'input-nombreApellido');

  const inputMail = document.createElement('input');
  inputMail.setAttribute('type', 'email');
  inputMail.setAttribute('placeholder', 'Correo electrónico');
  inputMail.setAttribute('id', 'input-email');

  const inputContraseña = document.createElement('input');
  inputContraseña.setAttribute('type', 'password');
  inputContraseña.setAttribute('placeholder', 'Contraseña');
  inputContraseña.setAttribute('id', 'input-password');

  const buttonRegistro = document.createElement('button');
  buttonRegistro.classList.add('registerButton2');
  buttonRegistro.textContent = 'Registrarse';

  const registerConCuenta = document.createElement('p');
  registerConCuenta.classList.add('registerConCuenta');
  registerConCuenta.innerHTML += `
  ¿Ya tienes cuenta? <a href="/" class="linkConCuenta"> Inicia sesión </a>
`;

  buttonRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(
      inputMail.value,
      inputContraseña.value
    ).then(() => {
      onNavigate('/home');
    });
  });

  containerRegister.appendChild(inputName);
  containerRegister.appendChild(inputMail);
  containerRegister.appendChild(inputContraseña);
  containerRegister.appendChild(buttonRegistro);
  containerRegister.appendChild(registerConCuenta);

  bottomRegister.appendChild(containerRegister);

  registerDiv.appendChild(topRegister);
  registerDiv.appendChild(bottomRegister);

  return registerDiv;
};
