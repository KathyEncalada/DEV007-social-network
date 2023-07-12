/*
import { async } from 'regenerator-runtime';
*/
import { auth, db } from '../firebase';
import {
  agregarUnNuevoPost,
  onGetTask,
  deletePost,
  addLike,
  editPost,
  removeLike,
  logOut
} from '../lib';

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.classList.add('HomeDiv');

  const headerHomepage = document.createElement('div');
  headerHomepage.classList.add('headerHomepage');

  const leftHeaderHome = document.createElement('div');
  leftHeaderHome.classList.add('leftHeaderHome');

  const logoHome = document.createElement('img');
  logoHome.classList.add('logoHome');
  logoHome.src = './imagenes/logoFinal.png';

  const rightHeaderHome = document.createElement('div');
  rightHeaderHome.classList.add('rightHeaderHome');

  const buttonLogOut = document.createElement('button');
  buttonLogOut.classList.add('buttonLogOut');
  buttonLogOut.textContent = 'Cerrar Sesión';
  /*
  --------- FUNCION CERRAR SESION ---------
  */

  buttonLogOut.addEventListener('click', () => {
    logOut().then(() => onNavigate('/'));
  });
  /*
  ----- Contenedor de la Parte de abajo de la Homepage -----
  */
  const bottomHomePage = document.createElement('div');
  bottomHomePage.classList.add('bottomHomePage');

  /*
  ----- Contenedor Botón Escribe lo que quieras publicar-----
  */
  const postPublicar = document.createElement('section');
  postPublicar.classList.add('postPublicar');

  const publicarButton = document.createElement('button');
  publicarButton.classList.add('publicarButton');
  publicarButton.textContent = 'Escribe lo que quieras publicar 🐾';

  /*
  ----- Evento que abre el modal para publicar post-----
  */
  publicarButton.addEventListener('click', () => {
    document.querySelector('.modalHome').style.display = 'flex';
  });

  /*
  ----- Modal donde se escribe el post que se va a publicar -----
  */
  const modalHome = document.createElement('div');
  modalHome.classList.add('modalHome');

  const modalContentHome = document.createElement('div');
  modalContentHome.classList.add('modalContentHome');
  modalContentHome.setAttribute('id', 'modalPeageHome');

  const labelModal = document.createElement('label');
  labelModal.classList.add('labelModal');
  labelModal.textContent = 'Escribe tu publicación';

  const textareaModal = document.createElement('textarea');
  textareaModal.classList.add('textAreaModal');

  const modalBtnHome = document.createElement('button');
  modalBtnHome.classList.add('modalBtnHome');
  modalBtnHome.textContent = 'Publicar';

  const endModalHome = document.createElement('span');
  endModalHome.classList.add('endModalHome');
  endModalHome.innerHTML = '&times;';

  /*
  ----- Evento que cierra el modal con la X -----
  */
  endModalHome.addEventListener('click', () => {
    document.querySelector('.modalHome').style.display = 'none';
  });

  /*
  ----- contenedor que sostiene los post segun se van agregando -----
  */
  const sectionPost = document.createElement('section');
  sectionPost.classList.add('sectionPost');

  /*
  ----- crea contenedor padre modal editar post-----
  */
  const modalEdit = document.createElement('div');
  modalEdit.classList.add('modalEdit');

  /*
  ----- funcion editar post ------
  */
  function showEditModal(text, id) {
    const modalContentEdit = document.createElement('div');
    modalContentEdit.classList.add('modalContentEdit');

    const labelEditModal = document.createElement('label');
    labelEditModal.classList.add('labelEditModal');
    labelEditModal.textContent = 'Edita aquí tu publicación';

    const textareaEditModal = document.createElement('textarea');
    textareaEditModal.classList.add('textareaEditModal');
    textareaEditModal.value = text;

    const modalEditBtn = document.createElement('button');
    modalEditBtn.classList.add('modalEditBtn');
    modalEditBtn.textContent = 'Editar';

    /*
    ------ evento que guarda el texto editado ------
    */
  modalEditBtn.addEventListener('click', () => {
    editPost(textareaEditModal.value, id).then(() => {
        modalEdit.style.display = 'none';
    });
  });

    const endEditModal = document.createElement('span');
    endEditModal.classList.add('endEditModal');
    endEditModal.innerHTML = '&times;';

    /*
    -------- evento que cierra el modal de editar con la X -------
    */
    endEditModal.addEventListener('click', () => {
      document.querySelector('.modalEdit').style.display = 'none';
    });

    modalContentEdit.appendChild(labelEditModal);
    modalContentEdit.appendChild(textareaEditModal);
    modalContentEdit.appendChild(modalEditBtn);
    modalContentEdit.appendChild(endEditModal);
    modalEdit.appendChild(modalContentEdit);

    document.querySelector('.modalEdit').style.display = 'flex';
  }

  /*
  ----- función que crea el post y su contenido y recorre el array de los post -----
  

  const postsRef = querySnapshot( orderBy('time', 'desc'))
  */
  const getData = () => {
    onGetTask((querySnapshot) => {
      sectionPost.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const likesArr = post.likes;
        console.log(likesArr);
        const postId = doc.id;

        /*
        ----- contenedor padre del nuevo post-----
        */
        const postContainer = document.createElement('div');
        postContainer.setAttribute('id', 'postContainer');

        /*
        ----- parte superior postContainer ------
        */
        const topPost = document.createElement('section');
        topPost.classList.add('topPost');  

        /* 
        ------ aqui se publica el contenido del nuevo post -----
        */
        const postContent = document.createElement('div');
        postContent.classList.add('postContent');
        postContent.setAttribute('id', postId);
        postContent.innerHTML = `
        <p class = "parrafoUsuario">${post.usuario}</p>
        <p class = "parrafoContenido">${post.contenido}</p>
        `;

        /*
        ----- parte inferior del postContainer -----
        */
        const bottomPost = document.createElement('section');
        bottomPost.classList.add('bottomPost');

        const leftBottomPost = document.createElement('div');
        leftBottomPost.classList.add('leftBottomPost');

        const rightBottomPost = document.createElement('div');
        rightBottomPost.classList.add('rightBottomPost');

        /*
        ------ contenedor likes ------
        */
        const spanLikeContenedor = document.createElement('div');
        spanLikeContenedor.classList.add('spanLikeContenedor');

        /*
        ----- span que contiene el conteo de likes -----
        */
        const spanLike = document.createElement('span');
        spanLike.classList.add('spanLike');
        spanLike.innerHTML = `(${likesArr.length})`;

        /*
        ---- like -----
        */
        const likeImg = document.createElement('img');
        likeImg.classList.add('likeImg');
        likeImg.alt = 'corazon like color';
        if (likesArr.includes(auth.currentUser.email)) {
          likeImg.src = './imagenes/like.png';
        } else {
          likeImg.src = './imagenes/dislike.png';
        }

        /*
        ----- funcion dar like y guardar firebase ---- 
        */

        likeImg.addEventListener('click', () => {
          if (likesArr.includes(auth.currentUser.email)) {
            removeLike(doc.id);
          } else {
            addLike(doc.id, post.likes);
          }
        });

        spanLikeContenedor.appendChild(likeImg);
        spanLikeContenedor.appendChild(spanLike);

        /*
        --------------borrar post----------------- 
        */
        const buttonErase = document.createElement('button');
        buttonErase.classList.add('buttonErase');
        buttonErase.textContent = 'Borrar';
        buttonErase.setAttribute('data-id', doc.id);

        buttonErase.addEventListener('click', () => {
          const postsId = buttonErase.getAttribute('data-id');
          deletePost(postsId)
            .then(() => {
              sectionPost.innerHTML = '';
              getData();
            })
            .catch((error) => {
              console.log('Error al borrar el post:', error);
            });
        });

        /*
        --------------- crea boton editar----------------
        */

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('buttonEdit');
        buttonEdit.textContent = 'Editar';
        buttonEdit.setAttribute('data-id', doc.id);

        /*
        -------- Evento que abre el modal ---------
        */

        buttonEdit.addEventListener('click', () => {
          modalEdit.innerHTML = '';
          showEditModal(post.contenido, doc.id);
        });

        topPost.appendChild(postContent);


        leftBottomPost.appendChild(spanLikeContenedor);
        rightBottomPost.appendChild(buttonEdit);
        rightBottomPost.appendChild(buttonErase);
        bottomPost.appendChild(leftBottomPost);
        bottomPost.appendChild(rightBottomPost);

        postContainer.appendChild(topPost);
        postContainer.appendChild(bottomPost);
        sectionPost.appendChild(postContainer);
      });
    });
  };

  /*
  ------función para publicar un nuevo post ------
  */
  modalBtnHome.addEventListener('click', () => {
    agregarUnNuevoPost(textareaModal.value, db, auth)
      .then(() => {
        textareaModal.value = '';
        modalHome.style.display = 'none';
        sectionPost.innerHTML = '';
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /*
  ---------------mostrar post---------------- 
  */
  window.addEventListener('DOMContentLoaded', async () => {
    console.log('dom');
    getData();
    sectionPost.innerHTML = '';
  });

  leftHeaderHome.appendChild(logoHome);
  rightHeaderHome.appendChild(buttonLogOut);

  headerHomepage.appendChild(leftHeaderHome);
  headerHomepage.appendChild(rightHeaderHome);

  postPublicar.appendChild(publicarButton);

  bottomHomePage.appendChild(postPublicar);
  bottomHomePage.appendChild(sectionPost);

  modalContentHome.appendChild(labelModal);
  modalContentHome.appendChild(textareaModal);
  modalContentHome.appendChild(modalBtnHome);
  modalContentHome.appendChild(endModalHome);
  modalHome.appendChild(modalContentHome);

  HomeDiv.appendChild(modalEdit);
  HomeDiv.appendChild(modalHome);
  HomeDiv.appendChild(headerHomepage);
  HomeDiv.appendChild(bottomHomePage);

  return HomeDiv;
};
