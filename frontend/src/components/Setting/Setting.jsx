import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

const ChangeProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState('');
    const user = useSelector(state => state.user);

    // Store user object in local storage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('the new',profilePicture);
    }, [user, profilePicture]);
const updatePicture =(e)=>{
    setProfilePicture(e.target.files[0]);
}
    useEffect(() => {
        // Check if user exists before calling updateProfilePicture
        if (user?.id && profilePicture) { // Ensure profilePicture is not empty
            updateProfilePicture(user.id, profilePicture);
            console.log('new picture',profilePicture);
        }
    }, [profilePicture, user]);

    const updateProfilePicture = async (userId, profilePicture) => {
        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            await axios.put(`http://localhost:7000/api/registration/${userId}/profile`, formData);
        } catch (error) {
            console.error('Failed to update profile picture:', error);
        }
    };
    return ( 
        <div>
            <input type="file" onChange={updatePicture} placeholder="choose image"/>
        </div>
     );
}
 
export default ChangeProfilePicture;
