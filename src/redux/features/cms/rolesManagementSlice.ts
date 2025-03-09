import cmsApi, { ALL_TAGS } from "src/redux/api/cmsApi";
import { Permission, Role } from "./types/roleManagementType";

const roleManagement = cmsApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoles: builder.mutation<
      any,
      { name: string; description: string; permissions: Permission["id"][] }
    >({
      query: (data) => ({
        url: `role-permission`,
        body: data,
        method: "POST",
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["roles"],
    }),
    editRoles: builder.mutation<
      any,
      {
        id: Role["id"];
        name: string;
        description: string;
        permissions: Permission["id"][];
      }
    >({
      query: (data) => ({
        url: `role-permission`,
        body: data,
        method: "PATCH",
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["roles"],
    }),
    getRoles: builder.query<Role[], void>({
      query: () => ({
        url: `role-permission`,
      }),
      transformResponse: (response: { roles: { data: Role[] } }) => {
        return response.roles.data;
      },
      providesTags: ["roles"],
    }),
    getPermissions: builder.query<Permission[], void>({
      query: () => ({
        url: `role-permission/permissions`,
      }),
      transformResponse: (response: {
        permissions: {
          data: { permissions: Permission[] };
        };
      }) => {
        return response.permissions.data.permissions;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(cmsApi.util.invalidateTags(ALL_TAGS));
        } catch (error) {
          console.error("Failed to fetch permissions", error);
        }
      },
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetRolesQuery,
  useCreateRolesMutation,
  useEditRolesMutation,
} = roleManagement;

export default roleManagement;
