import Modal from "./Modal";

export default function AddClubModal({
  onClose,
  onCreate,
  clubName,
  setClubName,
  clubType,
  setClubType,
  clubDesc,
  setClubDesc
}) {
  return (
    <Modal title="Create Club" onClose={onClose}>
      <input
        className="input"
        placeholder="Club Name"
        value={clubName}
        onChange={e => setClubName(e.target.value)}
      />

      <input
        className="input"
        placeholder="Club Type (Tech / Cultural)"
        value={clubType}
        onChange={e => setClubType(e.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Description"
        value={clubDesc}
        onChange={e => setClubDesc(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={onCreate}
      >
        Create Club
      </button>
    </Modal>
  );
}
