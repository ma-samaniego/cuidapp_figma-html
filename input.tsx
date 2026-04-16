import { useState } from "react";
import { Home, Pill, MapPin, Camera, UserCircle, ClipboardList } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { MedicationsScreen } from "./components/MedicationsScreen";
import { MapScreen } from "./components/MapScreen";
import { ScannerScreen } from "./components/ScannerScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { MedicalCheckupsScreen } from "./components/MedicalCheckupsScreen";

type TabType = "home" | "medications" | "checkups" | "map" | "scanner" | "profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[812px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-8 border-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 text-white">
          <h1 className="text-2xl">CuidApp</h1>
          <p className="text-blue-100 text-sm mt-1">Tu salud en tus manos</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "medications" && <MedicationsScreen />}
          {activeTab === "checkups" && <MedicalCheckupsScreen />}
          {activeTab === "map" && <MapScreen />}
          {activeTab === "scanner" && <ScannerScreen />}
          {activeTab === "profile" && <ProfileScreen />}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-1 py-2 flex items-center justify-around">
          <TabButton
            icon={<Home className="w-5 h-5" />}
            label="Inicio"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <TabButton
            icon={<Pill className="w-5 h-5" />}
            label="Medicinas"
            active={activeTab === "medications"}
            onClick={() => setActiveTab("medications")}
          />
          <TabButton
            icon={<ClipboardList className="w-5 h-5" />}
            label="Controles"
            active={activeTab === "checkups"}
            onClick={() => setActiveTab("checkups")}
          />
          <TabButton
            icon={<MapPin className="w-5 h-5" />}
            label="Mapa"
            active={activeTab === "map"}
            onClick={() => setActiveTab("map")}
          />
          <TabButton
            icon={<Camera className="w-5 h-5" />}
            label="Escáner"
            active={activeTab === "scanner"}
            onClick={() => setActiveTab("scanner")}
          />
          <TabButton
            icon={<UserCircle className="w-5 h-5" />}
            label="Perfil"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition-colors ${
        active
          ? "text-blue-600 bg-blue-50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="text-[10px] leading-tight">{label}</span>
    </button>
  );
}