import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ProjectInput } from "../backend.d";
import type { Inquiry, Project } from "../types";

const SESSION_KEY = "adminSession";

export function useAdminSession() {
  const isAuthenticated = () => localStorage.getItem(SESSION_KEY) === "true";
  const setAuthenticated = () => localStorage.setItem(SESSION_KEY, "true");
  const clearAuthenticated = () => localStorage.removeItem(SESSION_KEY);
  return { isAuthenticated, setAuthenticated, clearAuthenticated };
}

export function useValidateAdmin() {
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.validateAdminCredentials(username, password);
    },
  });
}

export function useChangeAdminCredentials() {
  const { actor } = useActor(createActor);
  return useMutation<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string },
    Error,
    { currentPassword: string; newUsername: string; newPassword: string }
  >({
    mutationFn: async ({ currentPassword, newUsername, newPassword }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.changeAdminCredentials(
        currentPassword,
        newUsername,
        newPassword,
      );
    },
  });
}

export function useAddHeroImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<bigint, Error, string>({
    mutationFn: async (url: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addHeroImage(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroImages"] });
    },
  });
}

export function useRemoveHeroImage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (index: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.removeHeroImage(index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroImages"] });
    },
  });
}

export function useAdminProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["adminProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects(null) as Promise<Project[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<bigint, Error, ProjectInput>({
    mutationFn: async (data: ProjectInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProject(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string },
    Error,
    { id: bigint; data: ProjectInput }
  >({
    mutationFn: async ({ id, data }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProject(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string },
    Error,
    bigint
  >({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useToggleFeatured() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string },
    Error,
    { id: bigint; featured: boolean }
  >({
    mutationFn: async ({ id, featured }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setProjectFeatured(id, featured);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useAdminInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listInquiries() as Promise<Inquiry[]>;
    },
    enabled: !!actor && !isFetching,
  });
}
