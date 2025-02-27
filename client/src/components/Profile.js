import React, { useEffect, useState } from "react";
import SideBar from "./Navigation/Sidebar";
import { useAuth } from "./context/auth";
import slugify from 'slugify'

const Profile = () => {
    // Context
    const [auth, setAuth] = useAuth();

    // State
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setEmail(auth?.user?.email || "");
        setUsername(auth?.user?.username || "");
        setName(auth?.user?.name || "");
        setCompany(auth?.user?.company || "");
        setAddress(auth?.user?.address || "");
        setPhone(auth?.user?.phone || "");
        setAbout(auth?.user?.about || "");
        setPhoto(auth?.user?.photo || null);
    }, [auth]);


    const handleSubmit = (e) => {

        
        e.preventDefault();

        try{
            console.log({ email, username, name, company, address, phone, about, photo });
        }catch(err){
            console.log('')
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
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={email} disabled />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(slugify(e.target.value.toLowerCase()))} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Company</label>
                                <input type="text" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">About</label>
                                <textarea className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Photo</label>
                                <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                            </div>
                            <button type="submit" className="btn btn-primary">{loading ? 'Processing...' :'Save Changes'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
