import { useEffect, useState } from "react";
import AddClubModal from "./components/AddClubModal";
import AddEventModal from "./components/AddEventModal";

export default function App() {
  const role = "admin";

  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // modals
  const [showClubModal, setShowClubModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  // club form
  const [clubName, setClubName] = useState("");
  const [clubType, setClubType] = useState("");
  const [clubDesc, setClubDesc] = useState("");

  // event form
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [clubId, setClubId] = useState("");

  const fetchData = () => {
    fetch("http://localhost:5000/clubs")
      .then(res => res.json())
      .then(setClubs);

    fetch("http://localhost:5000/events")
      .then(res => res.json())
      .then(setEvents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createClub = async () => {
    if (!clubName || !clubType) return alert("Fill all club details");

    await fetch("http://localhost:5000/clubs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: clubName,
        type: clubType,
        description: clubDesc
      })
    });

    setShowClubModal(false);
    setClubName("");
    setClubType("");
    setClubDesc("");
    fetchData();
  };

  const createEvent = async () => {
    if (!title || !date || !location || !clubId)
      return alert("Fill all event details");

    await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        date,
        location,
        club: clubId
      })
    });

    setShowEventModal(false);
    setTitle("");
    setDate("");
    setLocation("");
    setClubId("");
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-slate-950 p-6 z-20
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300`}>
        <h2 className="text-xl font-bold text-sky-400">Campus H</h2>
        <p className="text-xs text-slate-400 mb-6">ADMIN PANEL</p>
        <nav className="space-y-3">
          <p className="hover:text-sky-400 cursor-pointer">Dashboard</p>
          <p className="hover:text-sky-400 cursor-pointer">Clubs</p>
          <p className="hover:text-sky-400 cursor-pointer">Events</p>
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 w-full">
        {/* TOP BAR */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

          {role === "admin" && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowClubModal(true)}
                className="bg-sky-500 px-4 py-2 rounded-lg text-black font-semibold"
              >
                + Add Club
              </button>
              <button
                onClick={() => setShowEventModal(true)}
                className="bg-emerald-500 px-4 py-2 rounded-lg text-black font-semibold"
              >
                + Add Event
              </button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Clubs & Upcoming Events
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map(club => (
              <div key={club._id} className="bg-slate-800 p-5 rounded-xl">
                <h3 className="text-lg font-bold text-sky-400">
                  {club.name}
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  {club.type}
                </p>

                {events.filter(e => e.club?._id === club._id).length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No events yet
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {events
                      .filter(e => e.club?._id === club._id)
                      .map(ev => (
                        <li
                          key={ev._id}
                          className="bg-slate-700 p-2 rounded text-sm"
                        >
                          {ev.title}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD CLUB MODAL */}
      {showClubModal && (
        <AddClubModal title="Create Club" onClose={() => setShowClubModal(false)}>
          <input
            className="input"
            placeholder="Club Name"
            value={clubName}
            onChange={e => setClubName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Club Type"
            value={clubType}
            onChange={e => setClubType(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Description"
            value={clubDesc}
            onChange={e => setClubDesc(e.target.value)}
          />
          <button className="btn" onClick={createClub}>
            Create
          </button>
        </AddClubModal>
      )}

      {/* ADD EVENT MODAL */}
      {showEventModal && (
        <AddEventModal title="Create Event" onClose={() => setShowEventModal(false)}>
          <input
            className="input"
            placeholder="Event Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            className="input"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <select
            className="input"
            value={clubId}
            onChange={e => setClubId(e.target.value)}
          >
            <option value="">Select Club</option>
            {clubs.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button className="btn bg-emerald-500" onClick={createEvent}>
            Create
          </button>
        </AddEventModal>
      )}
    </div>
  );
}

