import { Home, Package, Settings, Users, Truck, LogOut, BarChart3 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: BarChart3 },
  { title: "Orders", url: "/admin/orders", icon: Package },
  { title: "Drivers", url: "/admin/drivers", icon: Truck },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const driverItems = [
  { title: "Dashboard", url: "/driver", icon: BarChart3 },
  { title: "My Orders", url: "/driver/orders", icon: Package },
  { title: "Settings", url: "/driver/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const items = user?.role === "admin" ? adminItems : driverItems;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-lg p-2">
            <Home className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">MoveXpress</h2>
              <p className="text-xs text-sidebar-foreground/60">{user?.role} Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-accent rounded-full p-2">
            <Users className="h-4 w-4 text-accent-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user?.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}