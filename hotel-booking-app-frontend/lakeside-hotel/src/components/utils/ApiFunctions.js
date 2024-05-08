import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8180"
});

export const getHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
}

export async function addRoom(photo, roomType, roomPrice){
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  if(response.status === 201){
    return true;
  }else{
    return false;
  }
}

export async function getRoomTypes(){
  try{
    const response = await api.get("/rooms/room/types");
    return response.data;
  }catch(err){
    throw new Error("Error fetching room types");
  }
}

export async function getAllRooms(){
  try{
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  }catch(error){
    throw new Error("Error fetching rooms");
  }
}

export async function deleteRoom(roomId){
  try{
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  }catch(error){
    throw new Error(`Error deleting room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData){
  const formData = new FormData();
  formData.append('roomType', roomData.roomType);
  formData.append('roomPrice', roomData.roomPrice);
  formData.append('photo', roomData.photo);

  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}

export async function getRoomById(roomId){
  try{
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  }catch(error){
    throw new Error(`Error fetching room ${error.message}`);
  }
}

export async function bookRoom(roomId, booking){
  try{
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
    return response.data;
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data);
    }else{
      throw new Error(`Error booking room : ${error.message}`)
    }
  }
}

export async function getAllBookings(){
  try{
    const result = await api.get("/bookings/all-bookings");
    return result.data
  }catch(error){
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

export async function getBookingByConfirmationCode(confirmationCode){
  try{
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error(`Error finding booking : ${error.message}`)
    }
  }
}

export async function cancelBooking(bookingId){
  try{
    console.log(bookingId);
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
    return result.data
  }catch(error){
    throw new Error(`Error canceling booking : ${error.message}`)
  }
}

export async function getAvailableRooms(checkinDate, checkOutDate, roomType){
  const result = await api.get(`rooms/available-rooms?checkInDate=${checkOutDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
  return result
}

export async function registerUser(registration) {
  try{
    const response = await api.post("/auth/register-user", registration)
    return response.data;
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error(`Error registration: ${error.message}`)
    }
  }
}

export async function loginUser(login){
  try{
    const response = await api.post("/auth/login", login);
    if(response.status >= 200 && response.status < 300){
      return response.data;
    }else{
      return null;
    }
  }catch(error){
    console.error(error);
    return null;
  }
}

export async function getUserProfile(userId, token){
  try{
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader()
    });
    return response.data;
  }catch(error){
    throw new Error(error);
  }
}

export async function deleteUser(userId){
  try{
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader()
    });
    return response.data;
  }catch(error){
    return error.message;
  }
}

export async function getUser(userId, token){
  try{
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader()
    });
    return response.data;
  }catch(error){
    throw new Error(error);
  }
}

export async function getBookingsByUserId(userId, token){
  try{
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader()
    })
    return response.data;
  }catch(error){
    console.error("Error fetching bookings: "+error.message);
    throw new Error("Failed to fetch bookings");
  }
}