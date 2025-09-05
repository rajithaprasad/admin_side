import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  Truck, 
  DollarSign, 
  Eye,
  MapPin
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const adminStats = [
  {
    title: "Total Orders",
    value: "1,234",
    subtitle: "+12% from last month",
    icon: Package,
    color: "text-primary",
  },
  {
    title: "Active Drivers",
    value: "45",
    subtitle: "+3 new this week",
    icon: Truck,
    color: "text-accent",
  },
  {
    title: "Total Users",
    value: "8,429",
    subtitle: "+18% growth",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Revenue",
    value: "$45,231",
    subtitle: "+25% increase",
    icon: DollarSign,
    color: "text-success",
  },
];

// All orders data (combining new and accepted orders)
const allOrders = [
  {
    id: "ORD-001",
    pickup: "123 Main St, Downtown",
    delivery: "456 Oak Ave, Uptown",
    status: "accepted",
    amount: "$45.00",
    estimatedTime: "25 min",
    customer: "John Smith",
    customerPhone: "+44 7700 900125",
    driver: "Alex Johnson",
    driverPhone: "+44 7700 900200"
  },
  {
    id: "ORD-002",
    pickup: "789 Oak St, Central", 
    delivery: "456 Pine Ave, North",
    status: "pickup",
    amount: "$67.50",
    estimatedTime: "30 min",
    customer: "Emily Davis",
    customerPhone: "+44 7700 900126",
    driver: "Lisa Chen",
    driverPhone: "+44 7700 900201"
  },
  {
    id: "ORD-003",
    pickup: "321 Elm Rd, South",
    delivery: "654 Birch Lane, West",
    status: "in-progress",
    amount: "$52.25",
    estimatedTime: "40 min",
    customer: "Michael Wilson", 
    customerPhone: "+44 7700 900127",
    driver: "Mark Thompson",
    driverPhone: "+44 7700 900202"
  },
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
    status: "completed",
    amount: "$58.75",
    estimatedTime: "45 min",
    customer: "David Brown",
    customerPhone: "+44 7700 900124",
    driver: "Alex Johnson",
    driverPhone: "+44 7700 900200"
  }
];

const acceptedOrders = allOrders.filter(order => ['accepted', 'pickup', 'in-progress'].includes(order.status));

export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-yellow-100 text-yellow-800';
      case 'pickup': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor your delivery operations</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all-orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-orders">All Orders</TabsTrigger>
          <TabsTrigger value="accepted-orders">Accepted Orders</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="all-orders">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
              <CardDescription>View and manage all orders in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="font-semibold text-foreground">{order.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{order.amount}</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                {/* Map placeholder for tracking */}
                                <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                  <div className="text-center">
                                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-muted-foreground">Driver GPS Tracking Map</p>
                                    <p className="text-sm text-muted-foreground">Real-time location updates</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Details</h4>
                                    <p><strong>Name:</strong> {selectedOrder.customer}</p>
                                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                                  </div>
                                  {selectedOrder.driver && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Driver Details</h4>
                                      <p><strong>Name:</strong> {selectedOrder.driver}</p>
                                      <p><strong>Phone:</strong> {selectedOrder.driverPhone}</p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <div>
                                    <strong>Pickup:</strong> {selectedOrder.pickup}
                                  </div>
                                  <div>
                                    <strong>Delivery:</strong> {selectedOrder.delivery}
                                  </div>
                                  <div>
                                    <strong>Status:</strong> 
                                    <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                                      {selectedOrder.status.replace('-', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                  <div>
                                    <strong>Amount:</strong> {selectedOrder.amount}
                                  </div>
                                  <div>
                                    <strong>Estimated Time:</strong> {selectedOrder.estimatedTime}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Pickup:</strong> {order.pickup}
                      </div>
                      <div>
                        <strong>Delivery:</strong> {order.delivery}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Customer: {order.customer}</span>
                      {order.driver && <span>Driver: {order.driver}</span>}
                      <span>Est: {order.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted-orders">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Accepted Orders</CardTitle>
              <CardDescription>Orders currently being handled by drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {acceptedOrders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="font-semibold text-foreground">{order.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{order.amount}</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Track
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Track Order - {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                {/* Map for real-time tracking */}
                                <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                                  <div className="text-center">
                                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary animate-pulse" />
                                    <p className="text-foreground font-semibold">Live Driver Tracking</p>
                                    <p className="text-sm text-muted-foreground">Real-time GPS location</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer</h4>
                                    <p>{selectedOrder.customer}</p>
                                    <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Driver</h4>
                                    <p>{selectedOrder.driver}</p>
                                    <p className="text-sm text-muted-foreground">{selectedOrder.driverPhone}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div><strong>From:</strong> {selectedOrder.pickup}</div>
                                  <div><strong>To:</strong> {selectedOrder.delivery}</div>
                                  <div><strong>Status:</strong> 
                                    <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                                      {selectedOrder.status.replace('-', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                  <div><strong>Amount:</strong> {selectedOrder.amount}</div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>From:</strong> {order.pickup}</div>
                      <div><strong>To:</strong> {order.delivery}</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Driver: {order.driver}</span>
                      <span>Customer: {order.customer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat) => (
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
        </TabsContent>

      </Tabs>
    </div>
  );
}