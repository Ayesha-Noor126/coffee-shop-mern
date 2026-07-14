import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <img
        src={`https://ui-avatars.com/api/?name=${user.name}&background=3b2417&color=fff`}
        alt="avatar"
        className="rounded-full w-24 h-24"
      />
      <p className="mt-3"><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={logout} className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Logout
      </button>
    </div>
  );
}

export default Profile;