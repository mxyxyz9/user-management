import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm flex items-center justify-center p-8 z-50 animate-fade-in">
      <div className="bg-surface border border-border p-16 w-full max-w-lg rounded-3xl animate-scale-in">
        <div className="space-y-12">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-light text-text-primary tracking-tight">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-primary transition-colors font-light"
            >
              Close
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-8">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: '', email: '' });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Update user
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editUser || !editUser.name.trim() || !editUser.email.trim()) return;

    try {
      await axios.put(`${apiUrl}/users/${editUser.id}`, { 
        name: editUser.name, 
        email: editUser.email 
      });
      setUsers(users.map(user => 
        user.id === editUser.id ? editUser : user
      ));
      setEditUser(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  // Export users to CSV
  const exportToCSV = () => {
    if (users.length === 0) {
      alert('No users to export');
      return;
    }

    const csvHeaders = ['ID', 'Name', 'Email'];
    const csvData = users.map(user => [
      user.id.toString(),
      `"${user.name}"`,
      `"${user.email}"`
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-border-light bg-primary sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-12 py-16">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-5xl font-light text-text-primary tracking-tight">
                Users
              </h1>
              <p className="text-xl text-text-secondary font-light">
                Manage your user database
              </p>
            </div>
            <div className="flex items-center gap-6">
              {users.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="border border-border hover:border-accent text-text-secondary hover:text-text-primary px-8 py-4 font-light text-base transition-colors duration-150 tracking-tight rounded-xl"
                >
                  Export CSV
                </button>
              )}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-accent hover:bg-accent-hover text-white px-8 py-4 font-light text-base transition-colors duration-150 tracking-tight rounded-xl"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-12 py-16">
        {users.length === 0 ? (
          <div className="text-center py-32">
            <div className="space-y-8">
              <div className="w-24 h-24 bg-secondary border border-border-light flex items-center justify-center mx-auto rounded-2xl">
                <div className="w-8 h-8 bg-accent rounded-lg"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-light text-text-primary tracking-tight">
                  No users yet
                </h3>
                <p className="text-xl text-text-secondary font-light max-w-md mx-auto">
                  Get started by adding your first user to the database
                </p>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-4 font-light text-base transition-colors duration-150 tracking-tight rounded-xl"
                >
                  Add Your First User
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <CardComponent
                key={user.id}
                card={user}
                onDelete={deleteUser}
                onEdit={handleEditUser}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createUser}
        title="Add New User"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-base font-light text-text-primary tracking-tight">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-6 py-4 bg-primary border border-border-light text-text-primary placeholder-text-tertiary focus:border-border transition-colors font-light text-base tracking-tight rounded-xl"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="block text-base font-light text-text-primary tracking-tight">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-6 py-4 bg-primary border border-border-light text-text-primary placeholder-text-tertiary focus:border-border transition-colors font-light text-base tracking-tight rounded-xl"
              required
            />
          </div>
          <div className="flex gap-6 pt-8">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-6 py-4 text-text-tertiary hover:text-text-primary transition-colors font-light text-base tracking-tight"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent-hover text-white px-6 py-4 font-light text-base transition-colors tracking-tight rounded-xl"
            >
              Add User
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={updateUser}
        title="Edit User"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-base font-light text-text-primary tracking-tight">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={editUser?.name || ''}
              onChange={(e) => setEditUser(editUser ? { ...editUser, name: e.target.value } : null)}
              className="w-full px-6 py-4 bg-primary border border-border-light text-text-primary placeholder-text-tertiary focus:border-border transition-colors font-light text-base tracking-tight rounded-xl"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="block text-base font-light text-text-primary tracking-tight">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={editUser?.email || ''}
              onChange={(e) => setEditUser(editUser ? { ...editUser, email: e.target.value } : null)}
              className="w-full px-6 py-4 bg-primary border border-border-light text-text-primary placeholder-text-tertiary focus:border-border transition-colors font-light text-base tracking-tight rounded-xl"
              required
            />
          </div>
          <div className="flex gap-6 pt-8">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 px-6 py-4 text-text-tertiary hover:text-text-primary transition-colors font-light text-base tracking-tight"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent-hover text-white px-6 py-4 font-light text-base transition-colors tracking-tight rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
