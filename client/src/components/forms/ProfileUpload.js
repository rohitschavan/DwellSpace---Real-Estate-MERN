import React from "react";
import { Avatar } from "antd";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const ProfileUpload = ({ setPhoto, photo, setUploading,uploading }) => {

    const handleDelete = async () => {
        const answer = window.confirm('Delete Image..?');
        if (!answer) return;
        setUploading(true);
        try {
            const { data } = await axios.post('/remove-image', photo);
            if (data?.ok) {
              setPhoto(null);
              setUploading(false)
            }
        } catch (err) {
            console.log(err);
           setUploading(false);
        }
    }

    const handleUpload = async (e) => {
        let file = e.target.files[0];


        try {
            if (file) {
                setUploading(true);
                new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        file,
                        300,
                        300,
                        "JPEG",
                        100,
                        0,
                        async (uri) => {
                            try {
                                const { data } = await axios.post('/upload-image', {
                                    image: uri
                                });
                                setPhoto(data);
                                console.log(data);
                                setUploading(false);
                            } catch (err) {
                                console.log(err);
                                setUploading(false);
                            }

                        },
                        "base64"
                    );
                });
            }

            //
        } catch (err) {
            console.log('Error');
            setUploading(false);
        }

    }
    return (
        <>
            <label className="btn btn-secondary mb-5">{uploading ? 'Processing...' : 'Upload Photos'}
                <input onChange={handleUpload} type="file" accept="image/*" hidden />
            </label>
            {
                photo?.Location ? (<><Avatar src={photo?.Location} shape="square" size='large' className="mb-5 ml-2" onClick={() => handleDelete()} /></>) : ''
            }
        </>
    )
}

export default ProfileUpload;