import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { FactoryDetails } from "./pages/FactoryDetails";
import { OrderManagement } from "./pages/OrderManagement";
import { ThemeProvider } from "./components/theme-provider";

type Page = 'dashboard' | 'factory-details' | 'orders';

interface NavigationState {
  page: Page;
  factoryId?: string;
  companyId?: string;
}

export default function App() {
  const [navState, setNavState] = useState<NavigationState>({ page: 'dashboard' });

  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      setNavState({ page: 'dashboard' });
    }
  };

  const handleNavigateToFactory = (factoryId: string) => {
    setNavState({ page: 'factory-details', factoryId });
  };

  const handleNavigateToOrders = (companyId: string) => {
    setNavState({ ...navState, page: 'orders', companyId });
  };

  const handleBackToDashboard = () => {
    setNavState({ page: 'dashboard' });
  };

  const handleBackToFactory = () => {
    setNavState({ page: 'factory-details', factoryId: navState.factoryId });
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="size-full flex bg-background">
        <Sidebar currentPage={navState.page === 'dashboard' ? 'dashboard' : 'factories'} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={navState.page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {navState.page === 'dashboard' && (
            <Dashboard onNavigateToFactory={handleNavigateToFactory} />
          )}
          {navState.page === 'factory-details' && navState.factoryId && (
            <FactoryDetails
              factoryId={navState.factoryId}
              onBack={handleBackToDashboard}
              onNavigateToOrders={handleNavigateToOrders}
            />
          )}
          {navState.page === 'orders' && navState.companyId && (
            <OrderManagement
              companyId={navState.companyId}
              onBack={handleBackToFactory}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-8 left-8 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <div className="relative px-4 py-2 bg-card/80 backdrop-blur-md border border-border rounded-full shadow-lg">
            <p className="text-sm text-muted-foreground">سيستم كرتون - نظام إدارة المبيعات</p>
          </div>
        </motion.div>
      </div>
      </div>
    </ThemeProvider>
  );
}