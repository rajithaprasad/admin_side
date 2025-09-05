import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Chrome, Eye, EyeOff, Truck, Package, Shield, User } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = register(email, password, name);
      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to MoveXpress!",
        });
        navigate("/");
      } else {
        toast({
          title: "Registration failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast({
      title: "Google Sign-Up",
      description: "Google authentication would be implemented here",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 animate-gradient-x"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-[0.03]"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/10 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full animate-pulse-slower"></div>
      
      {/* Floating icons with different animations */}
      <div className="absolute top-20 left-10 animate-float">
        <Truck className="w-10 h-10 text-blue-400/40" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float animation-delay-2000">
        <Package className="w-8 h-8 text-purple-400/40" />
      </div>
      <div className="absolute bottom-1/4 left-20 animate-float animation-delay-3000">
        <Shield className="w-7 h-7 text-indigo-400/40" />
      </div>
      <div className="absolute top-1/2 right-1/4 animate-float animation-delay-1500">
        <User className="w-6 h-6 text-pink-400/40" />
      </div>
      
      {/* Moving gradient orbs */}
      <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-move-orb-1"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-move-orb-2"></div>
      
      <Card className="w-full max-w-md relative z-10 border-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Decorative header gradient */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <CardHeader className="space-y-1 text-center pb-8 pt-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Join MoveXpress for reliable moving and delivery services
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-8 pb-8">
          <Button 
            variant="outline" 
            className="w-full h-12 border-2 hover:border-blue-300 transition-all duration-300 group relative overflow-hidden" 
            onClick={handleGoogleSignUp}
            type="button"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Chrome className="mr-3 h-5 w-5 text-blue-500" />
            Continue with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-border/50" />
            </div>
            <div className="relative flex justify-center text-sm uppercase tracking-wider">
              <span className="bg-card px-4 text-muted-foreground font-medium">
                Or with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 border-2 focus:border-blue-300 transition-colors rounded-xl"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 focus:border-blue-300 transition-colors rounded-xl"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 focus:border-blue-300 transition-colors pr-12 rounded-xl"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors rounded-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 border-2 focus:border-blue-300 transition-colors rounded-xl"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}