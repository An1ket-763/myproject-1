import { useState } from 'react';
import Header from './components/Header';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import DeleteModal from './components/DeleteModal';

export default function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    age: '',
    contact: '',
    email: '',
    address: ''
  });

  const resetForm = () => {
    setCurrentUser({
      id: null,
      name: '',
      age: '',
      contact: '',
      email: '',
      address: ''
    });
  };

  const handleAddUser = () => {
    if (currentUser.name && currentUser.email) {
      if (currentUser.id) {
        setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      } else {
        setUsers([...users, { ...currentUser, id: Date.now(), age: parseInt(currentUser.age) || 0 }]);
      }
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleEdit = (user) => {
    setCurrentUser({ ...user, age: user.age.toString() });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddUser={() => {
          resetForm();
          setIsModalOpen(true);
        }} />

      <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <UserForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        onSubmit={handleAddUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        user={userToDelete}
      />
    </div>
  );
}

