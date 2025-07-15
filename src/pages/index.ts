import { lazy } from 'react';

export const Home = lazy(() => import('./Home'));
export const AboutUs = lazy(() => import('./AboutUs'));
export const HomestayDetail = lazy(() => import('./HomestayDetail'));
export const AdminLogin = lazy(() => import('./admin/Login'));
export const AdminDashboard = lazy(() => import('./admin/Dashboard'));
export const ContactUs = lazy(() => import('../components/ContactUs')); 