import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    age: '',
    contact: '',
    email: '',
    address: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);

  const handleAddUser = () => {
    if (currentUser.name && currentUser.email) {
      if (currentUser.id) {
        setUsers(users.map(user =>
          user.id === currentUser.id ? currentUser : user
        ));
      } else {
        setUsers([...users, {
          ...currentUser,
          id: Date.now(),
          age: parseInt(currentUser.age) || 0
        }]);
      }
      resetForm();
      setIsModalOpen(false);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser({
      ...user,
      age: user.age.toString()
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">User Management</h2>
        <p className="text-gray-600">Manage your users with ease - create, edit, and organize user information</p>
      </div>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'No matching users found' : 'No users added yet. Click "Add User" to get started.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {currentUser.id ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={currentUser.age}
                  onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  value={currentUser.contact}
                  onChange={(e) => setCurrentUser({ ...currentUser, contact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={currentUser.address}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={!currentUser.name || !currentUser.email}
                >
                  {currentUser.id ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete User?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
