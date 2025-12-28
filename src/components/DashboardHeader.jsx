// src/components/DashboardHeader.jsx
export default function DashboardHeader({ title, user }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-2 break-words">
        {title}
      </h1>

      {user && (
        <p className="text-gray-600 text-sm break-words">
          Selamat datang,{" "}
          <span className="font-semibold break-words">
            {user.name}
          </span>
        </p>
      )}
    </div>
  );
}
