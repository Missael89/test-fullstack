import './App.css';
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:8080/api/person";

function App() {
  const [personas, setPersonas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", nombre: "", apellido: "", fechaNacimiento: "", sueldo: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    const response = await axios.get(API_URL);
    console.log(response);
    setPersonas(response.data);
  };

  const handleShowModal = (persona = null) => {
    if (persona) {
      setFormData(persona);
      setIsEditing(true);
    } else {
      setFormData({ id: "", nombre: "", apellido: "", fechaNacimiento: "", sueldo: "" });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await axios.put(`${API_URL}/${formData.id}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    fetchPersonas();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPersonas();
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <h2>Gestión de Personas</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>Agregar Persona</Button>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha Nacimiento</th>
              <th>Sueldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.id}>
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.fecha_nacimiento}</td>
                <td>{persona.sueldo}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShowModal(persona)}>Editar</Button>
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(persona.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Editar Persona" : "Agregar Persona"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sueldo</Form.Label>
                <Form.Control type="number" name="sueldo" value={formData.sueldo} onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
            <Button variant="primary" onClick={handleSubmit}>{isEditing ? "Guardar Cambios" : "Agregar"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
