import "../../pages/society/society.scss";

function NewSociety({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button onClick={onClick} className="buttonnewsociety">
        New society
      </button>
    </div>
  );
}

export default NewSociety;
