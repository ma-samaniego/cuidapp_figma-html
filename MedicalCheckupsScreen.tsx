import { Calendar, Clock, Bell, Activity, Pill, ArrowRight } from "lucide-react";
import { useState } from "react";

export function HomeScreen() {
  const [todayMedications, setTodayMedications] = useState([
    { id: 1, name: "Losartán 50mg", time: "8:00 AM", taken: true },
    { id: 2, name: "Metformina 850mg", time: "2:00 PM", taken: false },
    { id: 3, name: "Atorvastatina 20mg", time: "8:00 PM", taken: false },
  ]);

  const upcomingCheckups = [
    {
      id: 1,
      doctor: "Dr. María González",
      specialty: "Cardiología",
      date: "15 Abr, 2026",
      time: "10:00 AM",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Ruiz",
      specialty: "Medicina General",
      date: "22 Abr, 2026",
      time: "3:30 PM",
    },
  ];

  const pendingMedications = todayMedications.filter(med => !med.taken).length;
  const totalMedications = todayMedications.length;

  const toggleMedication = (id: number) => {
    setTodayMedications(
      todayMedications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8" />
          <div>
            <h2 className="text-xl">¡Hola!</h2>
            <p className="text-blue-100 text-sm">Lunes, 13 de Abril 2026</p>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-xl p-3">
          <p className="text-sm">Recordatorios pendientes hoy</p>
          <p className="text-2xl mt-1">{pendingMedications} de {totalMedications} medicamentos</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <p className="text-xs text-green-700">Adherencia</p>
          <p className="text-2xl text-green-800 mt-1">87%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <p className="text-xs text-purple-700">Controles</p>
          <p className="text-2xl text-purple-800 mt-1">{upcomingCheckups.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <p className="text-xs text-orange-700">Medicinas</p>
          <p className="text-2xl text-orange-800 mt-1">{totalMedications}</p>
        </div>
      </div>

      {/* Today's Medications Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg">Medicamentos de hoy</h3>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {todayMedications.slice(0, 3).map((med) => (
            <button
              key={med.id}
              onClick={() => toggleMedication(med.id)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    med.taken
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm">{med.name}</p>
                  <p className="text-xs text-gray-500">{med.time}</p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  med.taken
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {med.taken && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Checkups Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg">Próximos controles</h3>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {upcomingCheckups.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No hay controles programados
            </p>
          ) : (
            upcomingCheckups.map((checkup) => (
              <div
                key={checkup.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <p className="text-base">{checkup.doctor}</p>
                <p className="text-sm text-gray-500 mt-1">{checkup.specialty}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{checkup.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{checkup.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-5 border border-indigo-200">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base text-indigo-900">Consejo de salud</h3>
        </div>
        <p className="text-sm text-indigo-700">
          Recuerda tomar tus medicamentos con agua y mantener una alimentación balanceada para mejorar su efectividad.
        </p>
      </div>
    </div>
  );
}