import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const { toast } = useToast();

  const handleSaveStripeKeys = () => {
    // In a real app, this would save to database
    toast({
      title: "Settings saved",
      description: "Stripe API keys have been saved successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your system settings</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Stripe API Settings</CardTitle>
          <CardDescription>Configure Stripe payment integration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="publishable-key">Stripe Publishable Key</Label>
            <Input
              id="publishable-key"
              placeholder="pk_test_..."
              value={stripePublishableKey}
              onChange={(e) => setStripePublishableKey(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret-key">Stripe Secret Key</Label>
            <Input
              id="secret-key"
              type="password"
              placeholder="sk_test_..."
              value={stripeSecretKey}
              onChange={(e) => setStripeSecretKey(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveStripeKeys} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save API Keys</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}