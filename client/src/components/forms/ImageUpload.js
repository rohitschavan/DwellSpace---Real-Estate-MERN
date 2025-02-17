import React from "react";
import { Avatar }from "antd";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const ImageUpload = (props) => {
    const { ad, setAd } = props;
const handleDelete = async(file)=>{
const answer = window.confirm('Delete Image..?');
if(!answer) return;
try{
const {data} = await axios.post('/remove-image',file);
if(data?.ok){
    setAd((prev)=>({
        ...prev,
        photos:prev.photos.filter((p)=>p.Key !== file.Key),
        uploading:false
    }))
}
}catch(err){
    console.log(err);
    setAd({...ad,uploading:false})
}
}

    const handleUpload = async (e) => {
        let files = e.target.files;
        files = [...files];

        try {
            if (files?.length) {
                setAd({ ...ad, uploading: true });
                files.map((file) => {
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
                                    setAd((prev) => ({
                                        ...prev,
                                        photos: [data, ...prev.photos],
                                        uploading: false

                                    }))
                                } catch (err) {
                                    console.log(err);
                                    setAd({ ...ad, uploading: false })
                                }

                            },
                            "base64"
                        );
                    });
                })
            }

            //
        } catch (err) {
            console.log('Error');
            setAd({ ...ad, uploading: false })
        }
        const handleDelete = async () => {
            try {
                //
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <>
            <label className="btn btn-secondary mb-5">{ad.uploading ? 'Processing...' : 'Upload Photos'}
                <input onChange={handleUpload} type="file" accept="image/*" multiple hidden />
            </label>
            {
                ad.photos?.map((file,index)=>(<Avatar key={index} src={file?.Location} shape="square" size='large' className="mb-5 ml-2" onClick={()=>handleDelete(file)}/>))
            }
        </>
    )
}

export default ImageUpload;