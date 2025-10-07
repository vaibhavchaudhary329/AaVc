import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateUserDetails, changePassword } from '..//api/api.js'

function EditUser() {
  const location = useLocation();
  const { fullName, email, mobile } = location.state || {};
  const [userFullName, setUserFullName] = useState(fullName || '');
  const [userEmail, setUserEmail] = useState(email || '');
  const [userMobile, setUserMobile] = useState(mobile || '');

  const [nameedit, setNameEdit] = useState('');
  const [emailedit, setEmailEdit] = useState('');
  const [phoneedit, setPhoneEdit] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const editType = location.state?.editType;
  const navigate = useNavigate();
  const handleEditUser = async (e) => {
    console.log("P: ", password, userEmail);
    e.preventDefault();
    const identifier = localStorage.getItem("userinfo") || localStorage.getItem('googleuserid')
    try {
      const response = await updateUserDetails({ identifier, fullName: userFullName, email: userEmail, mobile: userMobile });
      console.log("H1:", response);
      alert(response);
      navigate('/home');
    } catch (error) {
      console.error("Error is", error);
      setError(error?.response?.data || "Update failed");
    }

  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
    } else if (newPassword === confirmNewPassword) {
      try {
        const response = await changePassword({ oldPassword, newPassword, confirmPassword: confirmNewPassword });
        console.log("Response: ", response);
        navigate('/signin');
      } catch (error) {
        console.error("Error: ", error);
        setError(error?.response?.data || "Update failed");
      }
    }



  }
  return (
    <div className="container">
      {
        editType === 'profile' && (
          <div>
            <h2 >Edit Profile</h2>
            <form onSubmit={handleEditUser}>
              {/* Name */}
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type="text" placeholder="Name" value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)} required disabled={!nameedit} />
                <span onClick={() => setNameEdit((prev) => !prev)} >
                  <FaPencilAlt />
                </span>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type="email" placeholder="Email" value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)} required disabled={!emailedit} />
                <span onClick={() => setEmailEdit((prev) => !prev)} >
                  <FaPencilAlt />
                </span>
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type="text" placeholder="Phone" value={userMobile}
                  onChange={(e) => setUserMobile(e.target.value)} required disabled={!phoneedit} />
                <span onClick={() => setPhoneEdit((prev) => !prev)} >
                  <FaPencilAlt />
                </span>
              </div>


              {/* Password */}
              {/* <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />

                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div> */}

              {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
              <button type="submit">Update</button>
              <button type="button" onClick={() => navigate('/home')}>Cancel</button>
            </form>
          </div>
        )
      }
      {
        editType === 'password' && (
          <div>
            <h2 >Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '15px', position: 'relative' }}>

                <input type={showOldPassword ? 'text' : 'password'} placeholder="Old Password"
                  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required
                />

                <span onClick={() => setShowOldPassword((prev) => !prev)}>
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>


              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type={showNewPassword ? 'text' : 'password'} placeholder="New Password"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                />

                <span onClick={() => setShowNewPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <input type={showConfirmNewPassword ? 'text' : 'password'} placeholder="Confirm New Password"
                  value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required
                />

                <span onClick={() => setShowConfirmNewPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {error && <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>}
              <button type="submit">Change Password</button>
              <button type="button" onClick={() => navigate('/home')}>Cancel</button>
            </form>
          </div>
        )
      }
    </div>
  );

}
export default EditUser;
