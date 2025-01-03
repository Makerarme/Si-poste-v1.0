<template>
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">
    <div class="w-full max-w-3xl">
      <header class="py-4 text-center">
        <img src="@/assets/img/Vector.svg" alt="agoracalycé" class="mx-auto w-64 h-auto" />
      </header>
      <!-- Stepper -->
      <div class="mt-4">
        <Stepper :currentStep="2" />
      </div>
      <div class="bg-gray-400 shadow-md rounded-lg p-8 mt-6">
        <!-- Formulaire -->
        <h2 class="text-xl font-bold mb-6">Information Matériel</h2>
        <div class="grid grid-cols-1 gap-6 mb-6">
          <!-- État du matériel -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">État du matériel</label>
            <select
                v-model="form.materialState"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
            >
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
              <option value="Mauvais état">Mauvais état</option>
            </select>
          </div>
          <!-- Liste des matériels -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">Liste des matériels</label>
            <table class="min-w-full bg-white border border-gray-300 text-base rounded-md">
              <thead>
              <tr class="bg-gray-300">
                <th class="border px-3 py-2 text-left">Numéro d'inventaire</th>
                <th class="border px-3 py-2 text-left">Désignation</th>
                <th class="border px-3 py-2 text-left">Quantité</th>
                <th class="border px-3 py-2 text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in form.materials" :key="index">
                <td class="border px-3 py-2">
                  <input
                      v-model="item.inventoryNumber"
                      type="text"
                      class="w-full border-gray-300 rounded focus:ring-pink-600 focus:border-pink-600 text-base p-1"
                      placeholder="AGC-XXXX"
                  />
                </td>
                <td class="border px-3 py-2">
                  <input
                      v-model="item.description"
                      type="text"
                      class="w-full border-gray-300 rounded focus:ring-pink-600 focus:border-pink-600 text-base p-1"
                      placeholder="Dell Latitude"
                  />
                </td>
                <td class="border px-3 py-2">
                  <input
                      v-model="item.quantity"
                      type="number"
                      min="1"
                      class="w-full border-gray-300 rounded focus:ring-pink-600 focus:border-pink-600 text-base p-1"
                      placeholder="1"
                  />
                </td>
                <td class="border px-3 py-2 text-center">
                  <button
                      type="button"
                      @click="removeMaterial(index)"
                      class="text-pink-700 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <button
                type="button"
                @click="addMaterial"
                class="mt-4 text-pink-700 hover:underline"
            >
              + ajouter une ligne
            </button>
          </div>
        </div>
        <!-- Boutons -->
        <div class="flex justify-between mt-8">
          <button
              @click="goBack"
              class="px-8 py-3 text-pink-700 border border-pink-700 rounded-md hover:bg-pink-100 text-lg"
          >
            Retour
          </button>
          <button
              @click="goNext"
              class="px-8 py-3 bg-pink-700 text-white rounded-md shadow-lg hover:bg-pink-800 text-lg"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
import { useFormStore } from "@/stores/useFormStore";

export default {
  name: "InfoMateriel",
  components: { Stepper },
  setup() {
    const formStore = useFormStore();
    return { form: formStore.form, updateForm: formStore.updateForm };
  },
  methods: {
    addMaterial() {
      this.form.materials.push({inventoryNumber: "", description: "", quantity: 1});
    },
    removeMaterial(index) {
      this.form.materials.splice(index, 1);
    },
    goBack() {
      this.updateForm(this.form); // Met à jour l'état global
      this.$router.push("/"); // Retour à Info Générale
    },
    goNext() {
      this.updateForm(this.form); // Met à jour l'état global
      this.$router.push("/confirmation"); // Naviguer vers la page Confirmation
    },
  },
};
</script>
