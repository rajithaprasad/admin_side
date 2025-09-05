import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MapPin } from "lucide-react";

// All orders data
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

export default function AdminOrders() {
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">View and manage all orders</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
          <CardDescription>Complete list of all orders in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.pickup}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{order.delivery}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell>{order.driver || "Not assigned"}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}