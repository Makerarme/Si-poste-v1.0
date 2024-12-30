import { createRouter, createWebHistory } from 'vue-router';
import InfoGenerale from '../components/InfoGenerale.vue';
import InfoMateriel from '../components/InfoMateriel.vue';
import Confirmation from '../components/Confirmation.vue';

const routes = [
  {
    path: '/',
    name: 'InfoGenerale',
    component: InfoGenerale,
  },
  {
    path: '/info-materiel',
    name: 'InfoMateriel',
    component: InfoMateriel,
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
