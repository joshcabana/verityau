import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import Main from "./pages/Main";
import IntroCall from "./pages/IntroCall";
import ExtendedCall from "./pages/ExtendedCall";
import MatchSuccess from "./pages/MatchSuccess";
import Matches from "./pages/Matches";
import MatchProfile from "./pages/MatchProfile";
import WhoLikedYou from "./pages/WhoLikedYou";
import VerityPlus from "./pages/VerityPlus";
import Checkout from "./pages/Checkout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ProfileEdit from "./pages/ProfileEdit";
import VerityDateWaiting from "./pages/VerityDateWaiting";
import VerityDateCall from "./pages/VerityDateCall";
import VerityDateFeedback from "./pages/VerityDateFeedback";
import AdminVerification from "./pages/AdminVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Protected Routes */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
          <Route path="/intro-call" element={<ProtectedRoute><IntroCall /></ProtectedRoute>} />
          <Route path="/extended-call" element={<ProtectedRoute><ExtendedCall /></ProtectedRoute>} />
          <Route path="/match-success" element={<ProtectedRoute><MatchSuccess /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/match/:matchId" element={<ProtectedRoute><MatchProfile /></ProtectedRoute>} />
          <Route path="/who-liked-you" element={<ProtectedRoute><WhoLikedYou /></ProtectedRoute>} />
          <Route path="/upgrade" element={<ProtectedRoute><VerityPlus /></ProtectedRoute>} />
          <Route path="/verity-plus" element={<ProtectedRoute><VerityPlus /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/verity-date/waiting" element={<ProtectedRoute><VerityDateWaiting /></ProtectedRoute>} />
          <Route path="/verity-date/call" element={<ProtectedRoute><VerityDateCall /></ProtectedRoute>} />
          <Route path="/verity-date/feedback" element={<ProtectedRoute><VerityDateFeedback /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
          <Route path="/admin/verification" element={<ProtectedRoute><AdminVerification /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
