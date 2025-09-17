
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface BlogStats {
  published: number;
  drafts: number;
  fav:number;
}

export const Dash = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [stats, setStats] = useState<BlogStats>({ published: 0, drafts: 0 , fav:0});


  useEffect(() => {
    async function getUser() {
    const token = localStorage.getItem("token");
    
    await axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setNameInput(res.data.name);
      });
      console.log(user)

    await axios.get(`${BACKEND_URL}/api/v1/post/blog/stats`, {
        headers: { Authorization: `${token}` },
      }).then((res) => setStats(res.data));
      console.log(stats)
    }

 getUser();
  }, []);

  const handleUpdateName = async () => {
    const token = localStorage.getItem("token");
    if (!user) return;

    await axios
      .put(
        `${BACKEND_URL}/api/v1/user/${user.id}`,
        { name: nameInput },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        setUser(res.data);
        setEditing(false);
      });
  };

  if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
   
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
   
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-500">
              {user.name[0].toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          {editing ? (
            <div className="mt-0">
                <p className=" text-slate-700 italic">Change Name</p>
            <input
             placeholder="Enter the name to change"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </>
          )}
        </div>

        <div>
          {editing ? (
            <button
              onClick={handleUpdateName}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-5 rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-bold">{stats.published}</h3>
          <p className="text-gray-500">Published Blogs</p>
          <Link to={'/published'}>
          <p  className="mt-2 text-blue-500 hover:underline">
            View
          </p>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-bold">{stats.drafts}</h3>
          <p className="text-gray-500">Draft Blogs</p>
          <Link to={'/drafts'}>
          <p  className="mt-2 text-blue-500 hover:underline">
            View
          </p>
          </Link>
        </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-bold">{stats.fav}</h3>
          <p className="text-gray-500">Favourite Blogs</p>
          <Link to={'/fav'}>
          <p  className="mt-2 text-blue-500 hover:underline">
            View
          </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
