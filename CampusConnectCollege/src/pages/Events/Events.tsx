import { useState } from "react";
import { Plus, Calendar, MapPin, Users, Trash2 } from "lucide-react";
import type { CollegeEvent } from "../../types";

const Events = () => {
  const [events, setEvents] = useState<CollegeEvent[]>([
    {
      id: "1",
      title: "Tech Symposium 2024",
      description: "Annual technology symposium featuring latest innovations",
      date: "2024-02-15",
      time: "09:00 AM",
      venue: "Main Auditorium",
      type: "academic",
      organizer: "CSE Department",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Cultural Fest",
      description: "College cultural event with music, dance, and drama",
      date: "2024-02-20",
      time: "04:00 PM",
      venue: "Sports Ground",
      type: "cultural",
      organizer: "Student Council",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Annual Sports Day",
      description: "Inter-departmental sports competition",
      date: "2024-03-10",
      time: "08:00 AM",
      venue: "Sports Complex",
      type: "sports",
      organizer: "Sports Department",
      status: "upcoming",
    },
  ]);

  const [, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");

  const eventTypes = ["all", ...new Set(events.map((e) => e.type))];

  const filteredEvents = events.filter(
    (event) => selectedType === "all" || event.type === selectedType
  );

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      academic: "bg-blue-100 text-blue-800",
      cultural: "bg-purple-100 text-purple-800",
      sports: "bg-green-100 text-green-800",
      seminar: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[type] || colors.other;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      upcoming: "bg-yellow-100 text-yellow-800",
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || colors.upcoming;
  };

  return (
    <div className="min-h-screen mt-20 ml-[200px] px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">College Events</h1>
          <p className="text-gray-600 mt-2">Manage and view college events</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type === "all"
                ? "All Events"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex-1">
                {event.title}
              </h3>
              <button
                onClick={() => handleDelete(event.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">{event.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Organized by: {event.organizer}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                  event.type
                )}`}
              >
                {event.type}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  event.status
                )}`}
              >
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No events found</p>
        </div>
      )}
    </div>
  );
};

export default Events;
