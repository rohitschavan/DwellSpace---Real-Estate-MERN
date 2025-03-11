import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from '../../components/context/auth';
import axios from "axios";
import toast from "react-hot-toast";
const ContactSeller = ({ ad }) => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [phone, setPhone] = useState();
    const [loading, setLoading] = useState();
    const [email, setEmail] = useState();

    const loggedIn = auth.user !== null && auth.token !== '';

    useEffect(() => {
        if (loggedIn) {
            setName(auth?.user?.name)
            setPhone(auth?.user?.phone)
            setEmail(auth?.user?.email)
        }
    }, [loggedIn])

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const { data } = await axios.post('/contact-seller', {
                name, email, phone, message, adId: ad._id
            })
            if (data?.error) {
                toast.error(data?.error)
                setLoading(false)
            } else {
                toast.success('The Seller will Contact You!');
                setLoading(false);
                setMessage('')
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong, Please Try Again', err)
            setLoading(false);
        }
    }




    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-8 offset-2">
                        <h1>Contact {ad?.postedBy?.name ? ad?.postedBy?.name : 'Loading...'}</h1>
                        <form onSubmit={handleSubmit} >
                            <textarea value={message} disabled={!loggedIn} className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter Your Message"></textarea>
                            <input value={name} disabled={!loggedIn} onChange={(e) => setName(e.target.value)} className="form-control mb-3" placeholder="Enter Name" />
                            <input value={email} disabled={!loggedIn} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder="Enter Email" />
                            <input value={phone} disabled={!loggedIn} onChange={(e) => setPhone(e.target.value)} className="form-control mb-3" placeholder="Enter Phone" />
                            <button disabled={!email || !name || loading} className="btn btn-primary">{loggedIn ? loading ? 'Please Wait' : 'Send Enquiry' : 'Please Login'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactSeller;