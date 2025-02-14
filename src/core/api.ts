import {
  AggregationOptions,
  Query,
  aggregate,
  createItem,
  createUser,
  readItem,
  readItems,
  readMe,
  readUsers,
  readUser,
  updateItem,
  deleteItem,
  deleteItems,
  updateUser,
  readRoles,
  deleteUser,
  deleteUsers,
  updateItems,
  HttpMethod,
  readActivities,
  createItems,
  readFiles,
} from "@directus/sdk";
import HTTP from "./http";

const handleError = (e: any) => {
  if (e?.errors?.[0]?.extensions?.code === "TOKEN_EXPIRED") {
    const event = new Event("unauthorized");
    document.dispatchEvent(event);
  }
  return Promise.reject(e);
};
export const getItems = <T>(
  collection: string,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(readItems(collection as any, query)).catch((e) =>
    handleError(e)
  );
};
export const getItem = <T>(
  collection: string,
  key: any,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(readItem(collection as any, key, query)).catch((e) =>
    handleError(e)
  );
};

export const update = <T>(
  collection: string,
  key: any,
  item: Partial<T>,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(updateItem(collection, key, item, query)).catch((e) =>
    handleError(e)
  );
};

export const create = <T>(
  collection: string,
  item: Partial<T>,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(createItem(collection, item, query)).catch((e) =>
    handleError(e)
  );
};
export const aggregateData = <T>(
  collection: string,
  options: AggregationOptions<T extends object ? any : any, any>
) => {
  return HTTP.request<T>(aggregate(collection as any, options)).catch((e) =>
    handleError(e)
  );
};

export const getUsers = <T>(query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readUsers(query)).catch((e) => handleError(e));
};
export const getUser = <T>(id: string, query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readUser(id, query)).catch((e) => handleError(e));
};
export const me = <T>(query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readMe(query)).catch((e) => handleError(e));
};
export const removeUser = <T>(userId: string) => {
  return HTTP.request<T>(deleteUser(userId)).catch((e) => handleError(e));
};
export const removeUsers = <T>(userIds: string[]) => {
  return HTTP.request<T>(deleteUsers(userIds)).catch((e) => handleError(e));
};
export const createDirectusUser = <T>(query: any) => {
  return HTTP.request<T>(createUser(query)).catch((e) => handleError(e));
};
export const updateDiretusUser = <T>(
  userId: string,
  item: Partial<T>,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(updateUser(userId, item, query)).catch((e) =>
    handleError(e)
  );
};
export const deleteData = <T>(collection: string, key: any) => {
  return HTTP.request<T>(deleteItem(collection, key)).catch((e) =>
    handleError(e)
  );
};
export const deleteMultiData = <T>(collection: string, key: any[]) => {
  return HTTP.request<T>(deleteItems(collection, key)).catch((e) =>
    handleError(e)
  );
};
export const createData = <T>(
  collection: string,
  item: Partial<T>,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(createItem(collection, item, query)).catch((e) =>
    handleError(e)
  );
};
export const roles = <T>(query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readRoles(query)).catch((e) => handleError(e));
};

export const updateMultiItem = <T>(
  collection: string,
  keysOrQuery: Query<any, any> | string[] | number[],
  item: Partial<T>,
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(
    updateItems(collection, keysOrQuery, item, query)
  ).catch((e) => handleError(e));
};

export const readActivitiesItem = <T>(query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readActivities(query)).catch((e) => handleError(e));
};

export const readRolesItem = <T>(query?: Query<any, any> | undefined) => {
  return HTTP.request<T>(readRoles(query)).catch((e) => handleError(e));
};
export const createMultiItem = <T>(
  collection: string,
  item: Partial<any>[],
  query?: Query<any, any> | undefined
) => {
  return HTTP.request<T>(createItems(collection, item, query)).catch((e) =>
    handleError(e)
  );
};
export const readFields = <T>(query: any) => {
  return HTTP.request<T>(readFiles(query)).catch((e) => handleError(e));
};

export const customApi = async <T>(
  url: string,
  method: HttpMethod,
  params: T
) => {
  try {
    const token = await HTTP.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(
      new URL(`${import.meta.env.VITE_PUBLIC_API_URL}${url}`),
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: method === "GET" ? undefined : JSON.stringify(params),
      }
    );
    return res;
  } catch (e) {
    return handleError(e);
  }
};
