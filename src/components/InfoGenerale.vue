<template>
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">
    <div class="w-full max-w-3xl">
      <header class="py-4 text-center">
        <img src="@/assets/img/Vector.svg" alt="agoracalycé" class="mx-auto w-64 h-auto" />
      </header>
      <!-- Stepper -->
      <div class="mt-4">
        <Stepper :currentStep="1" />
      </div>
      <div class="bg-gray-400 shadow-md rounded-lg p-8 mt-6">
        <!-- Formulaire -->
        <form @submit.prevent="handleSubmit">
          <h2 class="text-xl font-bold mb-6">Information Générale</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Collaborateur -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Salarié(e) ou Collaborateur/trice - Prénom</label>
              <input
                  v-model="form.collaborator.firstName"
                  type="text"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
                  placeholder="Prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Salarié(e) ou Collaborateur/trice - Nom</label>
              <input
                  v-model="form.collaborator.lastName"
                  type="text"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
                  placeholder="Nom"
              />
            </div>
            <!-- Genre -->
            <div class="col-span-2 flex items-center space-x-8">
              <label class="text-sm font-medium text-gray-700">Genre</label>
              <label class="inline-flex items-center">
                <input
                    v-model="form.gender"
                    type="radio"
                    value="Féminin"
                    class="form-radio text-pink-600"
                />
                <span class="ml-2 text-lg">Féminin</span>
              </label>
              <label class="inline-flex items-center">
                <input
                    v-model="form.gender"
                    type="radio"
                    value="Masculin"
                    class="form-radio text-pink-600"
                />
                <span class="ml-2 text-lg">Masculin</span>
              </label>
            </div>
            <!-- Référent SI -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Référent(e) SI - Prénom</label>
              <input
                  v-model="form.referent.firstName"
                  type="text"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
                  placeholder="Prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Référent(e) SI - Nom</label>
              <input
                  v-model="form.referent.lastName"
                  type="text"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
                  placeholder="Nom"
              />
            </div>
            <!-- Nature de la demande -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Nature de la demande</label>
              <select
                  v-model="form.requestType"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
              >
                <option value="Restitution de matériel">Mise à disposition</option>
                <option value="Mise a disposition">Restitution de matériel</option>
              </select>
            </div>
            <!-- Date de la demande -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Date de la demande</label>
              <input
                  v-model="form.requestDate"
                  type="date"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-600 focus:border-pink-600 text-lg p-3"
              />
            </div>
          </div>
          <!-- Bouton Suivant -->
          <div class="text-right">
            <button
                type="submit"
                class="px-8 py-3 bg-pink-700 text-white rounded-md shadow-lg hover:bg-pink-800 text-lg"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
import { useFormStore } from "@/stores/useFormStore";

export default {
  name: "InfoGenerale",
  components: { Stepper },
  setup() {
    const formStore = useFormStore();
    return { form: formStore.form, updateForm: formStore.updateForm };
  },
  methods: {
    handleSubmit() {
      this.updateForm(this.form);
      this.$router.push("/info-materiel");
    },
  },
};
</script>
