import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { signIn, user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to admin dashboard when user is authenticated and is admin
  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
      } else {
        setSignUpSuccess(true);
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4">
      <Card className="w-full max-w-md border-border/50 shadow-elevated">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Al-Imran Muslim Aid" className="w-16 h-16 rounded-full object-cover" />
          </div>
          <CardTitle className="font-serif text-2xl">{isSignUp ? "Create Admin Account" : "Admin Login"}</CardTitle>
          <CardDescription>{isSignUp ? "Sign up to access the dashboard" : "Sign in to access the dashboard"}</CardDescription>
        </CardHeader>
        <CardContent>
          {signUpSuccess ? (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-lg bg-success/10 text-success text-sm">
                <p className="font-semibold mb-2">Account created successfully!</p>
                <p>Please verify your email before signing in. Check your inbox for a verification link.</p>
              </div>
              <Button onClick={() => {
                setIsSignUp(false);
                setSignUpSuccess(false);
              }} className="w-full">
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@alimranmuslimaid.org" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold" disabled={loading}>
                <Lock className="w-4 h-4 mr-2" />
                {loading ? (isSignUp ? "Creating..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
              >
                {isSignUp ? "Back to login" : "Don't have an account? Sign up"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
