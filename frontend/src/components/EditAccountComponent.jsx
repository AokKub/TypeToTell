import React, { useState, useRef } from 'react';
import { Edit3 } from 'lucide-react';

export default function UserEditAcc() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload profile image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select image files only.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Trigger file input
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  // Validate form
  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required';
    } else if (data.username.length < 6) {
      errors.username = 'Username must be at least 6 characters';
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving account data:', formData);
      console.log('Profile image:', profileImage);
      alert('Account updated successfully!');
      setErrors({});
    } catch (error) {
      console.error('Error saving account:', error);
      alert('Failed to update account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-col min-h-screen bg-[#8AA0BD] ml-0 flex items-center justify-center p-4">
      <div
        className="absolute top-6 left-8 text-white text-[35px] font-bold tracking-wide"
        style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)' }}
      >
        TypeToTale
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-7 w-full max-w-5xl mt-20 md:mt-10">
        <h1 className="md:ml-5 ml-0 text-center md:text-left text-[35px] font-bold text-[#5C5E81] mb-8">Account</h1>

        <div className="flex md:flex-row flex-col items-start md:gap-12 gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0 md:mx-0 mx-auto">
            <div className="relative">
              <div className="w-48 h-48 bg-[#F4F3F3] rounded-full overflow-hidden flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[#53675E] text-center">
                    <div className="font-light text-[14px]">No Image</div>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEditClick}
                className="absolute bottom-3 right-3 bg-gray-300 hover:bg-gray-500 rounded-full p-2 transition-colors duration-200"
              >
                <Edit3 size={18} className="text-white" />
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="text-center font-light text-[14px] mt-2 text-sm text-[#9D9191]">
              <p>Click edit to upload</p>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="flex-1 space-y-5 w-full md:mt-10 md:w-auto">
            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 font-light text-[16px] bg-[#F4F3F3] rounded-[4px] border-none focus:outline-none focus:ring-2 ${
                  errors.username ? 'focus:ring-[#D37070] ring-2 ring-[#D37070]' : 'focus:ring-gray-400'
                }`}
              />
              {errors.username && (
                <p className="text-[#D37070] text-sm mt-1 px-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-[#F4F3F3] font-light text-[16px] rounded-[4px] border-none focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-[#D37070] ring-2 ring-[#D37070]' : 'focus:ring-gray-400'
                }`}
              />
              {errors.email && (
                <p className="text-[#D37070] text-[14px] mt-1 px-1">{errors.email}</p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className={`font-medium px-7 py-2 rounded-full transition-colors duration-200 ${
                  isSubmitting 
                    ? 'bg-[#5C5E81] text-white cursor-not-allowed' 
                    : 'bg-[#5C5E81] hover:bg-[#3E4283] text-[18px] font-medium text-white tracking-wide'
                }`}
              >
                {isSubmitting ? 'saving...' : 'save'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <a href="/login" className="block underline text-[14px] font-regular text-[#ffffff] mt-10 text-center">
        logout
      </a>
    </div>
  );
}
