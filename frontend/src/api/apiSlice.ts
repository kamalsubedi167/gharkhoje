import { userStore } from "@/store/userStore"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface LoginResponse {
    id: string,
    token: string,
    message?: string
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface User {
    id: string,
    name: string,
    email: string,
    profile?:UserProfile
}

export interface MessageReq {
    receiver: string,
    text: string,
    isMedia?: boolean,
    mediaUrl?: string
}

export interface MessageUser {
    id: string,
    name: string,
}

export interface Message {
    id: string,
    text: string,
    sender: string,
    receiver: string,
    isMedia: boolean,
    mediaUrl: string
}


export interface MessageResponse {
    messages: Message[],
    user: User
}

//this is whre i added interfaces after snts
//++++++++++============+++++++++=========++++=

export interface Listing {
    [x: string]: string | Blob
    id?: string;
    name: string;
    description: string;
    address: string;
    type: 'RENT' | 'SELL';
    parkingSpot: boolean;
    furnished: boolean;
    beds: string;
    baths: string;
    price: string;
    photos: FileList | null;
}

export interface ListingResponse {
    id: string;
    name: string;
    description: string;
    address: string;
    type: 'RENT' | 'SELL';
    parkingSpot: boolean;
    furnished: boolean;
    beds: number;
    baths: number;
    price: number;
    photos?: string[];
    userId:string,
    created_at:string,
    updated_at:string
}

export interface CreateListingRequest {
    name: string;
    description: string;
    address: string;
    type: 'RENT' | 'SELL';
    parkingSpot: boolean;
    furnished: boolean;
    beds: number;
    baths: number;
    price: number;
    photos: string[];
}

export interface UpdateListingRequest {
    name?: string;
    description?: string;
    address?: string;
    type?: 'RENT' | 'SELL';
    parkingSpot?: boolean;
    furnished?: boolean;
    beds?: number;
    baths?: number;
    price?: number;
    photos?: string[];
}

// Profile related interfaces starts from here 
export interface UserProfile {
    id:string
    name: string;
    about?: string;
    avatarUrl: string;
    address?: string;
    occupation?: string;
    familyStatus?: string;
    email: string;
    dateOfBirth?: string;
    gender?: string;
}

export interface UpdateProfileRequest {
    id:string
    name?: string;
    about?: string;
    address?: string;
    occupation?: string;
    familyStatus?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: string;
}

export interface UploadAvatarResponse {
    avatarUrl: string;
}

//interface for adminpannel starts from here 
export interface AdminListing {
    id: string;
    name: string;
    price: number;
    status: 'Active' | 'Pending' | 'Rejected'; // The current status of the listing
    type: 'RENT' | 'SELL';
    createdAt: string;
}
export interface UpdateListingStatusRequest {
    id: string;
    status: 'Active' | 'Rejected';  // Status that admin can update
}
export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User';  // User roles
}
export interface UpdateUserStatusRequest {
    id: string;
    action: 'ACCEPT' | 'REJECT' ;  // Actions admin can take
}



