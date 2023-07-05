/*
importamos la funcion que vamos a testear
//import { myFunction } from '../src/lib/index';
*/
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { addDoc } from '@firebase/firestore';
import {
  crearUsuarioConCorreoYContraseña,
  iniciarSesionConCorreoYContraseña,
  initSessionsWithGoogle,
  agregarUnNuevoPost
} from '../src/lib';
/*
jest.mock('firebase/auth', () => ({ signInWithEmailAndPassword: () => {} }));
*/
jest.mock('firebase/auth');
jest.mock('@firebase/firestore');
/*
jest.mock('../src/firebase.js', () => ({
  auth: { currentUser: { email: 'mari-cielo12@gmail.com' } }
}));
*/
describe('iniciarSesionConCorreoYContraseña', () => {
  it('es una funcion', () => {
    expect(typeof iniciarSesionConCorreoYContraseña).toBe('function');
  });

  it('Deveria llamar a la funcion signInWithEmailAndPassword cuando es ejecutada', async () => {
    await iniciarSesionConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
  /*
  it('Deveria devolver un objeto', async () => {
    const response = await iniciarSesionConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    console.log(response);
  });
*/
  /*
  it('Deveria devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({});
    const response = await iniciarSesionConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    console.log(response);
  });
  */
  it('Deveria devolver un objeto', async () => {
    /*
    const mockedFunction = jest.fn().mockReturnValueOnce({
      user: { email: 'mari-cielo12@gmail.com' }
    });
    */
    signInWithEmailAndPassword.mockReturnValueOnce({
      user: { email: 'mari-cielo12@gmail.com' }
    });
    const response = await iniciarSesionConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    expect(response.user.email).toBe('mari-cielo12@gmail.com');
  });
});

describe('initSessionsWithGoogle', () => {
  it('Deveria llamar a la funcion signInWithPopup cuando es ejecutada', async () => {
    await initSessionsWithGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
  });
  it('Deveria devolver un objeto', async () => {
    signInWithPopup.mockReturnValueOnce({});
    const conGoogle = await initSessionsWithGoogle();
    /*
    console.log(conGoogle);
    */
    expect(conGoogle).toEqual({});
  });
});

describe('crearUsuarioConCorreoYContraseña', () => {
  it('Deveria llamar a la funcion createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('Deveria devolver un objeto', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({
      user: { email: 'mari-cielo12@gmail.com' }
    });
    const crearUsuario = await crearUsuarioConCorreoYContraseña(
      'mari-cielo12@gmail.com',
      'maricielo12'
    );
    expect(crearUsuario.user.email).toBe('mari-cielo12@gmail.com');
  });
});

describe('agregarUnNuevoPost', () => {
  /*
it('deberia devolver un post', async () => {
    addDoc.mockReturnValueOnce({
      contenido: 'delicioso',
      usuario: 'kathysolencalada@gmail.com',
      datetime: '2 de julio de 2023'
    });
    const creoMiPost = await agregarUnNuevoPost({
      contenido: 'delicioso',
      usuario: 'kathysolencalada@gmail.com',
      datetime: '2 de julio de 2023'
    });
    
    console.log(creoMiPost);
    
    expect(creoMiPost.collection).toBe({
      contenido: 'delicioso',
      usuario: 'kathysolencalada@gmail.com',
      datetime: '2 de julio de 2023'
    });
  });
  */
  it('es una funcion', () => {
    expect(typeof agregarUnNuevoPost).toBe('function');
  });
  it('Deveria llamar a la funcion addDoc cuando es ejecutada', async () => {
    await agregarUnNuevoPost('mari-cielo12@gmail.com');
    expect(addDoc).toHaveBeenCalled();
  });
});
