import { motion } from "motion/react";
import { Home, Factory, Package, Settings, BarChart3, Bell } from "lucide-react";
import { cn } from "../ui/utils";
import { ThemeToggle } from "../ui/theme-toggle";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'الرئيسية', icon: Home },
  { id: 'factories', label: 'المصانع', icon: Factory },
  { id: 'orders', label: 'الطلبات', icon: Package },
  { id: 'analytics', label: 'التقارير', icon: BarChart3 },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-card border-l border-border flex flex-col sticky top-0"
    >
      <div className="p-6 border-b border-border">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold bg-gradient-to-l from-primary to-primary/60 bg-clip-text text-transparent"
        >
          سيستم كرتون
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">نظام إدارة المبيعات</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-accent/50 group relative overflow-hidden",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/50 transition-all">
          <Bell className="w-5 h-5" />
          <span>الإشعارات</span>
          <span className="mr-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">3</span>
        </button>
        <div className="flex items-center justify-between px-4">
          <span className="text-sm text-muted-foreground">السمة</span>
          <ThemeToggle />
        </div>
      </div>
    </motion.aside>
  );
}
