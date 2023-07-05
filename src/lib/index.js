import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  signOut
} from '@firebase/firestore'; /* "getDocs" nuevo */
import { auth, db } from '../firebase';

/*
------------- para el registro--------------- 
*/
export function crearUsuarioConCorreoYContraseña(email, contraseña) {
  return createUserWithEmailAndPassword(auth, email, contraseña);
}

/*
------------- para el login(iniciar sesion)--------------- 
*/
export const iniciarSesionConCorreoYContraseña = (email, contraseña) =>
  signInWithEmailAndPassword(auth, email, contraseña);

/*
------------- para iniciar sesion con google--------------- 
*/
export const initSessionsWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/*
------------- para agregar un post y guardarlo en firestore--------------- 
*/
export function agregarUnNuevoPost(contenido) {
  return addDoc(collection(db, 'post'), {
    contenido,
    usuario: auth.currentUser.email,
    datetime: new Date(),
    likes: []
  });
}

/*
----------  PARA ENLISTAR Y MOSTRAR LOS POST----------
*/
export const getTask = () => getDocs(collection(db, 'post'));
export const onGetTask = (callback) =>
  onSnapshot(collection(db, 'post'), callback);
/*
export const getPost = (id) => getDoc(doc(db, 'post', id));
export const updatePost = (id, newFields) =>
  updateDoc(doc(db, 'post', id), newFields);


----------  FUNCIONES PARA BORRAR POST----------
*/
export const deletePost = (postId) => {
  const postRef = doc(db, 'post', postId);
  return deleteDoc(postRef);
};

/*
---------- FUNCION PARA EDITAR POST ---------
*/

/*
---------- PARA DAR LIKE ----------
*/
export const addLike = (id, likes) => {
  console.log('addLike');
  if (likes.length === 0 || !likes.includes(auth.currentUser.email)) {
    console.log('if');
    console.log(db);
    updateDoc(doc(db, 'post', id), {
      likes: [auth.currentUser.email]
    })
      .then((res) => console.log(res))
      .catch((error) => error);
  }
};

/*
---------- PARA QUITAR LIKE ----------

export const removeLike = (id) =>
  updateDoc(doc(db, 'posts', id), {
    likes: arrayRemove(auth.currentUser.email)
  });

/*
---------- PARA CERRAR SESIÓN ----------
*/
export const logOut = () => signOut(auth);
