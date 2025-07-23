import { useState } from "react";
import { LogOut, PackageOpen, Settings, User } from "lucide-react";

export function IndividualUserMenu() {
  const [showAccounts, setShowAccounts] = useState(false);

  // Sample accounts data
  // In a real application, this data would likely come from an API or global state
  const accounts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "John Smith", email: "jane@example.com" },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    // Add your actual logout logic here
    // e.g., clear tokens, redirect to login page, etc.
  };

  const menuItems = [
    {
      icon: User,
      label: "Account",
      action: () => setShowAccounts(!showAccounts),
      hasSubmenu: true,
    },
    {
      icon: PackageOpen,
      label: "Orders",
      action: () => (window.location.href = "/individuals/orders"), // Navigate to settings page
      hasSubmenu: false,
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => (window.location.href = "/individuals/settings"), // Navigate to settings page
      hasSubmenu: false,
    },
    {
      icon: LogOut,
      label: "Log Out",
      action: handleLogout,
      hasSubmenu: false,
    },
  ];

  return (
    <div className="absolute top-20 left-[12%] bg-gray-100 px-2 rounded-3xl shadow-lg z-50">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="hover:text-gray-600 p-2 rounded cursor-pointer relative"
            onMouseEnter={() => item.hasSubmenu && setShowAccounts(true)}
            onMouseLeave={() => item.hasSubmenu && setShowAccounts(false)}
            onClick={item.action}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-white">
                <item.icon size={16} />
              </div>
              <span>{item.label}</span>
            </div>

            {/* Account submenu */}
            {item.label === "Account" && showAccounts && (
              <div className="absolute left-full top-0 ml-4 text-black bg-gray-100 p-3 space-y-2 rounded-3xl shadow-md">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center gap-2 p-2 bg-white hover:bg-white/70 rounded-full cursor-pointer"
                  >
                    <div className="bg-blue-100 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                      {account.name.charAt(0)}
                    </div>
                    <div>
                      <strong className="font-medium text-sm">
                        {account.name}
                      </strong>
                      <p className="text-xs text-gray-500 pr-3">
                        {account.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
