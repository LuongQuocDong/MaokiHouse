import { lazy } from 'react';

export const Home = lazy(() => import('./Home'));
export const AboutUs = lazy(() => import('./AboutUs'));
export const HomestayDetail = lazy(() => import('./HomestayDetail'));
export const AdminLogin = lazy(() => import('./admin/Login'));
export const ContactUs = lazy(() => import('../components/ContactUs'));

export const DashboardLayout = lazy(() => import('../components/dashboard/DashboardLayout'));
export const DashboardOverview = lazy(() => import('./dashboard/Overview'));
export const DashboardProperties = lazy(() => import('./dashboard/Properties'));
export const DashboardBookings = lazy(() => import('./dashboard/Bookings'));
export const DashboardCalendar = lazy(() => import('./dashboard/CalendarView'));
export const DashboardMessages = lazy(() => import('./dashboard/Messages'));
export const DashboardRevenue = lazy(() => import('./dashboard/Revenue'));
export const DashboardHR = lazy(() => import('./dashboard/HR'));
export const DashboardAISupport = lazy(() => import('./dashboard/AISupport'));
export const DashboardChannels = lazy(() => import('./dashboard/Channels'));
