/*
importamos la funcion que vamos a testear
//import { myFunction } from '../src/lib/index';
*/
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import {
  crearUsuarioConCorreoYContraseña,
  iniciarSesionConCorreoYContraseña,
  initSessionsWithGoogle,
  agregarUnNuevoPost,
  deletePost,
  editPost,
  logOut
} from '../src/lib';
/*
jest.mock('firebase/auth', () => ({ signInWithEmailAndPassword: () => {} }));
*/
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

jest.mock('../src/firebase.js', () => ({
  auth: { currentUser: { email: 'mari-cielo12@gmail.com' } }
}));

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
  it('es una funcion', () => {
    expect(typeof agregarUnNuevoPost).toBe('function');
  });
  it('Deveria llamar a la funcion addDoc cuando es ejecutada', async () => {
    await agregarUnNuevoPost('mari-cielo12@gmail.com');
    expect(addDoc).toHaveBeenCalled();
  });
});

describe('deletePost', () => {
  it('es una funcion', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('Deveria llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await deletePost('mari-cielo12@gmail.com');
    expect(deleteDoc).toHaveBeenCalled();
  });
});

describe('editPost', () => {
  it('es una funcion', () => {
    expect(typeof editPost).toBe('function');
  });
  it('Deveria llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await editPost('mari-cielo12@gmail.com');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('logOut', () => {
  it('es una funcion', () => {
    expect(typeof logOut).toBe('function');
  });
  it('Deveria llamar a la funcion signOut cuando es ejecutada', async () => {
    await logOut('mari-cielo12@gmail.com');
    expect(signOut).toHaveBeenCalled();
  });
});
