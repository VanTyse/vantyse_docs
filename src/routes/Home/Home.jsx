import "./Home.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import useScrollDirection from "../../custom_hooks/useScrollDirection";
import dateConverter from "../../pure_functions/dateConverter";
import { DocumentContext, UserContext } from "../../context/context";
import { BASE_URL } from "../Auth/Auth";

function Home() {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const getDocuments = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data: documents } = await axios(`${BASE_URL}/api/v1/documents`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDocuments(documents);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="home-container container">
      <div className="documents">
        {documents.length > 0 ? (
          documents.map((document) => {
            const { documentName, documentID, _id, updatedAt, collaborators } =
              document;
            return (
              <DocumentCard
                key={_id}
                title={documentName}
                date={updatedAt}
                documentID={documentID}
                collaboratorsNo={collaborators.length}
              />
            );
          })
        ) : (
          <div className="default-message">
            {user ? (
              <div>
                <p>Hi...</p>
                <h1>This is a google docs clone created by Vantyse.</h1>
                <h2>It seems like you don't have any documents.</h2>
                <button onClick={() => setShowModal(true)}>
                  Create One Now
                </button>
              </div>
            ) : (
              <div>
                <p>Hi...</p>
                <h2>It seems like you are not logged in.</h2>
                <button onClick={() => navigate("/auth")}>Login Now</button>
              </div>
            )}
          </div>
        )}
      </div>
      <NewDocumentButton setShowModal={setShowModal} />
      <NewDocumentModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

function DocumentCard({ title, date, documentID, collaboratorsNo }) {
  const navigate = useNavigate();
  const { modifiedDate, modifiedTime } = dateConverter(date);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  return (
    <>
      <div
        onClick={() => navigate(`/documents/${documentID}`)}
        className="document-card"
      >
        <div className="top">
          <h3 className="title">{title}</h3>
        </div>
        <div className="bottom">
          <div className="left">
            <span>{modifiedTime}</span>
            <p className="date">{modifiedDate}</p>
          </div>

          <div className="right">
            <i
              onClick={(e) => {
                e.stopPropagation();
                setShowCollaboratorModal(true);
              }}
              className="far fa-handshake handshake-icon"
            ></i>
            <p className={`show-collaborate`}>Collaborate</p>
            <div className="collaboration-no">{collaboratorsNo}</div>
          </div>
        </div>
      </div>
      {showCollaboratorModal && (
        <AddCollaboratorModal
          documentID={documentID}
          documentName={title}
          showModal={showCollaboratorModal}
          setShowModal={setShowCollaboratorModal}
        />
      )}
    </>
  );
}

function NewDocumentButton({ setShowModal }) {
  const { direction } = useScrollDirection();
  return (
    <div
      onClick={() => setShowModal(true)}
      className={`new-doc-btn ${direction === "down" && "hide-btn"}`}
    >
      <span>+</span>
    </div>
  );
}

function NewDocumentModal({ showModal, setShowModal }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { dispatch } = useContext(DocumentContext);

  const handleCreation = () => {
    if (name.length < 1) return;
    dispatch({ type: "ADD_NAME", payload: name });
    navigate(`/documents/${uuidv4()}`);
  };

  return (
    <div className={`new-document-modal ${showModal && "show-modal"}`}>
      <div className="top">
        <h3>New Document</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()} action="">
        <input
          type="text"
          name="documentName"
          id="documentName"
          placeholder="Document's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="buttons">
          <button onClick={() => setShowModal(false)} type="button">
            Cancel
          </button>
          <button onClick={handleCreation} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

function AddCollaboratorModal({
  showModal,
  setShowModal,
  documentID,
  documentName,
}) {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAdd = async () => {
    try {
      setAlertMessage("Adding...");
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/api/v1/documents/${documentID}`,
        { collaboratorEmail: email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertMessage("Successful");
      setTimeout(() => setShowModal(false), 2000);
    } catch (error) {
      if (error.response.data.error.msg === "user for collabo doesn't exist") {
        setAlertMessage(error.response.data.error.msg);
        setTimeout(() => setAlertMessage("Re-enter Email"), 2000);
        setEmail("");
      } else {
        setAlertMessage("Something went wrong");
      }
    }
  };
  return (
    <div className={`add-collaborator-modal ${showModal && "show-modal"}`}>
      {alertMessage && (
        <em>
          <h5
            style={{ color: "var(--dark-main-color)", textAlign: "center" }}
            className="alert"
          >
            {alertMessage}
          </h5>
        </em>
      )}
      <div className="top">
        <h3>Add Collaborator</h3>
        <h5>{documentName}</h5>
      </div>
      <form onSubmit={(e) => e.preventDefault()} action="">
        <input
          type="email"
          name="collaborator"
          id="collaborator-input"
          placeholder="collaborator email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="buttons">
          <button onClick={() => setShowModal(false)} type="button">
            Cancel
          </button>
          <button onClick={handleAdd} type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
