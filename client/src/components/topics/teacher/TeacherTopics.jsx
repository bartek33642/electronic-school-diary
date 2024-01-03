import React, { useState, useEffect } from "react";
import "./TeacherTopics.css";
import { DataGrid } from "@mui/x-data-grid";
import { TeacherMenu } from "../../menu/teacher/TeacherMenu";
import { backendServer } from "../../../config";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function TeacherTopics() {
  const [userData, setUserData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [allClasses, setClassData] = useState([]);

  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    class_id: "",
    subject_id: "",
    topic_text: "",
    description: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail) {
        const userQuery = `${backendServer}/users-school-student/${userEmail}`;
        const result = await fetch(userQuery);
        const userData = await result.json();
        console.log("userData: ", userData);

        if (result.ok) {
          setUserData(userData);

          if (userData.length > 0) {
            const schoolId = userData[0].school_id;
            const classAllFromSchoolQuery = `${backendServer}/classes/${schoolId}`;

            const classAllFromSchoolResult = await fetch(
              classAllFromSchoolQuery
            );
            const classAllFromSchoolData =
              await classAllFromSchoolResult.json();
            setClassData(classAllFromSchoolData);
            console.log("classAllFromSchoolData :", classAllFromSchoolData);
          }

          if (userData.length > 0) {
            const schoolId = userData[0].school_id;

            // Pobierz tematy dla danego studenta i klasy
            const topicsQuery = `${backendServer}/topics-all-classes/${schoolId}`;
            const topicsResult = await fetch(topicsQuery);
            // console.log("topicsResult: ", topicsResult);
            const topicsData = await topicsResult.json();
            console.log("topicsData: ", topicsData);

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

  const handleAddTopic = async () => {
    try {
      // Upewnij się, że są dane użytkownika
      if (userData.length > 0) {
        // Pobierz teacher_id z userData
        const teacherId = userData[0].teacher_id;

        // Dodaj teacher_id do formData
        setFormData((prevData) => ({ ...prevData, teacher_id: teacherId }));

        // Użyj formData do wysłania zapytania POST w celu dodania nowego tematu
        const addTopicQuery = `${backendServer}/topics/${teacherId}`;

        const postData = {
          class_id: formData.class_id,
          topic_text: formData.topic_text,
          description: formData.description,
          date: formData.date,
          subject_id: formData.subject_id,
          // teacher_id: teacherId,
        };

        const addTopicResult = await fetch(addTopicQuery, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (addTopicResult.ok) {
          // Odśwież listę tematów po pomyślnym dodaniu
          fetchUserData();
          handleClose(); // Zamknij modal po dodaniu tematu
        } else {
          setError("Błąd dodawania tematu.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas dodawania tematu.");
    }
  };

  // console.log("classOptions ",classOptions);
  console.log("allClasses", allClasses);

  const fetchClassOptions = async () => {
    try {
      if (userData.length > 0) {
        const schoolId = allClasses[0].school_id;
        const classOptionsQuery = `${backendServer}/classes/${schoolId}`;

        const classOptionsResult = await fetch(classOptionsQuery);

        if (classOptionsResult.ok) {
          const classOptionsData = await classOptionsResult.json();
          setClassOptions(classOptionsData);
          console.log("classOptionsData :", classOptionsData);

          // Wait for class options to be set before fetching subject options
          await fetchSubjectOptions();
        } else {
          setError("Błąd pobierania danych z klasami.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas pobierania danych z klasami.");
    }
  };

  const fetchSubjectOptions = async () => {
    try {
      if (userData.length > 0 && allClasses.length > 0) {
        const classId = allClasses[0].class_id;
        const schoolId = userData[0].school_id;
        const subjectOptionsQuery = `${backendServer}/subjects-for-class/${schoolId}/${classId}`;
        const subjectOptionsResult = await fetch(subjectOptionsQuery);

        if (subjectOptionsResult.ok) {
          const subjectOptionsData = await subjectOptionsResult.json();
          setSubjectOptions(subjectOptionsData);
        } else {
          setError("Błąd pobierania danych z przedmiotami.");
        }
      } else {
        setError("Brak danych użytkownika.");
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas pobierania danych z przedmiotami.");
    }
  };

  // W useEffect pobierz opcje klas i przedmiotów
  useEffect(() => {
    fetchClassOptions();
    fetchSubjectOptions();
  }, []);

  // useEffect(() => {
  //   // Pobierz dane użytkownika i tematy
  //   fetchUserData();
  // }, []);

  useEffect(() => {
    // Wywołaj dodawanie tematu tylko raz, po poprawnym pobraniu danych użytkownika
    handleAddTopic();
  }, [userData]);

  useEffect(() => {
    // Pobierz dane użytkownika i tematy
    fetchUserData();

    // Pobierz opcje klas tylko raz przy pierwszym załadowaniu komponentu
    fetchClassOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "class_id") {
      fetchSubjectOptions(value);
    }
  };

  const columns = [
    { field: "topicId", headerName: "ID", width: 100 },
    { field: "date", headerName: "Data", width: 100 },
    { field: "class", headerName: "Klasa", width: 100 },
    { field: "subject", headerName: "Przedmiot", width: 130 },
    { field: "topic", headerName: "Temat", width: 130 },
    { field: "description", headerName: "Opis tematu", width: 250 },
    { field: "teacher", headerName: "Nauczyciel", width: 130 },
  ];

  // let formatDate = topics.date.toISOString().substring(0, 10);
  // console.log(formatDate);

  const rows = topics.map((topic) => ({
    topicId: topic.topic_id,
    date: new Date(topic.date).toLocaleDateString(),
    class: topic.class_name,
    subject: topic.subject_name,
    topic: topic.topic_text,
    description: topic.description,
    teacher: topic.first_name + " " + topic.second_name,
  }));

  return (
    <div className="teacher-topics-container">
      <TeacherMenu />
      <div className="teacher-topics-elements">
        <h2>Tematy</h2>

        <button type="button" onClick={handleOpen}>
          Dodaj temat
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }} className="modal-content">
            <h2 className="teacher-topics-add-topic">Dodaj temat:</h2>
            Data:{" "}
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />{" "}
            <br />
            Klasa:{" "}
            <select
              name="class_id"
              onChange={handleChange}
              value={formData.class_id}
            >
              <option value="">Wybierz klasę</option>
              {classOptions.map((classOption) => (
                <option key={classOption.class_id} value={classOption.class_id}>
                  {classOption.class_name}
                </option>
              ))}
            </select>
            <br />
            Przedmiot:{" "}
            <select
              name="subject_id"
              onChange={handleChange}
              value={formData.subject_id}
            >
              <option value="">Wybierz przedmiot</option>
              {subjectOptions.map((subjectOption) => (
                <option
                  key={subjectOption.subject_id}
                  value={subjectOption.subject_id}
                >
                  {subjectOption.subject_name}
                </option>
              ))}
            </select>
            <br />
            Temat:{" "}
            <input
              type="text"
              name="topic_text"
              onChange={handleChange}
              value={formData.topic_text}
            />{" "}
            <br />
            Opis tematu:{" "}
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />{" "}
            <br />
            <Button
              onClick={() =>
                handleAddTopic(
                  userData,
                  formData,
                  setUserData,
                  setTopics,
                  setError,
                  handleClose
                )
              }
            >
              Dodaj temat
            </Button>
            <Button onClick={handleClose}>Zamknij</Button>
          </Box>
        </Modal>

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
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
