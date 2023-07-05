import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../firebase";            
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, arrayRemove, arrayUnion } from "@firebase/firestore";

/*------------- para el registro --------------- */
export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  return createUserWithEmailAndPassword(auth, email, contraseña);
};

/*------------- para el login(iniciar sesion) --------------- */
export const iniciarSesionConCorreoYContraseña = (email, contraseña) => {
  return signInWithEmailAndPassword(auth, email, contraseña);
};

/*------------- para iniciar sesion con google --------------- */
export const initSessionsWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/*------------- para agregar un post y guardarlo en firestore --------------- */
export const agregarUnNuevoPost = (contenido, db, auth) => {
  return addDoc(collection(db,'post'), {
    contenido,
    usuario: auth.currentUser.email,
    datetime: new Date()
  });
};

/*----------  PARA ENLISTAR Y MOSTRAR LOS POST ----------*/
export const getTask = () => getDocs(collection(db, 'post'));
export const onGetTask = (callback) => onSnapshot(collection(db, 'post'), callback)

/*----------  FUNCIONES PARA BORRAR POST ----------*/
export const deletePost = (postId) => {const postRef = doc(db, 'post', postId);
   return deleteDoc(postRef);
};

/*---------- PARA DAR LIKE ----------*/
export const addLike = (id, likes) => {
  if (likes.length === 0 || ! (likes.includes(auth.currentUser.email))) {
      updateDoc (doc(db, 'posts', id), {
        likes: arrayUnion(auth.currentUser.email), 
      }).catch((error) => error)
    }
};

/*---------- PARA QUITAR LIKE ----------*/
export const removeLike = (id) => updateDoc(doc(db, 'posts', id), {
  likes: arrayRemove(auth.currentUser.email),
});

/*---------- PARA CERRAR SESIÓN ----------*/
export const logOut = () => signOut(auth);