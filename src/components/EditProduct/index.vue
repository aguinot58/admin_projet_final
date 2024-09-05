<template>
  
  <div class="px-4 my-2 text-center">

    <h1 class="display-6 fw-bold">Ajout d'un nouveau produit</h1>

    <Form @submit="onSubmit" :validation-schema="formSchema" v-model="formValues" class="my-5 d-flex flex-column align-items-center">

      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="name" class="me-2">Nom du produit<span class="text-danger">*</span> : </label>
        <Field 
          name = "name"
          class="control-form me-2 w-50"
          placeholder = "Nom du produit"
          v-model="formValues.name"
        />
      </div>
      <ErrorMessage as="p" name="name" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>
      
      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="overview" class="me-2">Aperçu<span class="text-danger">*</span> :</label>
        <Field 
          as="textarea"
          name = "overview"
          class="control-form me-2 w-50"
          placeholder = "Aperçu"
          rows="2"
          v-model="formValues.overview"
        />
      </div>
      <ErrorMessage as="p" name="overview" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>

      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="long_escription" class="me-2">Description<span class="text-danger">*</span> :</label>
        <Field 
          as="textarea"
          name = "long_description"
          class="control-form me-2 w-50"
          placeholder = "Description"
          rows="5"
          v-model="formValues.long_description"
        />
      </div>
      <ErrorMessage as="p" name="long_description" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>

      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="price" class="me-2">Prix (€)<span class="text-danger">*</span> :</label>
        <Field 
          name = "price"
          class="control-form me-2 w-50"
          placeholder = "Prix"
          v-model="formValues.price"
        />
      </div>
      <ErrorMessage as="p" name="price" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>

      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="poster" class="me-2">Lien Web Couverture<span class="text-danger">*</span> :</label>
        <Field 
          name = "poster"
          class="control-form me-2 w-50"
          placeholder = "Lien Couverture"
          v-model="formValues.poster"
        />
      </div>
      <ErrorMessage as="p" name="poster" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>

      <div class="mb-3 d-flex justify-content-between w-50 input-container">
        <label for="image_local" class="me-2">Image locale<span class="text-danger">*</span> :</label>
        <Field 
          name = "image_local"
          class="control-form me-2 w-50"
          placeholder = "Image"
          v-model="formValues.image_local"
        />
      </div>
      <ErrorMessage as="p" name="image_local" v-slot="{ message }" class="alert alert-danger py-1">
        {{ message }}
      </ErrorMessage>

      <div class="d-flex w-50 data-container">

        <div class="d-flex flex-column w-100 align-items-center">
          
          <div class="mb-3 d-flex justify-content-between w-100 input-container">
            <label for="rating" class="me-2">Note<span class="text-danger">*</span> :</label>
            <Field 
              name = "rating"
              class="control-form me-2 w-50"
              placeholder = "Note"
              v-model="formValues.rating"
            />
          </div>
          <ErrorMessage as="p" name="rating" v-slot="{ message }" class="alert alert-danger py-1">
            {{ message }}
          </ErrorMessage>

        </div>

        <div class="d-flex flex-column w-100 align-items-center">

          <div class="mb-3 d-flex justify-content-between w-100 input-container">
            <label for="size" class="me-2">Taille (MB)<span class="text-danger">*</span> :</label>
            <Field 
              name = "size"
              class="control-form me-2 w-50"
              placeholder = "Taille"
              v-model="formValues.size"
            />
          </div>
          <ErrorMessage as="p" name="size" v-slot="{ message }" class="alert alert-danger py-1">
            {{ message }}
          </ErrorMessage>

        </div>

      </div>

      <div class="d-flex w-50 data-container">

        <div class="d-flex flex-column w-100 align-items-center">

          <div class="mb-3 d-flex justify-content-between w-100 input-container">
            <label for="in_stock" class="me-2">En stock<span class="text-danger">*</span> :</label>
            <Field 
              as="select"
              name = "in_stock"
              class="control-form me-2 w-50"
              placeholder = "En stock"
              v-model="formValues.in_stock"
            >
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </Field>
          </div>
          <ErrorMessage as="p" name="in_stock" v-slot="{ message }" class="alert alert-danger py-1">
            {{ message }}
          </ErrorMessage>

        </div>
        
        <div class="d-flex flex-column w-100 align-items-center">

          <div class="mb-3 d-flex justify-content-between w-100 input-container">
            <label for="best_seller" class="me-2">Best seller<span class="text-danger">*</span> :</label>
            <Field 
              as="select"
              name = "best_seller"
              class="control-form me-2 w-50"
              placeholder = "Best seller"
              v-model="formValues.best_seller"
            >
              <option :value="true">Oui</option>
              <option :value="false">Non</option>
            </Field>
          </div>
          <ErrorMessage as="p" name="best_seller" v-slot="{ message }" class="alert alert-danger py-1">
            {{ message }}
          </ErrorMessage>

        </div>
    
      </div>

      <label class="my-3"><span class="text-danger">*</span>Champs obligatoires</label>

      <button class="btn btn-primary my-3">
        Mettre à jour
      </button>

    </Form>

  </div>

