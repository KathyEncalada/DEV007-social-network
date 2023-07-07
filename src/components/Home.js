/*
import { async } from 'regenerator-runtime';
*/
import { auth, db } from '../firebase';
import {
  agregarUnNuevoPost,
  onGetTask,
  deletePost,
  addLike
  /*
  logOut
  removeLike,
  */
} from '../lib';

export const Home = () => {
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
  rightHeaderHome.classList.add('rigthHeaderHome');

  const buttonLogOut = document.createElement('button');
  buttonLogOut.classList.add('buttonLogOut');
  buttonLogOut.textContent = 'Cerrar Sesión';
  /*
  buttonLogOut.addEventListener('click', () => {
    logOut().then(() => {
      onNavigate('/');
    });
  });
*/

  const bottomHomePage = document.createElement('div');
  bottomHomePage.classList.add('bottomHomePage');

  const postPublicar = document.createElement('section');
  postPublicar.classList.add('postPublicar');

  const publicarButton = document.createElement('button');
  publicarButton.classList.add('publicarButton');
  publicarButton.textContent = '¿Qué estás pensando?';

  publicarButton.addEventListener('click', () => {
    document.querySelector('.modalHome').style.display = 'flex';
  });

  const modalHome = document.createElement('div');
  modalHome.classList.add('modalHome');

  const modalContentHome = document.createElement('div');
  modalContentHome.classList.add('modalContentHome');
  modalContentHome.setAttribute('id', 'modalPeageHome');

  const labelModal = document.createElement('label');
  labelModal.classList.add('labelModal');

  const textareaModal = document.createElement('textarea');
  textareaModal.classList.add('textAreaModal');

  const modalBtnHome = document.createElement('button');
  modalBtnHome.classList.add('modalBtnHome');
  modalBtnHome.textContent = 'Publicar';

  const endModalHome = document.createElement('span');
  endModalHome.classList.add('endModalHome');
  endModalHome.innerHTML = '&times;';

  endModalHome.addEventListener('click', () => {
    document.querySelector('.modalHome').style.display = 'none';
  });
  const sectionPost = document.createElement('section');
  sectionPost.classList.add('sectionPost');

  const getData = () => {
    /*
    función que crea el post y su contenedor y recorre el array de los post
    */
    onGetTask((querySnapshot) => {
      sectionPost.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        console.log(post);

        const postContainer = document.createElement('div');
        postContainer.setAttribute('id', 'postContainer');

        const topPost = document.createElement('section');
        topPost.classList.add('topPost');

        const postContent = document.createElement('div');
        postContent.classList.add('postContent');
        postContent.setAttribute('id', postId);
        postContent.innerHTML = `
        <header>${post.usuario}</header>
        <p>${post.contenido}</p>
        `;

        const bottomPost = document.createElement('section');
        bottomPost.classList.add('bottomPost');

        // Likes
        const spanLikeDiv = document.createElement('div');
        const spanLike = document.createElement('span');
        spanLike.classList.add('spanLike');
        spanLike.innerHTML = '(0)';

        const likeImg = document.createElement('img');
        likeImg.classList.add('likeImg');
        likeImg.alt = 'corazon like color';
        likeImg.src = './imagenes/like.png';
        likeImg.addEventListener('click', () => {
          console.log('like', doc.id);
          addLike(doc.id, post.likes);
        });

        // if(likesArr.includes(auth.currentUser.email)) {
        // spanLike.innerHTML = `(${likesArr.length})`;
        // likeImg.addEventListener('click', () => {
        // removeLike(docRef.id)
        // .then(() => {
        // likeImg.src = "./imagenes/dislike.png";
        // })
        // .catch((error) => {
        // console.log('error al mover el like', error);
        // });
        // })
        // } else {
        // spanLike.innerHTML = `(${likesArr.length})`;
        // likeImg.src = "./imagenes/dislike.png";
        // };

        spanLikeDiv.appendChild(likeImg);
        spanLikeDiv.appendChild(spanLike);

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

        // botón de editar
        /*
        buttonEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const doc = await getPost(e.target.dataset.id);
            const task = doc.data();

            taskForm['task-title'].value = task.title;
            taskForm['task-description'].value = task.description;

            editStatus = true;
            id = e.target.dataset.id;
          });
        });

        /*
        ---------------editar post----------------
        */

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('buttonEdit');
        buttonEdit.textContent = 'Editar';
        buttonEdit.setAttribute('data-id', doc.id);
        //  buttonEdit.forEach(btn => {
        //   btn.addEventListener('click', async (e) => {
        //     const doc = await getPost(e.target.dataset.id)
        //     const task = doc.data()

        //     taskForm['task-title'].value = task.title
        //     taskForm['task-description'].value = task.description

        //     editStatus = true;
        //     id = e.target.dataset.id;
        //   })
        //  })

        //
        // buttonEdit.addEventListener('click', () => {
        //   const postEd = buttonEdit.getAttribute('data-id');
        //   editarPost(postEd)
        //   .then(() => {
        //     sectionPost.innerHTML = '';
        //     getData();
        //   } )
        //   .catch((error) => {
        //     console.log('Error al editar el post:', error);
        //   });

        // })
        // taskForm.addEventListener("submit", (e) => {
        //   e.preventDefault();

        //   const title = taskForm["task-title"];
        //   const description = taskForm["task-description"];

        //   if (!editStatus){
        //     savePost(title.value, description.value);

        //   }else {
        //     updatePost(id, {
        //       title: title.value,
        //       description: description.value,
        //     });

        //     editStatus = false;
        //   }

        //   taskForm.reset();
        // });

        topPost.appendChild(postContent);

        bottomPost.appendChild(spanLikeDiv);
        bottomPost.appendChild(buttonEdit);
        bottomPost.appendChild(buttonErase);

        postContainer.insertAdjacentElement('afterbegin', topPost);
        postContainer.appendChild(bottomPost);
        sectionPost.appendChild(postContainer);
      });
    });
  };

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
    sectionPost.innerHTML = '';
    getData();
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

  HomeDiv.appendChild(modalHome);
  HomeDiv.appendChild(headerHomepage);
  HomeDiv.appendChild(bottomHomePage);

  return HomeDiv;
};
