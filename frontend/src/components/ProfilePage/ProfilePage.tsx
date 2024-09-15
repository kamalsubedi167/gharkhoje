import React, { useState, useEffect } from 'react';
import { Mail, Briefcase, Home, Cake, Users } from 'lucide-react';
import avt from '../../assets/house.jpeg'; // Placeholder for default avatar
import { useGetUserProfileQuery, useGetUserQuery, useUpdateUserProfileMutation, useUploadUserAvatarMutation } from '@/api/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { userStore } from '@/store/userStore';

interface UserProfile {
  name: string;
  about: string;
  avatarUrl: string;
  address: string;
  occupation: string;
  familyStatus: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch user profile
  const { data: user, isError, isLoading } = useGetUserQuery(id  ?? "")

  console.log(user)
  // Mutation hooks
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadUserAvatar] = useUploadUserAvatarMutation();
  const {setId,setToken,id:my_id} = userStore();

  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    about: '',
    avatarUrl: avt,
    address: '',
    occupation: '',
    familyStatus: '',
    email: '',
    dateOfBirth: '',
    gender: '',
  });


 

  // Set profile state when user data is fetched
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        about: user?.profile?.about || '',
        avatarUrl: user.profile?.avatarUrl || avt,
        address: user?.profile?.address || '',
        occupation: user?.profile?.occupation || '',
        familyStatus: user?.profile?.familyStatus || '',
        email: user.email,
        dateOfBirth: user?.profile?.dateOfBirth || '',
        gender: user?.profile?.gender || 'male',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await updateUserProfile(formData).unwrap();
        setProfile(prev => ({ ...prev, avatarUrl: response?.avatarUrl ??"Hello world" }));
      } catch (error) {
        console.error('Failed to upload avatar:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // alert(id)
  if (isLoading) return <div className='text-black'>Loading...</div>;
  if (isError) return <div className='text-black'>Something went wrong fetching the profile</div>;

  return (
    <div className="min-h-screen text-black bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={"http://localhost:3000/uploads/"+profile.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                      Change Avatar
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                {isEditing ? (
                  <input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                {isEditing ? (
                  <textarea
                    id="about"
                    name="about"
                    value={profile.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.about}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  {isEditing ? (
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-gray-400" />
                      {profile.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  {isEditing ? (
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="occupation"
                        id="occupation"
                        value={profile.occupation}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                      {profile.occupation}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  {isEditing ? (
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Home className="h-5 w-5 mr-2 text-gray-400" />
                      {profile.address}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Cake className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Cake className="h-5 w-5 mr-2 text-gray-400" />
                      {profile.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="familyStatus" className="block text-sm font-medium text-gray-700">
                    Family Status
                  </label>
                  {isEditing ? (
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="familyStatus"
                        id="familyStatus"
                        value={profile.familyStatus}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-gray-400" />
                      {profile.familyStatus}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.gender}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}

            </div>
          </form>
          {
            !id  && 
          <Button  onClick={()=>{setId(null);setToken(null);navigate('/')}} className='mt-10 self-end justify-self-end text-center'>Log Out</Button>

          }

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
