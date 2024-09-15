import React, { useState } from 'react';
import { Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  useGetAllListingsQuery,
  useCreateListingMutation,
  useRejectListingMutation,
  useDeleteListingMutation,
  useDeleteUserMutation,
  useApproveListingMutation,
  useGetUserQuery
} from '@/api/apiSlice'; // Import hooks from your API service
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/store/userStore';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Listing {
  id: string;
  name: string;
  price: number;
  status: 'Active' | 'Pending' | 'Rejected';
  type: 'RENT' | 'SELL';
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'users'>('listings');

  // Fetch listings from the API
  const { data: listing = [], refetch: refetchListings } = useGetAllListingsQuery();
  const [approveListing] = useApproveListingMutation();
  const [rejectListing] = useRejectListingMutation();
  const [deleteListing] = useDeleteListingMutation();
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const {id:logined_id} = userStore();
  if(logined_id!="66e5f15cd5216ac877578451") return <div>You dont have permission to access this resource</div> 
  // Function to handle listing review
  const reviewListing = (id: string) => {
    navigate("/property/"+id)
  };

  // Function to handle listing approval
  const handleApproveListing = async (id: string) => {
    try {
      await approveListing(id);
      refetchListings(); // Refetch listings to update the UI
    } catch (error) {
      console.error('Error approving listing:', error);
    }
  };

  // Function to handle listing rejection
  const handleRejectListing = async (id: string) => {
    try {
      await rejectListing(id);
      refetchListings(); // Refetch listings to update the UI
    } catch (error) {
      console.error('Error rejecting listing:', error);
    }
  };

  // Function to handle listing deletion
  const handleDeleteListing = async (id: string) => {
    try {
      await deleteListing({id});
      refetchListings(); // Refetch listings to update the UI
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      // Additional user-related refetching or state updates can be done here
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const ListingsTab: React.FC = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-blue-600 font-bold">Property Listings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listing.map(listing => (
              <tr key={listing.id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{listing.name}</td>
                <td className="px-6 py-4">{listing.price.toLocaleString()}</td>
                <td className="px-6 py-4">{listing.status}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button  className="text-blue-500 hover:text-blue-700" onClick={() => reviewListing(listing.id)}>
                    <Eye size={18} />
                    
                  </button>
                  {listing.status === 'PENDING' && (
                    <>
                      <button className="text-green-500 hover:text-green-700" onClick={() => handleApproveListing(listing.id)}>
                        <CheckCircle size={18} />
                        
                      </button>
                      <button className="text-red-500  hover:text-red-700" onClick={() => handleRejectListing(listing.id)}>
                        <XCircle  size={18} />
                        
                      </button>
                    </>
                  )}
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteListing(listing.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UsersTab: React.FC = () => {
    // Fetch users from the API (assuming there's an endpoint for this)
    const { data: users = [] } = useGetUserQuery(); // Placeholder, replace with actual API hook

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-blue-600 font-bold">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => console.log(`Review user with ID: ${user.id}`)}>
                      <Eye size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === 'listings' ? 'outline' : 'default'}
          onClick={() => setActiveTab('listings')}
        >
          Listings
        </Button>
        <Button
          variant={activeTab === 'users' ? 'outline' : 'default'}
          onClick={() => setActiveTab('users')}
        >
          Users
        </Button>
      </div>
      {activeTab === 'listings' && <ListingsTab />}
      {activeTab === 'users' && <UsersTab />}
    </div>
  );
};

export default AdminPanel;
