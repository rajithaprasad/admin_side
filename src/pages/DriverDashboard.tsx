import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderCard } from "@/components/OrderCard";
import { Package, MapPin, Clock, DollarSign, Navigation, CreditCard, Plus } from "lucide-react";

const driverStats = [
  {
    title: "Today's Deliveries",
    value: "8",
    subtitle: "2 remaining",
    icon: Package,
    color: "text-primary",
  },
  {
    title: "Distance Covered",
    value: "127 km",
    subtitle: "This week",
    icon: Navigation,
    color: "text-accent",
  },
  {
    title: "Earnings Today",
    value: "$245.50",
    subtitle: "+$45 from yesterday",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Average Rating",
    value: "4.8",
    subtitle: "Based on 156 reviews",
    icon: Clock,
    color: "text-warning",
  },
];

type OrderStatus = 'new' | 'assigned' | 'accepted' | 'pickup' | 'in-progress' | 'completed';

interface Order {
  id: string;
  pickup: string;
  delivery: string;
  status: OrderStatus;
  amount: string;
  estimatedTime: string;
  customer: string;
  customerPhone?: string;
}

const newOrders: Order[] = [
  {
    id: "ORD-004",
    pickup: "789 Pine Rd, Westside",
    delivery: "321 Elm St, Eastside",
    status: "new",
    amount: "$32.50",
    estimatedTime: "35 min",
    customer: "Sarah Wilson",
    customerPhone: "+44 7700 900123"
  },
  {
    id: "ORD-005",
    pickup: "654 Cedar Blvd, Northtown", 
    delivery: "987 Birch Lane, Southtown",
    status: "new",
    amount: "$58.75",
    estimatedTime: "45 min",
    customer: "David Brown",
    customerPhone: "+44 7700 900124"
  },
];

// Dummy users data
const dummyUsers = [
  { id: "U001", name: "John Smith", phone: "+44 7700 900125", email: "john@example.com" },
  { id: "U002", name: "Sarah Wilson", phone: "+44 7700 900123", email: "sarah@example.com" },
  { id: "U003", name: "David Brown", phone: "+44 7700 900124", email: "david@example.com" },
  { id: "U004", name: "Emily Davis", phone: "+44 7700 900126", email: "emily@example.com" },
  { id: "U005", name: "Michael Wilson", phone: "+44 7700 900127", email: "michael@example.com" },
];

// Dummy drivers data
const dummyDrivers = [
  { id: "D001", name: "Alex Johnson", phone: "+44 7700 900200", vehicle: "Small Van", rating: 4.8 },
  { id: "D002", name: "Lisa Chen", phone: "+44 7700 900201", vehicle: "Medium Van", rating: 4.9 },
  { id: "D003", name: "Mark Thompson", phone: "+44 7700 900202", vehicle: "Large Van", rating: 4.7 },
];

const initialMyOrders: Order[] = [
  {
    id: "ORD-002",
    pickup: "789 Oak St, Central",
    delivery: "456 Pine Ave, North",
    status: "accepted",
    amount: "$67.50",
    estimatedTime: "30 min", 
    customer: "Emily Davis",
    customerPhone: "+44 7700 900126"
  },
  {
    id: "ORD-003",
    pickup: "321 Elm Rd, South",
    delivery: "654 Birch Lane, West", 
    status: "pickup",
    amount: "$52.25",
    estimatedTime: "40 min",
    customer: "Michael Wilson",
    customerPhone: "+44 7700 900127"
  },
];


export default function DriverDashboard() {
  const [myOrders, setMyOrders] = useState(initialMyOrders);

  const handleAcceptOrder = (orderId: string) => {
    // Check in new orders and move to my orders
    const newOrder = newOrders.find(o => o.id === orderId);
    if (newOrder) {
      setMyOrders(prev => [...prev, { ...newOrder, status: "accepted" }]);
    }
  };

  const handlePickupOrder = (orderId: string) => {
    setMyOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: "pickup" } : order
    ));
  };

  const handleCompleteOrder = (orderId: string) => {
    setMyOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: "completed" } : order
    ));
  };

  const handleConnectStripe = () => {
    alert("Connect to Stripe integration would be handled here");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Dashboard</h1>
          <p className="text-muted-foreground">Manage your deliveries and track earnings</p>
        </div>
        <Button onClick={handleConnectStripe} className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Integrate Stripe</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {driverStats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Management */}
      <Tabs defaultValue="new" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Orders ({newOrders.length})
          </TabsTrigger>
          <TabsTrigger value="my-orders" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            My Orders ({myOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">New Orders</CardTitle>
              <CardDescription>Newly created orders by customers - view details to accept</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No new orders available
                  </div>
                ) : (
                  newOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onAccept={handleAcceptOrder}
                      showActions={true}
                      showViewButton={true}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="my-orders">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">My Orders</CardTitle>
              <CardDescription>Orders you've accepted and are managing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active orders
                  </div>
                ) : (
                  myOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onPickup={handlePickupOrder}
                      onComplete={handleCompleteOrder}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}