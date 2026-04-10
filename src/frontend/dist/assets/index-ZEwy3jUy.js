import { P as ProjectCategory, S as ServiceType } from "./backend-DlF2G3t0.js";
const SERVICE_LABELS = {
  [ServiceType.Interior]: "Interior Design",
  [ServiceType.Architectural]: "Architectural Design",
  [ServiceType.SpacePlanning]: "Space Planning",
  [ServiceType.Renovation]: "Renovation",
  [ServiceType.Consultation]: "Consultation"
};
const CATEGORY_LABELS = {
  [ProjectCategory.Interior]: "Interior",
  [ProjectCategory.Architectural]: "Architectural",
  [ProjectCategory.SpacePlanning]: "Space Planning",
  [ProjectCategory.Renovation]: "Renovation"
};
export {
  CATEGORY_LABELS as C,
  SERVICE_LABELS as S
};
