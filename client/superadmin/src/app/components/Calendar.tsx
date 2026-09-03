import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Phone } from "lucide-react";
import { Modal } from "./Modal";

interface CalendarEvent {
  id: number;
  type: "resolution" | "call";
  title: string;
  agent: string;
  time: string;
  status: "pending" | "completed";
  date: Date;
  description?: string;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 26)); // April 26, 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [viewType, setViewType] = useState<"all" | "resolutions" | "calls">("all");

  const events: CalendarEvent[] = [
    {
      id: 1,
      type: "resolution",
      title: "Payment Gateway Issue",
      agent: "Rahul Travels",
      time: "10:00 AM",
      status: "pending",
      date: new Date(2026, 3, 26),
      description: "Fix payment gateway integration error"
    },
    {
      id: 2,
      type: "call",
      title: "Feature Demo Call",
      agent: "Mumbai Tours Co",
      time: "2:00 PM",
      status: "pending",
      date: new Date(2026, 3, 27),
      description: "Demo new booking features"
    },
    {
      id: 3,
      type: "resolution",
      title: "Login Issue",
      agent: "Chennai Trips",
      time: "11:30 AM",
      status: "completed",
      date: new Date(2026, 3, 25),
      description: "Resolved password reset issue"
    },
    {
      id: 4,
      type: "call",
      title: "Technical Discussion",
      agent: "Delhi Explorers",
      time: "4:00 PM",
      status: "completed",
      date: new Date(2026, 3, 25),
      description: "Discussed API integration requirements"
    },
    {
      id: 5,
      type: "resolution",
      title: "Invoice Generation",
      agent: "Goa Adventures",
      time: "3:30 PM",
      status: "pending",
      date: new Date(2026, 3, 28),
      description: "Fix invoice PDF generation"
    },
    {
      id: 6,
      type: "call",
      title: "Plan Upgrade Consultation",
      agent: "Kerala Holidays",
      time: "10:00 AM",
      status: "pending",
      date: new Date(2026, 3, 28),
      description: "Discuss enterprise plan features"
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter(event => {
      const eventDate = event.date;
      const matchesDate = eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();

      if (viewType === "all") return matchesDate;
      if (viewType === "resolutions") return matchesDate && event.type === "resolution";
      if (viewType === "calls") return matchesDate && event.type === "call";
      return false;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleMarkComplete = () => {
    alert(`Marked as completed: ${selectedEvent?.title}`);
    setShowEventModal(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <h1 className="text-[#1e293b] mb-6" style={{ fontSize: '24px', fontWeight: 600 }}>Schedule Calendar</h1>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === "all"
                ? "bg-[#2563eb] text-white"
                : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
            }`}
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            All Events
          </button>
          <button
            onClick={() => setViewType("resolutions")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === "resolutions"
                ? "bg-[#2563eb] text-white"
                : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
            }`}
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Resolutions
          </button>
          <button
            onClick={() => setViewType("calls")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewType === "calls"
                ? "bg-[#2563eb] text-white"
                : "bg-[#f0f4fa] text-[#64748b] hover:bg-[#e2e8f0]"
            }`}
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Scheduled Calls
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e2e8f0]">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-[#f0f4fa] rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-[#64748b]" />
          </button>
          <h2 className="text-[#1e293b]" style={{ fontSize: '18px', fontWeight: 600 }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-[#f0f4fa] rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-[#64748b]" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-[#e2e8f0]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="p-3 text-center border-r border-[#e2e8f0] last:border-r-0">
              <span className="text-[#64748b]" style={{ fontSize: '12px', fontWeight: 600 }}>
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-[120px] border-r border-b border-[#e2e8f0] bg-[#f9fafb]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDate(day);
            const isToday = day === 26 && currentDate.getMonth() === 3;

            return (
              <div
                key={day}
                className="min-h-[120px] border-r border-b border-[#e2e8f0] p-2 last:border-r-0 hover:bg-[#f0f4fa] transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full mb-2 ${
                  isToday ? "bg-[#2563eb] text-white" : "text-[#1e293b]"
                }`} style={{ fontSize: '13px', fontWeight: 500 }}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <button
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`w-full text-left px-2 py-1 rounded text-xs ${
                        event.type === "resolution"
                          ? event.status === "completed"
                            ? "bg-[#d1fae5] text-[#065f46]"
                            : "bg-[#fef3c7] text-[#92400e]"
                          : event.status === "completed"
                          ? "bg-[#dbeafe] text-[#1e40af]"
                          : "bg-[#e0e7ff] text-[#3730a3]"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {event.type === "resolution" ? <Clock size={10} /> : <Phone size={10} />}
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="truncate" style={{ fontSize: '11px' }}>{event.title}</div>
                    </button>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-[#64748b] text-xs pl-2">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Event Details" size="sm">
        {selectedEvent && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {selectedEvent.type === "resolution" ? (
                <Clock size={20} className="text-[#f97316]" />
              ) : (
                <Phone size={20} className="text-[#2563eb]" />
              )}
              <span className={`px-2.5 py-1 rounded-full text-xs ${
                selectedEvent.type === "resolution"
                  ? "bg-[#fef3c7] text-[#92400e]"
                  : "bg-[#e0e7ff] text-[#3730a3]"
              }`}>
                {selectedEvent.type === "resolution" ? "Resolution" : "Scheduled Call"}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs ${
                selectedEvent.status === "completed"
                  ? "bg-[#d1fae5] text-[#065f46]"
                  : "bg-[#fee2e2] text-[#991b1b]"
              }`}>
                {selectedEvent.status === "completed" ? "Completed" : "Pending"}
              </span>
            </div>

            <div>
              <h3 className="text-[#1e293b] mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                {selectedEvent.title}
              </h3>
              <p className="text-[#64748b]" style={{ fontSize: '14px' }}>
                {selectedEvent.agent}
              </p>
            </div>

            <div className="bg-[#f0f4fa] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-[#64748b]" />
                <span className="text-[#1e293b]" style={{ fontSize: '14px', fontWeight: 500 }}>
                  {selectedEvent.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="text-[#64748b]" style={{ fontSize: '14px' }}>
                {selectedEvent.time}
              </div>
            </div>

            {selectedEvent.description && (
              <div>
                <div className="text-[#64748b] mb-1" style={{ fontSize: '12px', fontWeight: 500 }}>
                  DESCRIPTION
                </div>
                <p className="text-[#1e293b]" style={{ fontSize: '14px' }}>
                  {selectedEvent.description}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {selectedEvent.status === "pending" && (
                <button
                  onClick={handleMarkComplete}
                  className="flex-1 px-4 py-2.5 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors flex items-center justify-center gap-2"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  <CheckCircle size={16} />
                  Mark Complete
                </button>
              )}
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f0f4fa] transition-colors"
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
