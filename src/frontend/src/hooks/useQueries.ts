import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useDrivers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDrivers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRaces() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["races"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRaces();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAchievements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAchievements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSponsors() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSponsors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitSeedData() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.initSeedData();
    },
  });
}

export function useSubmitMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitMessage(name, email, message);
    },
  });
}
