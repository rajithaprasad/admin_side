import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import AdminOrders from "./pages/AdminOrders";
import DriverDashboard from "./pages/DriverDashboard";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => {
  const scrollToBooking = () => {
    const bookingElement = document.getElementById('booking-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminOrders />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/drivers" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <div className="p-6">Admin Drivers Page</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <div className="p-6">Admin Users Page</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminSettings />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Driver Routes */}
            <Route path="/driver" element={
              <ProtectedRoute requiredRole="driver">
                <DashboardLayout>
                  <DriverDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/driver/orders" element={
              <ProtectedRoute requiredRole="driver">
                <DashboardLayout>
                  <div className="p-6">Driver Orders Page</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/driver/settings" element={
              <ProtectedRoute requiredRole="driver">
                <DashboardLayout>
                  <div className="p-6">Driver Settings Page</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Main App Routes */}
            <Route path="/" element={
              <div className="min-h-screen flex flex-col">
                <Header onGetQuoteClick={scrollToBooking} />
                <main className="flex-1">
                  <Home  />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="min-h-screen flex flex-col">
                <Header onGetQuoteClick={scrollToBooking} />
                <main className="flex-1">
                  <About />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/services" element={
              <div className="min-h-screen flex flex-col">
                <Header onGetQuoteClick={scrollToBooking} />
                <main className="flex-1">
                  <Services />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/testimonials" element={
              <div className="min-h-screen flex flex-col">
                <Header onGetQuoteClick={scrollToBooking} />
                <main className="flex-1">
                  <Testimonials />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/blogs" element={
              <div className="min-h-screen flex flex-col">
                <Header onGetQuoteClick={scrollToBooking} />
                <main className="flex-1">
                  <Blogs />
                </main>
                <Footer />
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
