import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import PropertyDetail from "./pages/PropertyDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import RotasDoSol from "./pages/RotasDoSol";
import GardenHouse from "./pages/GardenHouse";
import PedrasBrancas from "./pages/PedrasBrancas";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProjectsList from "./pages/admin/ProjectsList";
import ProjectForm from "./pages/admin/ProjectForm";
import PropertiesList from "./pages/admin/PropertiesList";
import PropertyForm from "./pages/admin/PropertyForm";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/empreendimentos" element={<Projects />} />
              <Route path="/empreendimentos/:slug" element={<ProjectDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PropertyDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/artigo/:slug" element={<BlogPost />} />
              <Route path="/rotas-do-sol" element={<RotasDoSol />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/empreendimentos" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
              <Route path="/admin/empreendimentos/novo" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
              <Route path="/admin/empreendimentos/:slug" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
              <Route path="/admin/imoveis" element={<ProtectedRoute><PropertiesList /></ProtectedRoute>} />
              <Route path="/admin/imoveis/novo" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
              <Route path="/admin/imoveis/:slug" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
