import "../../pages/society/society.scss";

function EditComponentSociety({ onClick }) {
  return (
    <div>
      <button onClick={onClick} className="buttoneditsociety">
        Edit Society
      </button>
    </div>
  );
}

export default EditComponentSociety;
