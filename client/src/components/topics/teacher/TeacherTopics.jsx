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

        if (result.ok) {
          setUserData(userData);

          if (userData.length > 0) {
            const teacherId = userData[0].teacher_id;

            if (teacherId) {
              setFormData((prevData) => ({
                ...prevData,
                teacher_id: teacherId,
              }));
            }

            const schoolId = userData[0].school_id;
            const topicsQuery = `${backendServer}/topics-all-classes/${schoolId}`;
            const topicsResult = await fetch(topicsQuery);
            const topicsData = await topicsResult.json();

            if (topicsResult.ok) {
              setTopics(topicsData);
            } else {
              setError("Błąd pobierania danych z tematami.");
            }

            const classAllFromSchoolQuery = `${backendServer}/classes/${schoolId}`;
            const classAllFromSchoolResult = await fetch(
              classAllFromSchoolQuery
            );
            const classAllFromSchoolData =
              await classAllFromSchoolResult.json();
            setClassData(classAllFromSchoolData);
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
      if (userData.length > 0) {
        const teacherId = userData[0].teacher_id;

        if (teacherId) {
          setFormData((prevData) => ({ ...prevData, teacher_id: teacherId }));

          const addTopicQuery = `${backendServer}/add-topics/${teacherId}`;

          const postData = {
            class_id: parseInt(formData.class_id, 10),
            topic_text: formData.topic_text,
            description: formData.description,
            date: formData.date,
            subject_id: parseInt(formData.subject_id, 10),
            teacher_id: formData.teacher_id,
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
    }
  };

  const fetchClassOptions = async () => {
    try {
      if (userData.length > 0) {
        const schoolId = userData[0].school_id;
        const classOptionsQuery = `${backendServer}/classes/${schoolId}`;
        const classOptionsResult = await fetch(classOptionsQuery);

        if (classOptionsResult.ok) {
          const classOptionsData = await classOptionsResult.json();
          setClassOptions(classOptionsData);

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
      if (userData.length > 0 && allClasses && allClasses.length > 0) {
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
        setError("Brak danych użytkownika lub klas.");
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas pobierania danych z przedmiotami.");
    }
  };

  useEffect(() => {
    fetchClassOptions();
  }, [userData]);

  useEffect(() => {
    if (formData.class_id) {
      fetchSubjectOptions(formData.class_id);
    }
  }, [formData.class_id]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "class_id") {
      fetchSubjectOptions(value);
    }
  };

  useEffect(() => {}, [formData.class_id]);

  useEffect(() => {}, [formData.subject_id]);

  const fetchData = async () => {
    try {
      const userDataPromise = fetchUserData();
      const classOptionsPromise = fetchClassOptions();

      await Promise.all([userDataPromise, classOptionsPromise]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [formData.class_id, formData.subject_id]);

  const columns = [
    { field: "topicId", headerName: "ID", width: 30 },
    { field: "date", headerName: "Data", width: 100 },
    { field: "class", headerName: "Klasa", width: 80 },
    { field: "subject", headerName: "Przedmiot", width: 110 },
    { field: "topic", headerName: "Temat", width: 130 },
    { field: "description", headerName: "Opis tematu", width: 220 },
    { field: "teacher", headerName: "Nauczyciel", width: 120 },
  ];

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
            <div className="teacher-topics-form">
              Data: <br />
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
                  <option
                    key={classOption.class_id}
                    value={classOption.class_id}
                  >
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
              Temat: <br />
              <input
                type="text"
                name="topic_text"
                onChange={handleChange}
                value={formData.topic_text}
              />{" "}
              <br />
              Opis tematu: <br />
              <textarea
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
              />{" "}
              <br />
              <Button onClick={handleAddTopic}>Dodaj temat</Button>
              <Button onClick={handleClose}>Zamknij</Button>
            </div>
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
          />
        </div>
      </div>
    </div>
  );
}
