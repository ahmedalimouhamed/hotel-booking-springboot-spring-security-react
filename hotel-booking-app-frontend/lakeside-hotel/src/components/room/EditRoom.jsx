import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {

  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {roomId} = useParams();

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if(name == "roomPrice"){
      if(!isNaN(value)){
        value = parseInt(value);
      }else{
        value = ""
      }
    }

    setRoom({...room, [name]:value})
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
    //console.log(URL.createObjectURL(selectedImage));
    /*
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      setImagePreview(""); // Clear the preview if no image selected
    }*/
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try{
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
      }catch(error){
        console.error(error);
      }
    }

    fetchRoom();

  },  [roomId]);

  /*
  useEffect(() => {
    if (room.photo instanceof File) {
      setImagePreview(URL.createObjectURL(room.photo));
    } else {
      setImagePreview("");
    }
  }, [room.photo]);*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      console.log("before updating : ");
      const response = await updateRoom(roomId, room);
      
      if(response.status === 200){
        setSuccessMessage("room updated successfully");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
        setErrorMessage("");
      }else{
        setErrorMessage("Error updating room");
      }
    }catch(err){
      setErrorMessage(err.message)
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className='mt-5 mb-2'>Edit Room</h2>

            {successMessage && (
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}

            {errorMessage && (
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className='form-label' htmlFor="room-type">Room Type</label>
                <input type="text" className='form-control' id='room-type' name='roomType' value={room.roomType} onChange={handleRoomInputChange} />
              </div>
              
              <div className="mb-3">
                <label className='form-label' htmlFor="room-price">Room Price</label>
                <input type="number" className='form-control' id='room-price' name='roomPrice' value={room.roomPrice} onChange={handleRoomInputChange}/>
              </div>

              <div className="mb-3">
                <label className='form-label' htmlFor="room-photo">Room Photo</label>
                <input type="file" className='form-control' id='room-photo' name='photo' onChange={handleImageChange}/>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview room photo" style={{ maxWidth: '400px', maxHeight: '400px'}} className="mb-3"/>
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>
                  Back
                </Link>
                <button type='submit' className="btn btn-outline-primary ml-5">Update Room</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditRoom