import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Inquiry, InquiryFormData, Project } from "../types";

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects(null) as Promise<Project[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProjects() as Promise<Project[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project | null>({
    queryKey: ["projects", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProject(id) as Promise<Project | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Inquiry, Error, InquiryFormData>({
    mutationFn: async (data: InquiryFormData) => {
      if (!actor) throw new Error("Actor not available");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actor.submitInquiry(
        data.name,
        data.email,
        data.phone,
        data.projectDescription,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.serviceType as any,
      ) as Promise<Inquiry>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
