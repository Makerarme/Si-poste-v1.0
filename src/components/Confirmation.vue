<template>
  <div class="min-h-screen bg-gray-300 flex items-center justify-center">
    <div class="w-full max-w-3xl">
      <header class="py-4 text-center">
        <img src="@/assets/img/Vector.svg" alt="agoracalycé" class="mx-auto w-64 h-auto" />
      </header>
      <!-- Stepper -->
      <div class="mt-4">
        <Stepper :currentStep="3" />
      </div>
      <div class="bg-gray-400 shadow-md rounded-lg p-8 mt-6">
        <!-- Récapitulatif -->
        <h2 class="text-xl font-bold mb-6">Récapitulatif</h2>
        <div class="mb-8 space-y-4">
          <p class="text-lg">
            <strong>Collaborateur :</strong> {{ form.collaborator.firstName }} {{ form.collaborator.lastName }}
          </p>
          <p class="text-lg">
            <strong>Référent SI :</strong> {{ form.referent.firstName }} {{ form.referent.lastName }}
          </p>
          <p class="text-lg">
            <strong>Type de la demande :</strong> {{ form.requestType }}
          </p>
          <p class="text-lg">
            <strong>Date de la demande :</strong> {{ form.requestDate }}
          </p>
          <p class="text-lg">
            <strong>État du matériel :</strong> {{ form.materialState }}
          </p>
        </div>
        <!-- Tableau -->
        <h3 class="text-lg font-bold mb-4">Liste des matériels :</h3>
        <table class="min-w-full bg-white border border-gray-300 text-lg rounded-md">
          <thead>
          <tr class="bg-gray-300">
            <th class="border px-4 py-3 text-left">Numéro d'inventaire</th>
            <th class="border px-4 py-3 text-left">Désignation</th>
            <th class="border px-4 py-3 text-left">Quantité</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in form.materials" :key="index">
            <td class="border px-4 py-3">{{ item.inventoryNumber }}</td>
            <td class="border px-4 py-3">{{ item.description }}</td>
            <td class="border px-4 py-3">{{ item.quantity }}</td>
          </tr>
          </tbody>
        </table>
        <!-- Boutons -->
        <div class="flex justify-between mt-8">
          <button
              @click="goBack"
              class="px-8 py-3 text-pink-700 border border-pink-700 rounded-md hover:bg-pink-100 text-lg"
          >
            Retour
          </button>
          <button
              @click="generatePDF"
              class="px-8 py-3 bg-pink-700 text-white rounded-md shadow-lg hover:bg-pink-800 text-lg"
          >
            Générer le PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
import { useFormStore } from "@/stores/useFormStore";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "Confirmation",
  components: { Stepper },
  setup() {
    const formStore = useFormStore();
    return { form: formStore.form };
  },
  methods: {
    goBack() {
      this.$router.push("/info-materiel");
    },
    generatePDF() {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Charger le logo
      const imgPath = new URL("@/assets/img/Vector.png", import.meta.url).href; // Utiliser une URL compatible avec Vite
      const img = new Image();
      img.src = imgPath;

      img.onload = () => {
        // Ajouter le logo en haut à gauche
        doc.addImage(img, "PNG", 10, 10, 50, 9); // Position (10, 10), Taille (50, 9)

        // Titre (adapté au Type de la demande, centré)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        const objectText =
            this.form.requestType === "Restitution de matériel"
                ? "Objet : Attestation de restitution de matériel"
                : "Objet : Attestation de mise à disposition de matériel";
        const objectTextWidth = doc.getTextWidth(objectText);
        doc.text(objectText, (pageWidth - objectTextWidth) / 2, 40);

        // Texte principal (adapté au genre)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const collaboratorName = `${this.form.collaborator.firstName || "N/A"} ${this.form.collaborator.lastName || "N/A"}`;
        const referentName = `${this.form.referent.firstName || ""} ${this.form.referent.lastName || ""}`;
        const requestDate = this.form.requestDate || "N/A";

        const genderText =
            this.form.gender === "Masculin"
                ? "salarié ou collaborateur"
                : "salariée ou collaboratrice";

        const text = `Je soussigné ${collaboratorName}, ${genderText}
de la société AGORA CALYCE, reconnais avoir reçu en date du ${requestDate} le matériel suivant pour l'exécution de ma mission au sein de l'entreprise.`;
        const textLines = doc.splitTextToSize(text, pageWidth - 40);
        doc.text(textLines, 20, 50);

        // Tableau des matériels
        const tableData = this.form.materials.map((item) => [
          item.inventoryNumber || "N/A",
          item.description || "N/A",
          item.quantity || "N/A",
        ]);
        doc.autoTable({
          startY: 80,
          head: [["Numéro d'inventaire", "Désignation", "Quantité"]],
          body: tableData,
          theme: "grid",
          headStyles: { fillColor: [182, 9, 66], textColor: [255, 255, 255] }, // Rose pour l'en-tête
          styles: {
            halign: "center", // Centrer le texte dans les cellules
            textColor: [0, 0, 0], // Texte noir
            lineColor: [150, 150, 150], // Contour gris
            lineWidth: 0.5, // Épaisseur des bordures
          },
        });

        if (this.form.requestType === "Restitution de matériel") {
          const finalY = doc.autoTable.previous.finalY + 10;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text("État du matériel :", 20, finalY);
          doc.setFont("helvetica", "normal");
          doc.text(this.form.materialState || "N/A", 60, finalY);
        }

        // Footer
        const finalFooterY = doc.autoTable.previous.finalY + 30;
        const leftColumnX = 20;
        const rightColumnX = pageWidth / 2 + 10;

        doc.text(`Date : ${requestDate}`, leftColumnX, finalFooterY);
        doc.text(`Nom du SI : ${referentName}`, leftColumnX, finalFooterY + 10);
        doc.text(`Nom du bénéficiaire : ${collaboratorName}`, rightColumnX, finalFooterY + 10);
        doc.text("Signature :", leftColumnX, finalFooterY + 30);
        doc.text("Signature :", rightColumnX, finalFooterY + 30);

        // Nom personnalisé du fichier PDF
        const fileType = this.form.requestType === "Restitution de matériel" ? "Restitution" : "Mise_a_disposition";
        const fileName = `Attestation_${fileType}_${collaboratorName.replace(/\s+/g, "_")}.pdf`;

        // Générer le PDF
        doc.save(fileName);
      };

      img.onerror = () => {
        console.error("Erreur lors du chargement du logo");
      };
    }



  },
};
</script>
