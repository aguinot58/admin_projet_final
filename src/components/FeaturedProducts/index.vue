<template>

    <div class="px-4 my-2 text-center">

        <h1 class="display-6 fw-bold">Featured Ebooks</h1>

        <Form class="my-3 d-flex flex-column align-items-center">

            <div class="d-flex justify-content-evenly w-75 cards-container" >

                <div class='mt-5' v-for="(product, index) in selectedProducts" :key="index">
                    <div class='card ms-4'>
                        <img :src="product.poster" class='card-img-top' alt='product-img'></img>
                        <div class='card-body' key={product.id}>
                            <h5 class='card-title fw-bold fs-4 text-start'>{{ product.name }}</h5>
                            <p class='card-text text-start'>{{ product.overview }}</p>
                            <div class="d-flex justify-content-evenly flex-wrap">
                                <div class="d-flex me-2">
                                    <label class="card-text fw-bold me-2">Note :</label>
                                    <p class='card-text text-start'>{{ product.rating }}</p>
                                </div>
                                <div class="d-flex me-2">
                                    <label class="card-text fw-bold me-2">Prix :</label>
                                    <p class='card-text text-start'>{{ product.price }}€</p>
                                </div>
                                <div class="d-flex me-2">
                                    <label class="card-text fw-bold me-2">Taille :</label>
                                    <p class='card-text text-start'>{{ product.size }}(MB)</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-evenly flex-wrap">
                                <div class="d-flex me-2">
                                    <label class="card-text fw-bold me-2">Best seller :</label>
                                    <p class='card-text text-start'>{{ product.best_seller ? "Oui" : "Non" }}</p>
                                </div>
                                <div class="d-flex me-2">
                                    <label class="card-text fw-bold me-2">En stock :</label>
                                    <p class='card-text text-start'>{{ product.in_stock ? "Oui" : "Non" }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="d-flex justify-content-evenly mt-5 w-25">

                <button type="button" class="btn btn-primary my-3 me-2 text-nowrap" @click.prevent="randomProducts">
                    Nouvelle selection
                </button>

                <button type="button" class="btn btn-primary my-3 text-nowrap" @click.prevent="updateFeaturedProducts">
                    Mettre à jour
                </button>

            </div>
            
        </Form>

    </div>

</template>

<script setup>

    import { ref, onMounted } from 'vue';
    import  { Form } from 'vee-validate'
    import { collection, onSnapshot, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';
    import { db } from '@/firebase'
    import { useToast } from 'vue-toast-notification';

    const featuredProductsCollectionRefs = collection(db, 'featured_products');
    const productsCollectionRefs = collection(db, 'products');
    const $toast = useToast();

    const allProducts = ref([]);  // Tous les produits de la collection "products"
    const selectedProducts = ref([]); // Les produits affichés (initialement depuis "featured_products")

    // Fonction pour récupérer les produits featured depuis Firestore
    const fetchFeaturedProducts = async () => {
        try {
            onSnapshot(featuredProductsCollectionRefs, (querySnapshot) => {
                const fbProducts = [];
                querySnapshot.forEach((doc) => {
                    const product = {
                    id: doc.id,
                    name: doc.data().name,
                    overview: doc.data().overview,
                    poster: doc.data().poster,
                    rating: doc.data().rating,
                    price: doc.data().price,
                    size: doc.data().size,
                    best_seller: doc.data().best_seller,
                    in_stock: doc.data().in_stock,
                    long_description: doc.data().long_description,
                    image_local: doc.data().image_local,
                    }
                    fbProducts.push(product);
                });
                selectedProducts.value = fbProducts;
            });
        } catch (error) {
            $toast.error('Erreur lors de la récupération des produits en vedette.');
            console.error('Erreur lors de la récupération des produits en vedette :', error);
        }
    };

    // Fonction pour récupérer tous les produits depuis la collection "products"
    const fetchAllProducts = async () => {
        try {
            onSnapshot(productsCollectionRefs, (querySnapshot) => {
                const fbProducts = [];
                querySnapshot.forEach((doc) => {
                    const product = {
                    id: doc.id,
                    name: doc.data().name,
                    overview: doc.data().overview,
                    poster: doc.data().poster,
                    rating: doc.data().rating,
                    price: doc.data().price,
                    size: doc.data().size,
                    best_seller: doc.data().best_seller,
                    in_stock: doc.data().in_stock,
                    long_description: doc.data().long_description,
                    image_local: doc.data().image_local,
                    }
                    fbProducts.push(product);
                });
                allProducts.value = fbProducts;
            });
        } catch (error) {
            $toast.error('Erreur lors de la récupération des produits.');
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    // Choisir 3 produits aléatoires sans répétition depuis la collection "products"
    const randomProducts = async () => {
        const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
        selectedProducts.value = shuffled.slice(0, 3);
        console.log("après nouvelle selection : " + selectedProducts.value);
    };

    // Fonction pour mettre à jour les produits en vedette (featured_products)
    const updateFeaturedProducts = async () => {
        try {

            const productsToAdd = [...selectedProducts.value];

            // Étape 1 : Supprimer tous les documents dans la collection 'featured_products'
            const snapshot = await getDocs(featuredProductsCollectionRefs);
            
            const deletePromises = [];
            snapshot.forEach((doc) => {
                deletePromises.push(deleteDoc(doc.ref));
            });
            console.log("deletedpromises " + deletePromises);
            // Attendre que toutes les suppressions soient terminées
            await Promise.all(deletePromises);
            console.log("Tous les produits ont été supprimés de la collection featured_products");

            // Étape 2 : Ajouter les nouveaux produits depuis "selectedProducts"
            const addPromises = productsToAdd.map(product => {
                let productRef = doc(db, 'featured_products', product.id);
                console.log("productRef: " + productRef);
                return setDoc(productRef, {
                    name: product.name,
                    overview: product.overview,
                    poster: product.poster,
                    rating: product.rating,
                    price: product.price,
                    size: product.size,
                    best_seller: product.best_seller,
                    in_stock: product.in_stock,
                    long_description: product.long_description,
                    image_local: product.image_local,
                });
            });
            await Promise.all(addPromises);

            $toast.success('Les produits en vedette ont été mis à jour avec succès.');
            console.log("Les produits en vedette ont été mis à jour avec succès.");
        } catch (error) {
            $toast.error('Erreur lors de la mise à jour des produits en vedette.');
            console.error('Erreur lors de la mise à jour des produits en vedette :', error);
        }
    };

    // montage du composant
    onMounted(() => {
        fetchFeaturedProducts();  // Afficher les produits featured par défaut
        fetchAllProducts(); // On va récupérer tous les produits pour remplir le tableau pour le tirage aléatoire
    });



</script>


<style scoped>

    img {

        height: auto;

    }

    .card {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 85%;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        flex-grow: 1; /* Pour que le contenu du corps s'étende */
    }

    .card-title {
        flex-grow: 0; /* Titre ne grandit pas */
    }

    .card-text {
        flex-grow: 1; /* Le texte occupe le maximum d'espace possible */
    }

    .card-footer {
        flex-grow: 0; /* Le pied de page ne grandit pas */
    }

    .cards-container {
        display: flex;
        justify-content: space-evenly;
        align-items: stretch; /* Aligne les éléments à la même hauteur */
    }

    @media only screen and (max-width: 951px) {
        
        .cards-container {

            flex-wrap: wrap;
            margin-left: 6vw;

        }

    }

    @media only screen and (max-width: 551px) {
        
        .cards-container {

            width: 100% !important;
            margin: 0;
            padding: 0;
            flex-direction: column;
            align-items: center;

        }

        .card {

            width: 100%;
            margin-left: 0 !important;

        }

    }

</style>