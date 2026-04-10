import { a as useQueryClient } from "./index-CBlI_pYA.js";
import { u as useActor, a as useQuery } from "./useActor-D37ajxFm.js";
import { u as useMutation } from "./useMutation-7xNeLzgT.js";
import { c as createActor } from "./backend-DY-Lu4s-.js";
function useFeaturedProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProjects();
    },
    enabled: !!actor && !isFetching
  });
}
function useProject(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useSubmitInquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitInquiry(
        data.name,
        data.email,
        data.phone,
        data.projectDescription,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.serviceType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    }
  });
}
export {
  useProject as a,
  useSubmitInquiry as b,
  useFeaturedProjects as u
};
