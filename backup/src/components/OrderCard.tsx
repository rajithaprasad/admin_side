import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SignaturePad, SignaturePadRef } from "@/components/SignaturePad";
import { MapPin, Package, Clock, User, Map } from "lucide-react";

interface Order {
  id: string;
  pickup: string;
  delivery: string;
  status: 'new' | 'assigned' | 'accepted' | 'pickup' | 'in-progress' | 'completed';
  amount: string;
  estimatedTime: string;
  customer: string;
  customerPhone?: string;
}

interface OrderCardProps {
  order: Order;
  onAccept?: (orderId: string) => void;
  onPickup?: (orderId: string) => void;
  onComplete?: (orderId: string) => void;
  showActions?: boolean;
  showViewButton?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "new": return "bg-blue-500 text-white";
    case "assigned": return "bg-yellow-500 text-white";
    case "accepted": return "bg-orange-500 text-white";
    case "pickup": return "bg-purple-500 text-white";
    case "in-progress": return "bg-info text-white";
    case "completed": return "bg-success text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

export function OrderCard({ order, onAccept, onPickup, onComplete, showActions = true, showViewButton = false }: OrderCardProps) {
  const [showSignature, setShowSignature] = useState(false);
  const [signature, setSignature] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const signaturePadRef = useRef<SignaturePadRef>(null);

  const handlePickup = () => {
    if (order.status === "accepted") {
      onPickup?.(order.id);
    }
  };

  const handleCompleteWithSignature = () => {
    if (!signaturePadRef.current?.isEmpty()) {
      const signatureData = signaturePadRef.current?.getSignature();
      onComplete?.(order.id);
      setShowSignature(false);
      signaturePadRef.current?.clear();
    }
  };

  const handleAcceptOrder = () => {
    onAccept?.(order.id);
    setShowOrderDetails(false);
  };

  return (
    <Card className="border border-border rounded-lg bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Package className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{order.id}</p>
              <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>
              {order.status.replace('-', ' ')}
            </Badge>
            <span className="font-medium text-foreground">{order.amount}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">Pickup: {order.pickup}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm text-foreground">Delivery: {order.delivery}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Est. time: {order.estimatedTime}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            {order.status === "assigned" && (
              <Button 
                size="sm" 
                onClick={() => onAccept?.(order.id)}
                className="flex-1"
              >
                Accept Order
              </Button>
            )}
            
            {order.status === "accepted" && (
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handlePickup}
                className="flex-1"
              >
                Start Pickup
              </Button>
            )}

            {order.status === "pickup" && (
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => setShowSignature(true)}
                className="flex-1"
              >
                Complete Delivery
              </Button>
            )}

            {(order.status === "in-progress" || order.status === "completed") && (
              <Button size="sm" variant="outline" disabled className="flex-1">
                {order.status === "completed" ? "Completed" : "In Progress"}
              </Button>
            )}

            <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details - {order.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer Information
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {order.customer}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerPhone || "Not provided"}</p>
                      <p><span className="font-medium">Status:</span> 
                        <Badge className={`ml-2 ${getStatusColor(order.status)}`}>
                          {order.status.replace('-', ' ')}
                        </Badge>
                      </p>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Route Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full mt-1"></div>
                        <div>
                          <p className="font-medium">Pickup Location</p>
                          <p className="text-muted-foreground">{order.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full mt-1"></div>
                        <div>
                          <p className="font-medium">Delivery Location</p>
                          <p className="text-muted-foreground">{order.delivery}</p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p><span className="font-medium">Estimated Time:</span> {order.estimatedTime}</p>
                        <p><span className="font-medium">Amount:</span> {order.amount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Map className="w-4 h-4" />
                      Route Map
                    </h3>
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Map className="w-8 h-8 mx-auto mb-2" />
                        <p>Interactive map would be shown here</p>
                        <p className="text-xs mt-1">Pickup: {order.pickup}</p>
                        <p className="text-xs">Delivery: {order.delivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Accept Order Button for New Orders */}
                  {order.status === "new" && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAcceptOrder}
                        className="flex-1"
                      >
                        Accept Order
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Signature Dialog */}
        <Dialog open={showSignature} onOpenChange={setShowSignature}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Customer Signature Required</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SignaturePad
                ref={signaturePadRef}
                onSignatureChange={setSignature}
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSignature(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCompleteWithSignature}
                  disabled={signaturePadRef.current?.isEmpty() !== false}
                  className="flex-1"
                >
                  Complete Delivery
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}