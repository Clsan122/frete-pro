
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  LogOut, 
  User, 
  Home, 
  Sun,
  Moon,
  Menu as MenuIcon,
  LayoutDashboard
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const Sidebar = () => (
    <aside className={`
      fixed top-0 left-0 z-40 h-screen transition-transform
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
    `}>
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Sistema de Fretes</h2>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-freight-200 flex items-center justify-center text-freight-800 mr-3">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "Usuário"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="justify-start w-full"
              onClick={() => handleNavigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start w-full"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Modo Escuro
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Modo Claro
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              className="justify-start w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
  
  const MobileSidebar = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="p-0 w-64">
        <SheetHeader className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <SheetTitle className="text-left">Sistema de Fretes</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <Button 
            variant="outline" 
            className="w-full justify-start mb-2"
            onClick={() => handleNavigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-freight-200 flex items-center justify-center text-freight-800 mr-3">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "Usuário"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="justify-start w-full"
              onClick={() => handleNavigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start w-full"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Modo Escuro
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Modo Claro
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              className="justify-start w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      {isMobile && <MobileSidebar />}
      
      <div className={`md:ml-64 min-h-screen pb-16 md:pb-0`}>
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">
              Sistema de Fretes
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleNavigate("/dashboard")}
              className="gap-1 hidden md:flex"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => handleNavigate("/profile")}
              className="flex items-center hidden md:flex"
            >
              <div className="h-8 w-8 rounded-full bg-freight-200 flex items-center justify-center text-freight-800 mr-2">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="hidden lg:inline-block">{user?.name || "Usuário"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="hidden md:flex"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        <main>
          {children}
        </main>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;
