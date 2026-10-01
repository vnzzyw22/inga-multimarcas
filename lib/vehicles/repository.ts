import type { Vehicle } from "@/types/vehicle";
import { demoVehicles } from "@/data/vehicles.demo";

/**
 * Contrato de acesso ao estoque. A UI só conhece este contrato (via lib/vehicles/index.ts).
 *
 * Migração para MongoDB: criar `mongoVehicleRepository` implementando a mesma
 * interface (ex.: `collection("vehicles").find(...)`, mapeando `_id` → `id`) e
 * trocá-lo em `getRepository()`. Nenhum componente precisa mudar.
 */
export interface VehicleRepository {
  /** Todos os veículos, incluindo vendidos (o filtro de visibilidade fica no serviço). */
  findAll(): Promise<Vehicle[]>;
  findBySlug(slug: string): Promise<Vehicle | null>;
}

export const staticVehicleRepository: VehicleRepository = {
  async findAll() {
    return demoVehicles;
  },
  async findBySlug(slug) {
    return demoVehicles.find((v) => v.slug === slug) ?? null;
  },
};

export function getRepository(): VehicleRepository {
  // Ponto único de troca da fonte de dados (ex.: process.env.DATA_SOURCE === "mongo").
  return staticVehicleRepository;
}
