export default function Header({ searchTerm, setSearchTerm, onAddUser }) {
    return (
        <div className="mb-8">
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">User Management</h2>
                <p className="text-gray-600">
                    Manage your users - create, edit, and organize user information
                </p>
            </div>

            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={onAddUser}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                >
                    Add User
                </button>
            </div>
        </div>
    );
}
