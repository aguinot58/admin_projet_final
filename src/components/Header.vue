<template>
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img src="/src/assets/logo.png" />
          <span class="fs-4">CodeBook - Admin</span>
        </a>
  
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <a
              v-if="user"
              @click="logout"
              href="#"
              class="nav-link"
            >
              Logout
            </a>
            <a
              v-else
              @click="login"
              href="#"
              class="nav-link"
            >
              Login
          </a>
        </li>
        </ul>
      </header>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase/index.js';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

export default {
  setup() {
    const user = ref(null);

    // Vérifier l'état de l'utilisateur à chaque chargement
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    // Fonction pour se connecter
    const login = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Erreur de connexion : ", error);
      }
    };

    // Fonction pour se déconnecter
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Erreur de déconnexion : ", error);
      }
    };

    return {
      user,
      login,
      logout,
    };
  }
};
</script>
  
<style scoped>
    body {
        padding: 0;
        margin: 0;
    }

    img {
      width: 3em;
      margin-right: 0.5em;
    }

    .nav-link {
      font-size: 1.2em;
      cursor: pointer;
      color: black;
    }
</style>