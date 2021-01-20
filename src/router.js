import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home';
import SignIn from '@/views/SignIn';
import Receipts from '@/views/Receipts';
import Receipt from '@/views/Receipt';
import ReceiptEdit from '@/views/ReceiptEdit';
import Settings from '@/views/Settings';
import Stats from '@/views/Stats';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/signin', component: SignIn, name: 'SignIn' },
    { path: '/receipts', component: Receipts, name: 'Receipts' },
    { path: '/receipts/new', component: ReceiptEdit, name: 'ReceiptNew' },
    { path: '/receipts/:id', component: Receipt, name: 'Receipt' },
    { path: '/receipts/:id/edit', component: ReceiptEdit, name: 'ReceiptEdit' },
    { path: '/settings', component: Settings, name: 'Settings' },
    { path: '/stats', component: Stats, name: 'Stats' },
  ],
});

export default router;
