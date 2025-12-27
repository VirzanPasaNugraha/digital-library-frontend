// src/components/DashboardHeader.jsx
export default function DashboardHeader({ title, user }) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold text-green-600 mb-2">{title}</h1>
      {user && (
        <p className="text-gray-600 text-sm">
          Selamat datang, <span className="font-semibold">{user.name}</span>
        </p>
      )}
    </div>
  );
}
