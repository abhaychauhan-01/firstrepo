import Modal from "./Modal";

export default function AddEventModal({
  onClose,
  onCreate,
  title,
  setTitle,
  date,
  setDate,
  location,
  setLocation,
  clubId,
  setClubId,
  clubs
}) {
  return (
    <Modal title="Create Event" onClose={onClose}>
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

      <button
        className="btn btn-success"
        onClick={onCreate}
      >
        Create Event
      </button>
    </Modal>
  );
}
