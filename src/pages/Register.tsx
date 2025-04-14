
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, UserPlus, Phone, Sun, Moon } from "lucide-react";
import { User } from "@/types";
import { saveUser, getUserByEmail } from "@/utils/storage";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();

  useEffect(() => {
    // Apply theme when component mounts or theme changes
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !phone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Use the register function from useAuth
      const result = await register(name, email, "");
      
      if (result.success) {
        setTemporaryPassword(result.temporaryPassword);
        
        toast({
          title: "Sucesso",
          description: "Conta criada com sucesso!",
        });
      } else {
        toast({
          title: "Erro",
          description: "Este e-mail já está em uso!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar a conta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Alterar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Escuro</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="w-full max-w-md dark:bg-gray-800 transition-colors duration-200">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-freight-600 p-3 rounded-full">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center dark:text-white">Criar Conta</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            Cadastre-se para começar a usar o Frete Pro
          </CardDescription>
        </CardHeader>
        <CardContent>
          {temporaryPassword ? (
            <div className="space-y-4">
              <div className="p-4 border border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                <h3 className="font-semibold mb-2">Senha Temporária</h3>
                <p className="text-sm mb-2">Use a senha abaixo para fazer seu primeiro acesso:</p>
                <div className="bg-white dark:bg-gray-700 p-3 rounded-md text-center font-mono">
                  {temporaryPassword}
                </div>
                <p className="text-xs mt-2 text-yellow-600 dark:text-yellow-400">Importante: Guarde esta senha! Você precisará alterá-la no primeiro acesso.</p>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Ir para Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-white">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-white">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-freight-600 hover:bg-freight-700"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Registrar"}
                {!isLoading && <UserPlus className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}

          {!temporaryPassword && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-freight-600 hover:underline dark:text-freight-400">
                  Faça login
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
