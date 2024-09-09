<template>

    <div class="px-4 my-2 text-center">
      
      <div v-if="user" class="d-flex flex-column align-items-center table-container">

        <h1 class="display-6 fw-bold">Liste des produits</h1>

        <button class="btn btn-primary my-3" @click="ajouterProduit()">Ajouter un produit</button>

        <div class="table-wrapper">

          <table class="table table-striped mt-4 overflow-x-auto">
            <thead>
              <tr>
                <th scope="col" class="col_1">Nom du Produit</th>
                <th scope="col" class="col_2">Prix</th>
                <th scope="col" class="col_3">Rating</th>
                <th scope="col" class="col_4">Taille (MB)</th>
                <th scope="col" class="col_5">Best Seller</th>
                <th scope="col" class="col_6">En Stock</th>
                <th scope="col" class="col_7">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td class="col_1">{{ product.name }}</td>
                <td class="col_2">{{ product.price }} €</td>
                <td class="col_3">{{ product.rating }}</td>
                <td class="col_4">{{ product.size }}</td>
                <td class="col_5" v-if="product.best_seller">Oui</td>
                <td class="col_5" v-else>Non</td>
                <td class="col_6" v-if="product.in_stock">Oui</td>
                <td class="col_6" v-else>Non</td>
                <td class="d-flex flex-nowrap col_7 justify-content-center">
                  <button class="btn btn-primary me-2" @click="modifierProduit(product.id)">
                    <i class="bi bi-pencil d-md-none"></i>
                    <span class="d-none d-md-inline">Modifier</span>
                  </button>
                  <button class="btn btn-danger" @click="supprimerProduit(product.id)">
                    <i class="bi bi-trash3-fill d-md-none"></i>
                    <span class="d-none d-md-inline">Supprimer</span>
                  </button>
                </td>
              </tr>
              <!-- Si moins de 7 produits, ajouter des lignes vides pour maintenir la hauteur -->
              <tr v-for="i in emptyRows" :key="'empty' + i" class="table-empty">
                <td colspan="7"></td>
              </tr>
            </tbody>
          </table>

        </div> 
        
        <div class="pagination mt-5 align-items-center">
          <button class="btn btn-secondary me-2" @click="previousPage" :disabled="currentPage === 1">
            Page précédente
          </button>
          <span>Page {{ currentPage }}</span>
          <button class="btn btn-secondary ms-2" @click="nextPage" :disabled="currentPage === totalPages">
            Page suivante
          </button>
        </div>

      </div>

      <div v-else class="mt-5">
        <h1 class="display-6 fw-bold">Accès refusé : veuillez vous connecter à votre compte</h1>
      </div>

    </div>

</template>
  