export const api = createApi({


    reducerPath: "api",
    tagTypes: ['User', 'Message', 'ChattedUsers', 'Listing'],// added listing here


    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: (headers) => {
            headers.set('Authorization', 'Bearer ' + userStore.getState().token);
        }
    }), //baseUrl


    endpoints: (builder) => ({


        getUser: builder.query<User, string>({
            query: (user_id) => ({
                url: '/user/' + user_id, method: "GET"
            })
        }), //getUser,

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),

        sendMessage: builder.mutation<any, MessageReq>({
            query: (data) => ({
                url: "/message/send",
                method: "POST",
                body: data
            }),

            invalidatesTags: ['Message'],


            onQueryStarted: (args, { dispatch, queryFulfilled }) => {

                dispatch(api.util.updateQueryData('getMessages', { id: args.receiver }, (draft) => {
                    draft.messages.push({ id: "afadfssad", text: args.text, sender: userStore.getState().id + "", receiver: "aaa", isMedia: false, mediaUrl: "" })

                }) //udpate 
                )//dispatch
            },

        }), //send message
        recommend: builder.query<ListingResponse[], string>({
            query: (id) => ({
                url: "/recommend/"+id,
                method: "GET",
            }),
        }),


        getConversation: builder.query<MessageUser[], void>({
            providesTags: ['ChattedUsers']
            ,
            query: () => ({
                url: "/message/users",
                method: "GET",

            }),

        }),

        getMessages: builder.query<MessageResponse, { id: string }>({
            query: (id) => ({
                url: "/message/get",
                method: "POST",
                body: { id }
            }),
            providesTags: ['Message']
        }),

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //++++++++++======+++++++++++=========+++++++++++++============+++++++++
        //this is were i changed endpoints after santosh CRUD Operation for Listing

        createListing: builder.mutation<any, FormData>({
            query: (data) => ({
                url: '/listing',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Listing'], // Invalidate the cache for 'Listing' tag
        }),

        getAllListings: builder.query<ListingResponse[], void>({
            query: () => ({
                url: `/listings/get`,
                method: 'GET',
            }),
            providesTags: ['Listing'],
        }),
        searchListing: builder.query<ListingResponse[], {search?:string,city?:string,type?:string,price:string}>({
            query: ({search="",city="",type="",price="0-100000000000"}) => ({
                url: `/listings/search?search=`+search+"&address="+city+"&type="+type+"&price="+price,
                method: 'GET',
            }),
            providesTags: ['Listing'],
        }),

        getListingById: builder.query<ListingResponse, string>({
            query: (id) => ({
                url: `/listing/` + id,
                method: 'GET',
            }),
            providesTags: ['Listing'],
        }),
        getAllMyListings: builder.query<ListingResponse[], void>({
            query: () => ({
                url: `/my_listings/`,
            }),
            providesTags: ['Listing'],
        }),
        deleteListing: builder.mutation<void, {id:string}>({
            query: (data) => ({
                url: `/delete_listing/`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['Listing'],
        }),
        deleteMyListing: builder.mutation<string, {id:string}>({
            query: (data) => ({
                url: `/delete_listing/`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['Listing'],
        }),

        getAllListingByUserId: builder.query<ListingResponse[], string>({
            query: (user_id) => ({
                url: `/listing/user` + user_id,
                method: 'GET',
            }),
            providesTags: ['Listing'],
        }),


        updateListing: builder.mutation<Listing, { id: string; data: UpdateListingRequest }>({
            query: ({ id, data }) => ({
                url: `/listing/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Listing'],
        }),

        listListings: builder.query<Listing[], void>({
            query: () => ({
                url: '/listing',
                method: 'GET',
            }),
            providesTags: ['Listing'],
        }),
        //this is where the api for the profile starts 
        getUserProfile: builder.query<UserProfile, string>({
            query: (user_id) => ({
                url: `/user/profile?id=${user_id}`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),

        updateUserProfile: builder.mutation<UserProfile, { data: UpdateProfileRequest }>({
            query: (data) => ({
                url: `/user/profile`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        uploadUserAvatar: builder.mutation<UploadAvatarResponse, FormData>({
            query: (formData) => ({
                url: '/user/profile/avatar',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),

  // API for admin pannel 
  
  approveListing: builder.mutation<any, string>({
    query: (id) => ({
      url: `/admin/listings/${id}/approve`,
      method: 'POST',
    }),
    invalidatesTags: ['Listing'],
  }),

  rejectListing: builder.mutation<any, string>({
    query: (id) => ({
      url: `/admin/listings/${id}/reject`,
      method: 'POST',
    }),
    invalidatesTags: ['Listing'],
  }),

  deleteAdminListing: builder.mutation<void, string>({
    query: (id) => ({
      url: `/admin/listings/${id}`,
      method: 'POST',
    }),
    invalidatesTags: ['Listing'],
  }),

  // Admin API endpoint for deleting users
  deleteUser: builder.mutation<void, string>({
    query: (id) => ({
      url: `/admin/users/${id}`,
      method: 'POST',
    }),
    invalidatesTags: ['User'],
    }),

    })//endpoints

})//createApi
//the exports are changed  santo
export const { useRecommendQuery,useDeleteMyListingMutation,useGetAllMyListingsQuery,useGetMessagesQuery,useLazySearchListingQuery ,useGetUserQuery, useLoginMutation, useSendMessageMutation, useGetConversationQuery, useCreateListingMutation,
    useGetAllListingByUserIdQuery, useGetAllListingsQuery, useGetListingByIdQuery, useUpdateListingMutation, useDeleteListingMutation, useListListingsQuery,useGetUserProfileQuery,useUpdateUserProfileMutation,useUploadUserAvatarMutation,useDeleteUserMutation,useRejectListingMutation,useApproveListingMutation, } = api;
//here changed after santosh too