const Register = () => {
  return (
    <>
      <div className="modal-society-item-options">
        <IoDocumentText
          className="btn btn--no-bg btn--xs"
          title="Details"
          onClick={() => handleShowSociety(society.id)}
        />
        <MdEditDocument
          className="btn btn--no-bg btn--xs"
          title="Edit"
          onClick={() => handleEditSociety(society.id)}
        />
        <FaTrash
          className="modal-society-item-options__trash btn btn--alert btn--xs"
          title="Delete"
          onClick={() => handleDeleteSociety(society.id)}
        />
      </div>
    </>
  );
};

export default Register;
