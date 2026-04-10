import { ProjectCategory, ServiceType } from "../backend";

export { ProjectCategory, ServiceType };

export interface Project {
  id: bigint;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrls: string[];
  scope: string;
  materials: string[];
  outcomes: string;
  featured: boolean;
}

export interface Inquiry {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  serviceType: ServiceType;
  timestamp: bigint;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  serviceType: ServiceType;
}

export const SERVICE_LABELS: Record<ServiceType, string> = {
  [ServiceType.Interior]: "Interior Design",
  [ServiceType.Architectural]: "Architectural Design",
  [ServiceType.SpacePlanning]: "Space Planning",
  [ServiceType.Renovation]: "Renovation",
  [ServiceType.Consultation]: "Consultation",
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  [ProjectCategory.Interior]: "Interior",
  [ProjectCategory.Architectural]: "Architectural",
  [ProjectCategory.SpacePlanning]: "Space Planning",
  [ProjectCategory.Renovation]: "Renovation",
};
