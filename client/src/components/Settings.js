import React, { useState } from "react";
import SideBar from "./Navigation/Sidebar";
import axios from "axios";
import { toast } from "react-hot-toast";

const Settings = () => {
  // State
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("/update-password", { password });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Password Updated Successfully");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="display-4 text-light bg-primary text-center p-3">Profile</h1>
      <SideBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Processing..." : "Save Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