<script setup>

  import { ref, onMounted, computed } from 'vue';
  import { auth, db } from '../../firebase/index.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, deleteDoc, doc, getDocs, query, orderBy, limit, limitToLast, startAfter, endBefore, getCountFromServer } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';

  const user = ref(null);
  const productsCollectionRefs = collection(db, 'products');
  const products = ref([]);
  const router = useRouter();
  const $toast = useToast();

  const currentPage = ref(1);
  const productsPerPage = 7; // 7 produits par page
  const lastVisible = ref(null); // Le dernier produit visible (pour paginer en avant)
  const firstVisible = ref(null); // Le premier produit visible (pour paginer en arrière)
  const totalProducts = ref(0);  // Nombre total de produits
  const totalPages = ref(0);
  
  onMounted(() => {

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      currentPage.value = 1;
      lastVisible.value = null;
      firstVisible.value = null;
      totalProducts.value = 0;
      totalPages.value = 0;
      if (user.value) {
        fetchTotalProducts();
        fetchProducts();
      }
    });

  });

  const fetchTotalProducts = async () => {
    const snapshot = await getCountFromServer(productsCollectionRefs);
    totalProducts.value = snapshot.data().count;
    totalPages.value = Math.ceil(totalProducts.value / productsPerPage);  // Calcul du nombre total de pages
  };

  const fetchProducts = async (direction = 'forward') => {
    let q;

    // Premier chargement ou navigation en avant
    if (direction === 'forward') {
      if (lastVisible.value) {
        // Charger la page suivante à partir du dernier produit visible
        q = query(productsCollectionRefs, orderBy('name'), startAfter(lastVisible.value), limit(productsPerPage));
      } else {
        // Charger la première page
        q = query(productsCollectionRefs, orderBy('name'), limit(productsPerPage));
      }
    } else if (direction === 'backward') {
      // Charger la page précédente à partir du premier produit visible
      if (firstVisible.value) {
        q = query(productsCollectionRefs, orderBy('name'), endBefore(firstVisible.value), limitToLast(productsPerPage));
      }
    }

    const querySnapshot = await getDocs(q);
    const fbProducts = [];
    
    // Mettre à jour firstVisible et lastVisible
    firstVisible.value = querySnapshot.docs[0];
    lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        rating: doc.data().rating,
        size: doc.data().size,
        best_seller: doc.data().best_seller,
        in_stock: doc.data().in_stock
      };
      fbProducts.push(product);
    });
    products.value = fbProducts;
  };

  const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
      await fetchProducts('forward');
      currentPage.value += 1;
    }
  };

  const previousPage = async () => {
    if (currentPage.value > 1) {
      await fetchProducts('backward');
      currentPage.value -= 1;
    }
  };

  const emptyRows = computed(() => {
    const rowCount = products.value.length;
    return rowCount < productsPerPage ? productsPerPage - rowCount : 0;
  });

  const ajouterProduit = () => {
    router.push(`/products/new`);
  };

  const modifierProduit = (id) => {
    router.push(`/product/${id}/edit`);
  };

  const supprimerProduit = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {

      try {
        await deleteDoc(doc(db, 'products', id));
        products.value = products.value.filter(product => product.id !== id);
        $toast.success(`Produit supprimé avec succès !`);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        $toast.error('Oups, une erreur est survenue');
      }

    }
  };
    
</script>

<style scoped>

  .table-container {
    flex-grow: 1; /* Fait en sorte que cette section prenne l'espace disponible */
    display: flex;
    flex-direction: column;
  }

  .table-wrapper {
    flex-grow: 1;
    min-height: 400px; /* Hauteur minimale pour la table */
    overflow-y: auto; /* Permet le défilement si le contenu dépasse */
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  table {
    overflow-x: auto !important;
  }

  table td {
    vertical-align: middle;
  }

  .table-empty {
    height: 55px; /* Hauteur des lignes vides */
    background-color: #f9f9f9;
  }

  @media only screen and (max-width: 975px) {
        
    th.col_4, td.col_4 {
        display:none;
        width:0;
        height:0;
        opacity:0;
        visibility: collapse;       
    } 

  }

  @media only screen and (max-width: 870px) {

    td.col_1 {
      text-wrap: wrap;
    }
        
    th.col_3, td.col_3 {
      display:none;
      width:0;
      height:0;
      opacity:0;
      visibility: collapse;       
    } 
    
  }

  @media only screen and (max-width: 800px) {
        
    th.col_2, td.col_2 {
      display:none;
      width:0;
      height:0;
      opacity:0;
      visibility: collapse;       
    } 
    
  }

  @media only screen and (max-width: 755px) {
        
    th.col_5, td.col_5 {
      display:none;
      width:0;
      height:0;
      opacity:0;
      visibility: collapse;       
    } 
        
  }

  @media only screen and (max-width: 660px) {
        
    th.col_6, td.col_6 {
      display:none;
      width:0;
      height:0;
      opacity:0;
      visibility: collapse;       
    } 
            
  }

  @media only screen and (max-width: 580px) {
        
    table, table button {
      font-size: 0.9em;
    }       
                
  }

  @media only screen and (max-width: 430px) {
        
    th.col_7, td.col_7 {
      flex-wrap: wrap !important;
    }   
    
    td.col_7 button {
      margin: 0 !important;
    }
                    
  }

</style>