</template>

<script setup>

import  { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup';
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase'
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

const productsCollectionRefs = collection(db, 'products');
const router = useRouter();
const route = useRoute();
const $toast = useToast();

const formSchema = yup.object({

  name: yup.string().required('Ce champ est obligatoire'),
  overview: yup.string().required('Ce champ est obligatoire'),
  rating: yup.number().typeError('Ce champ doit être un nombre').integer('Ce champ doit être un entier').required('Ce champ est obligatoire'),
  long_description: yup.string().required('Ce champ est obligatoire'),
  price: yup.number().typeError('Ce champ doit être un nombre').integer('Ce champ doit être un entier').required('Ce champ est obligatoire'),
  poster: yup.string().url('Ce champ doit être un lien valide').matches(/^http/, 'Ce champ doit commencer par http ou hhtps').required('Ce champ est obligatoire'),
  image_local: yup.string().required('Ce champ est obligatoire'),
  in_stock: yup.boolean().required('Ce champ est obligatoire'),
  size: yup.number().typeError('Ce champ doit être un nombre').integer('Ce champ doit être un entier').required('Ce champ est obligatoire'),
  best_seller: yup.boolean().required('Ce champ est obligatoire'),

});

// Référence aux valeurs du formulaire
const formValues = ref({
  name: '',
  overview: '',
  rating: null,
  long_description: '',
  price: null,
  poster: '',
  image_local: '',
  in_stock: false,
  size: null,
  best_seller: false,
});

// Fonction pour charger les données du produit
async function loadProduct() {

  const productId = route.params.id; // Récupérer l'ID de la route
  const productDocRef = doc(productsCollectionRefs, productId);

  try {
    const productSnapshot = await getDoc(productDocRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      formValues.value = { ...productData };
    } else {
      console.error("Le produit n'existe pas");
      router.push('/'); // Redirige si le produit n'existe pas
    }
  } catch (error) {
    console.error("Erreur lors du chargement du produit :", error);
  }
}

// Charger les données du produit au montage du composant
onMounted(() => {
  loadProduct();
});

async function onSubmit(values) {

  const productId = route.params.id; // Récupérer l'ID de la route
  const productDocRef = doc(productsCollectionRefs, productId);

  try {
    await updateDoc(productDocRef, values);
    $toast.success(`Produit mis à jour avec succès !`);
    console.log('Le produit a été mis à jour avec succès');
    router.push(`/`);
  } catch (error) {
    $toast.error('Oups, une erreur est survenue');
    console.error("Erreur lors de la mise à jour du produit :", error);
  }

}
  
</script>

<style scoped>

  Form {
    width: 100%;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  @media only screen and (max-width: 875px) {
        
    .data-container {
    
      flex-wrap: wrap;
    
    }
    
  }
    
  @media only screen and (max-width: 775px) {
            
    .input-container {
        
      flex-direction: column;
      align-items: center;
      width: 100%;;
        
    }
    
    input, textarea, select {
    
      width: 100% !important;
      margin: 0 !important;
    
    }
        
  }

  @media only screen and (max-width: 775px) {
            
    input, textarea, select {
            
      width: 150% !important;
         
    }
                
  }

</style>