<template>
    <div class="px-4 my-2 text-center">
      <div v-if="user">
        <h1 class="display-6 fw-bold">Liste des produits</h1>
        <button class="btn btn-primary my-3" @click="ajouterProduit()">Ajouter un produit</button>
        <!-- Le contenu de la page Home pour l'utilisateur connecté -->
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Nom du Produit</th>
              <th scope="col">Prix</th>
              <th scope="col">Rating</th>
              <th scope="col">Taille (MB)</th>
              <th scope="col">Best Seller</th>
              <th scope="col">En Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>{{ product.name }}</td>
              <td>{{ product.price }} €</td>
              <td>{{ product.rating }}</td>
              <td>{{ product.size }}</td>
              <td v-if="product.best_seller">Oui</td>
              <td v-else>Non</td>
              <td v-if="product.in_stock">Oui</td>
              <td v-else>Non</td>
              <td>
                <button class="btn btn-primary me-2" @click="modifierProduit(product.id)">Modifier</button>
                <button class="btn btn-danger" @click="supprimerProduit(product.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h1 class="display-6 fw-bold">Accès refusé : veuillez vous connecter à votre compte</h1>
      </div>
    </div>
</template>
  
<script setup>

  import { ref, onMounted } from 'vue';
  import { auth, db } from '../../firebase/index.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { collection, onSnapshot, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';

  const user = ref(null);
  const productsCollectionRefs = collection(db, 'products');
  const productsCollectionQuery = query(productsCollectionRefs);
  const products = ref([]);
  const router = useRouter();
  const $toast = useToast();
  
  onMounted(() => {

    // Vérifier l'état de l'utilisateur à chaque chargement de la page
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      if (user.value) {
        // import de la liste des produits
        onSnapshot(productsCollectionQuery, (querySnapshot) => {
          const fbProducts = [];
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
        });
      }
    });
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
        products.value = produicts.value.filter(product => product.id !== id);
        $toast.success(`Produit supprimé avec succès !`);
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        $toast.error('Oups, une erreur est survenue');
      }

    }
  };
    
</script>

<style scoped>

  table {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  table td {
    vertical-align: middle;
  }

</style>