import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function UserFormModal({
    isOpen,
    onClose,
    onSubmit,
    currentUser,
    setCurrentUser
}) {
    if (!isOpen) return null;

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .matches(/^[A-Za-z\s]+$/, 'Name must not contain numbers or special characters'),

        age: Yup.number()
            .typeError('Age must be a number')
            .positive('Age must be a positive number')
            .integer('Age must be a whole number')
            .required('Age is required'),

        contact: Yup.string()
            .required('Contact is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        address: Yup.string()
            .max(100, 'Address must be at most 100 characters'),
    });


    const handleFormSubmit = (values) => {
        setCurrentUser(values);
        onSubmit();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                        {currentUser.id ? 'Edit User' : 'Add New User'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">&times;</button>
                </div>

                <Formik
                    initialValues={currentUser}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    <Form className="space-y-4">
                        {['name', 'age', 'contact', 'email', 'address'].map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <Field
                                    name={field}
                                    type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    name={field}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        ))}

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">Cancel</button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                {currentUser.id ? 'Update User' : 'Add User'}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

