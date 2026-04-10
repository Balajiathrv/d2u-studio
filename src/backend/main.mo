import List "mo:core/List";
import ProjectTypes "types/projects";
import InquiryTypes "types/inquiries";
import AdminTypes "types/admin";
import Common "types/common";
import ProjectLib "lib/projects";
import HeroLib "lib/hero-images";
import AdminLib "lib/admin";
import StatsLib "lib/stats";
import ProjectsApi "mixins/projects-api";
import InquiriesApi "mixins/inquiries-api";
import AdminApi "mixins/admin-api";
import HeroImagesApi "mixins/hero-images-api";
import AdminProjectsApi "mixins/admin-projects-api";
import StatsApi "mixins/stats-api";



actor {
  // --- Projects ---
  let projects = List.empty<ProjectTypes.Project>();
  let projectCounter : Common.Counter = { var value = 0 };

  // --- Inquiries ---
  let inquiries = List.empty<InquiryTypes.Inquiry>();

  // --- Hero Images ---
  let heroImages = List.empty<Text>();

  // --- Admin credentials ---
  let adminCredentials : AdminTypes.AdminCredentials = {
    var username = "admin";
    var passwordHash = AdminLib.hashPassword("Project@WahidJasim#2026");
  };

  // --- Stats ---
  let stats = List.empty<Common.Stat>();

  // Seed data on first run
  projectCounter.value := ProjectLib.seedSampleData(projects, projectCounter.value);
  HeroLib.seed(heroImages);
  StatsLib.seed(stats);

  // Mixins
  include ProjectsApi(projects, projectCounter);
  include InquiriesApi(inquiries);
  include AdminApi(adminCredentials);
  include HeroImagesApi(heroImages);
  include AdminProjectsApi(projects, projectCounter);
  include StatsApi(stats);
};
