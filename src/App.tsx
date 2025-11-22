import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Main from "./pages/Main";
import IntroCall from "./pages/IntroCall";
import ExtendedCall from "./pages/ExtendedCall";
import MatchSuccess from "./pages/MatchSuccess";
import Matches from "./pages/Matches";
import MatchProfile from "./pages/MatchProfile";
import VerityPlus from "./pages/VerityPlus";
import Checkout from "./pages/Checkout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/main" element={<Main />} />
          <Route path="/intro-call" element={<IntroCall />} />
          <Route path="/extended-call" element={<ExtendedCall />} />
          <Route path="/match-success" element={<MatchSuccess />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match/:matchId" element={<MatchProfile />} />
          <Route path="/upgrade" element={<VerityPlus />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
