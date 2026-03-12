import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import DriversSection from "./components/DriversSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import RacesSection from "./components/RacesSection";
import SponsorsSection from "./components/SponsorsSection";
import StatsBar from "./components/StatsBar";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient();

function AppContent() {
  const { actor } = useActor();

  useEffect(() => {
    if (!actor) return;
    const init = async () => {
      try {
        const [drivers, races] = await Promise.all([
          actor.getDrivers(),
          actor.getRaces(),
        ]);
        if (drivers.length === 0 && races.length === 0) {
          await actor.initSeedData();
          await queryClient.invalidateQueries();
        }
      } catch {
        // Silently ignore seed data errors
      }
    };
    init();
  }, [actor]);

  return (
    <div className="bg-[#050505] min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <DriversSection />
        <RacesSection />
        <AchievementsSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f0500",
            border: "1px solid rgba(255,69,0,0.4)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
