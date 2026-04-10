import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";

const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
];

export function useHeroImages() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<string[]>({
    queryKey: ["heroImages"],
    queryFn: async () => {
      if (!actor) return DEFAULT_HERO_IMAGES;
      const images = await actor.getHeroImages();
      return images.length > 0 ? images : DEFAULT_HERO_IMAGES;
    },
    enabled: !!actor && !isFetching,
    placeholderData: DEFAULT_HERO_IMAGES,
    staleTime: 1000 * 60 * 5,
  });
}
