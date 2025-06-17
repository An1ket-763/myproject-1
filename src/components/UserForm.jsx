export default function UserFormModal({
    isOpen,
    onClose,
    onSubmit,
    currentUser,
    setCurrentUser
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                        {currentUser.id ? 'Edit User' : 'Add New User'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">&times;</button>
                </div>
                <div className="space-y-4">
                    {['name', 'age', 'contact', 'email', 'address'].map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)} {['name', 'email'].includes(field) ? '*' : ''}
                            </label>
                            <input
                                type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'}
                                value={currentUser[field]}
                                onChange={(e) => setCurrentUser({ ...currentUser, [field]: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required={['name', 'email'].includes(field)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={onClose} className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">Cancel</button>
                        <button
                            onClick={onSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            disabled={!currentUser.name || !currentUser.email}
                        >
                            {currentUser.id ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
