import create from "zustand";
import { Token } from "Types/UserMeta/Token";
import { Roles } from "Types/UserMeta/Roles";

export const RoleStore = create(() => ({ role: Roles.normal }));

export const setUserRole = (role: Roles) => RoleStore.setState({ role: role });
export const clearUserRole = () => RoleStore.setState({ role: Roles.normal });
