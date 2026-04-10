import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ProjectInput {
    title: string;
    featured: boolean;
    imageUrls: Array<string>;
    description: string;
    scope: string;
    outcomes: string;
    materials: Array<string>;
    category: ProjectCategory;
}
export type InquiryId = bigint;
export type ProjectId = bigint;
export interface Project {
    id: ProjectId;
    title: string;
    featured: boolean;
    imageUrls: Array<string>;
    description: string;
    scope: string;
    outcomes: string;
    materials: Array<string>;
    category: ProjectCategory;
}
export interface Inquiry {
    id: InquiryId;
    serviceType: ServiceType;
    projectDescription: string;
    name: string;
    email: string;
    timestamp: Timestamp;
    phone: string;
}
export enum ProjectCategory {
    Interior = "Interior",
    Architectural = "Architectural",
    SpacePlanning = "SpacePlanning",
    Renovation = "Renovation"
}
export enum ServiceType {
    Interior = "Interior",
    Architectural = "Architectural",
    SpacePlanning = "SpacePlanning",
    Consultation = "Consultation",
    Renovation = "Renovation"
}
export interface backendInterface {
    addHeroImage(url: string): Promise<bigint>;
    changeAdminCredentials(currentPassword: string, newUsername: string, newPassword: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createProject(data: ProjectInput): Promise<ProjectId>;
    deleteProject(id: ProjectId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getFeaturedProjects(): Promise<Array<Project>>;
    getHeroImages(): Promise<Array<string>>;
    getInquiry(id: InquiryId): Promise<Inquiry | null>;
    getProject(id: ProjectId): Promise<Project | null>;
    listInquiries(): Promise<Array<Inquiry>>;
    listProjects(category: ProjectCategory | null): Promise<Array<Project>>;
    removeHeroImage(index: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    reorderHeroImages(newOrder: Array<string>): Promise<void>;
    setProjectFeatured(id: ProjectId, featured: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitInquiry(name: string, email: string, phone: string, projectDescription: string, serviceType: ServiceType): Promise<Inquiry>;
    updateProject(id: ProjectId, data: ProjectInput): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateAdminCredentials(username: string, password: string): Promise<boolean>;
}
