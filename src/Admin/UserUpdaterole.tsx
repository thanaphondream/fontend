import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserUpdaterole() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [role, setRole] = useState('');
    const [isRoleChanged, setIsRoleChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8889/auth/usershowall', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = (userId, newRole) => {
        setSelectedUserId(userId);
        setRole(newRole);
        setIsRoleChanged(true); // Set flag to true when role changes
    };

    const handleRoleUpdate = async () => {
        if (!selectedUserId || !isRoleChanged) return; // Ensure role has changed

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8889/auth/updaterole/${selectedUserId}`, {
                role: role
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const response = await axios.get('http://localhost:8889/auth/usershowall', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
            // Reset state after update
            setSelectedUserId(null);
            setRole('');
            setIsRoleChanged(false);
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-white shadow-md rounded-lg p-4">
                        <p><strong className="font-semibold">ชื่อผู้ใช้:</strong> {user.username}</p>
                        <p><strong className="font-semibold">อีเมล:</strong> {user.email}</p>
                        <p><strong className="font-semibold">เบอร์โทร:</strong> {user.phon || 'N/A'}</p>
                        <div className="flex items-center">
                            <p className="mr-2"><strong className="font-semibold">เปลี่ยนสถานะ:</strong></p>
                            <select
                                className="border border-gray-300 rounded px-2 py-1"
                                value={user.id === selectedUserId ? role : user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="USER">USER</option>
                                {/* <option value="ADMIN">ADMIN</option> */}
                                <option value="OFFICER">OFFICER</option>
                            </select>
                        </div>
                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleRoleUpdate}
                            disabled={!isRoleChanged || user.id !== selectedUserId}
                        >
                            อัพเดตสถานะ
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserUpdaterole;
