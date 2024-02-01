import React, { useState, useEffect } from "react";
import "./PrincipalTopics.css";
import { DataGrid } from "@mui/x-data-grid";
import { PrincipalMenu } from "../../menu/prncipal/PrincipalMenu";
import { backendServer } from "../../../config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function PrincipalTopics() {
  const [userData, setUserData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState("");

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setFormData({
      ...formData,
      topic_text: "",
      description: "",
      date: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTopic = async () => {
    try {
      if (userData.length > 0) {
        if (selectedTeacher) {
          const addTopicQuery = `${backendServer}/add-topic`;

          const postData = {
            class_id: parseInt(selectedClass, 10),
            topic_text: formData.topic_text,
            description: formData.description,
            date: formData.date,
            subject_id: parseInt(selectedSubject, 10),
            teacher_id: parseInt(selectedTeacher, 10),
          };

          const addTopicResult = await fetch(addTopicQuery, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          if (addTopicResult.ok) {
            fetchUserData();
            handleClose();
            setSnackbarSeverity("success");
            setSnackbarMessage("Temat został dodany pomyślnie.");
          } else {
            const errorData = await addTopicResult.json();
            console.error("Błąd dodawania tematu:", errorData);
            setError("Błąd dodawania tematu. Szczegóły w konsoli.");
          }
        }
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas dodawania tematu.");
    } finally {
      setSnackbarOpen(true);
    }
  };
  const [formData, setFormData] = useState({
    topic_text: "",
    description: "",
    date: "",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail) {
        const userQuery = `${backendServer}/users-school-student/${userEmail}`;
        const result = await fetch(userQuery);
        const userData = await result.json();
        if (result.ok) {
          setUserData(userData);

          if (userData.length > 0) {
            const schoolId = userData[0].school_id;

            const topicsQuery = `${backendServer}/topics-all-classes/${schoolId}`;
            const topicsResult = await fetch(topicsQuery);
            const topicsData = await topicsResult.json();

            if (topicsResult.ok) {
              setTopics(topicsData);
            } else {
              setError("Błąd pobierania danych z tematami.");
            }
          } else {
            setError("Błąd pobierania danych użytkownika: brak danych.");
          }
        } else {
          setError("Błąd pobierania danych użytkownika.");
        }
      } else {
        setError("Brak dostępu do adresu e-mail zalogowanego użytkownika.");
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas pobierania danych użytkownika.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        if (userData.length > 0) {
          const schoolId = userData[0].school_id;

          const classQuery = `${backendServer}/classes/${schoolId}`;
          const result = await fetch(classQuery);
          const classData = await result.json();

          if (result.ok) {
            setClassData(classData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchClassData();
  }, [userData]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        if (userData.length > 0) {
          const schoolId = userData[0].school_id;

          const teachersQuery = `${backendServer}/all-teachers/${schoolId}`;
          const result = await fetch(teachersQuery);
          const teachersData = await result.json();

          if (result.ok) {
            setTeachers(teachersData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTeachers();
  }, [userData]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (selectedClass) {
          const subjectsQuery = `${backendServer}/subjects/class/${selectedClass}`;
          const result = await fetch(subjectsQuery);
          const subjectsData = await result.json();

          if (result.ok) {
            setSubjects(subjectsData);
          }
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  const handleDeleteTopic = async (topicId) => {
    if (window.confirm("Czy na pewno chcesz usunąć klasę?")) {
      try {
        const response = await fetch(`${backendServer}/topics/${topicId}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          fetchUserData();
        } else {
          console.error("Błąd usuwania tematu");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
    { field: "topicId", headerName: "ID", width: 50 },
    { field: "date", headerName: "Data", width: 90 },
    { field: "class", headerName: "Klasa", width: 60 },
    { field: "subject", headerName: "Przedmiot", width: 130 },
    { field: "topic", headerName: "Temat", width: 130 },
    { field: "description", headerName: "Opis tematu", width: 250 },
    { field: "teacher", headerName: "Nauczyciel", width: 130 },
    {
      field: "action",
      headerName: " - ",
      width: 60,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => handleDeleteTopic(params.row.topicId)}
        >
          Usuń
        </button>
      ),
    },
  ];

  const rows = topics.map((topic) => ({
    topicId: topic.topic_id,
    date: new Date(topic.date).toLocaleDateString(),
    class: topic.class_name,
    subject: topic.subject_name,
    topic: topic.topic_text,
    description: topic.description,
    teacher: topic.first_name + " " + topic.second_name,
    action: (
      <button type="button" onClick={() => handleDeleteTopic(topic.topic_id)}>
        Usuń
      </button>
    ),
  }));

  return (
    <div className="principal-topics-container">
      <PrincipalMenu />
      <div className="principal-topics-elements">
        <h2>Tematy</h2>
        <button type="button" onClick={handleOpen}>
          Dodaj temat
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          id="2"
        >
          <Box sx={{ ...style }} className="modal-content">
            <h2 id="child-modal-title">Dodaj Temat </h2>
            <div className="principal-topic-modal-inputs">
              Nauczyciel:{" "}
              <select
                name="teacher_name"
                id=""
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                required
              >
                <option value=""></option>
                {teachers.map((teacher) => (
                  <option key={teacher.teacher_id} value={teacher.teacher_id}>
                    {teacher.first_name} {teacher.second_name}
                  </option>
                ))}
              </select>
              Klasa:{" "}
              <select
                name="class_name"
                id=""
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                <option value=""></option>
                {classData.map((classItem) => (
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
                ))}
              </select>
              Nazwa przedmiotu:{" "}
              <select
                name="subject_name"
                id=""
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value=""></option>
                {subjects.map((subject) => (
                  <option key={subject.subject_id} value={subject.subject_id}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
              Temat:{" "}
              <input
                type="text"
                name="topic"
                id=""
                value={formData.topic_text}
                onChange={(e) =>
                  setFormData({ ...formData, topic_text: e.target.value })
                }
                required
              />
              Opis tematu:{" "}
              <input
                type="text"
                name="description"
                id=""
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <label>Data: </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <br />
            <Button onClick={handleSaveTopic}>Zapisz</Button>
            <br />
            <Button onClick={handleClose}>Zamknij</Button>
          </Box>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.topicId}
            pageSize={8}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
          />
        </div>
      </div>
    </div>
  );
}
