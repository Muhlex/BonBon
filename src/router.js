import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import ReceiptEdit from '@/views/ReceiptEdit';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/receipt/new', component: ReceiptEdit, name: 'ReceiptNew' },
    { path: '/receipt/:id/edit', component: ReceiptEdit, name: 'ReceiptEdit' },
  ],
});
export default router;
