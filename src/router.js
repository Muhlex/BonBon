import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import Receipts from '@/views/Receipts';
import ReceiptEdit from '@/views/ReceiptEdit';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/receipts', component: Receipts, name: 'Receipts' },
    { path: '/receipts/new', component: ReceiptEdit, name: 'ReceiptNew' },
    { path: '/receipts/:id/edit', component: ReceiptEdit, name: 'ReceiptEdit' },
  ],
});
export default router;
