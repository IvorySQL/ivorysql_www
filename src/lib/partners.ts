export type Partner = {
  name: string;
  logo: string;
  url: string;
  description?: string;
};

export type PartnerCategory = {
  id: string;
  partners: Partner[];
};

export const APPLY_URL = "https://jsj.top/f/cg4swk";
export const APPLY_URL_ZH = "https://jsj.top/f/AvKTbu";

export const certificates = [
  { image: "/images/partners/cert1.jpg" },
  { image: "/images/partners/cert2.jpg" },
  { image: "/images/partners/cert3.jpg" },
  { image: "/images/partners/cert4.jpg" },
  { image: "/images/partners/cert5.png" },
];

export const partnerCategories: PartnerCategory[] = [
  {
    id: "tech",
    partners: [
      {
        name: "Pigsty",
        logo: "/images/partners/pigsty.jpg",
        url: "https://pigsty.io/",
        description: "PostgreSQL in a box — batteries included",
      },
      {
        name: "OpenKylin",
        logo: "/images/partners/openkylin.png",
        url: "https://www.openkylin.top/index-en.html",
        description: "Open-source operating system platform",
      },
      {
        name: "Deepin",
        logo: "/images/partners/deepin.jpg",
        url: "https://www.deepin.org/index/en",
        description: "Linux distribution and desktop environment",
      },
      {
        name: "OpenAnolis",
        logo: "/images/partners/openanolis.png",
        url: "https://openanolis.cn/?lang=en",
        description: "Cloud-edge AI operating system ecosystem",
      },
      {
        name: "KylinOS",
        logo: "/images/partners/kylin.png",
        url: "https://www.kylinos.cn/",
        description: "Secure and controllable operating system",
      },
      {
        name: "Data Bene",
        logo: "/images/partners/databene.png",
        url: "https://www.data-bene.io/",
        description: "Open-source database solutions and services",
      },
      {
        name: "OnGres",
        logo: "/images/partners/ongres.png",
        url: "https://ongres.com/",
        description: "PostgreSQL enterprise solutions",
      },
      {
        name: "Navicat",
        logo: "/images/partners/navicat.jpg",
        url: "https://www.navicat.com/en",
        description: "Database management and development tools",
      },
      {
        name: "WhaleOps",
        logo: "/images/partners/whaleops.png",
        url: "https://www.whaleops.com/",
        description: "Data integration and operations platform",
      },
      {
        name: "LoongArch",
        logo: "/images/partners/loongarch.png",
        url: "https://www.loongson.cn/EN",
        description: "Domestic CPU architecture and platform",
      },
    ],
  },
  {
    id: "community",
    partners: [
      {
        name: "PostgreSQL China Community",
        logo: "/images/partners/pg-association.png",
        url: "https://www.postgresqlchina.com/",
        description: "China PostgreSQL user group and community",
      },
      {
        name: "CloudBerry",
        logo: "/images/partners/cloudberry.png",
        url: "https://cloudberry.apache.org/",
        description: "Apache CloudBerry — cloud-native data warehouse",
      },
      {
        name: "IFClub",
        logo: "/images/partners/ifclub.png",
        url: "https://www.ifclub.org/",
        description: "Open-source infrastructure community",
      },
      {
        name: "Motianlun",
        logo: "/images/partners/motianlun.png",
        url: "https://www.modb.pro/",
        description: "Database technology community platform",
      },
      {
        name: "OSChina",
        logo: "/images/partners/oschina.png",
        url: "https://www.oschina.net/",
        description: "Chinese open-source developer community",
      },
      {
        name: "SegmentFault",
        logo: "/images/partners/segmentfault.png",
        url: "https://segmentfault.com/",
        description: "Developer Q&A and knowledge sharing platform",
      },
      {
        name: "Juejin",
        logo: "/images/partners/juejin.png",
        url: "https://juejin.cn/",
        description: "Technical content and developer community",
      },
      {
        name: "Qilu Open Source Society",
        logo: "/images/partners/qilukaiyuanshe.webp",
        url: "https://qloc-cn.org/",
        description: "Regional open-source community in Shandong",
      },
      {
        name: "KaiYuanShe",
        logo: "/images/partners/kaiyuanshe.png",
        url: "https://kaiyuanshe.cn/",
        description: "China open-source community alliance",
      },
      {
        name: "ShaoAn Law Firm",
        logo: "/images/partners/shaoanshiwusuo.png",
        url: "https://mp.weixin.qq.com/s/p4ZFy-bYvh5a0AR2gAJb2A",
        description: "Open-source legal and compliance services",
      },
    ],
  },
  {
    id: "solutions",
    partners: [
      {
        name: "Data Bene",
        logo: "/images/partners/databene.png",
        url: "https://www.data-bene.io/",
        description: "PostgreSQL enterprise solutions and consulting",
      },
      {
        name: "OnGres",
        logo: "/images/partners/ongres.png",
        url: "https://ongres.com/",
        description: "Enterprise PostgreSQL services and support",
      },
      {
        name: "Navicat",
        logo: "/images/partners/navicat.jpg",
        url: "https://www.navicat.com/en",
        description: "Database management and development tools",
      },
    ],
  },
  {
    id: "academic",
    partners: [
      {
        name: "OSPP",
        logo: "/images/partners/ospp.png",
        url: "https://summer-ospp.ac.cn/",
        description: "Open-source software supply chain project for students",
      },
    ],
  },
];

export function getAllPartnerCategories(): PartnerCategory[] {
  return partnerCategories;
}

export function getAllUniquePartners(): Partner[] {
  const seen = new Set<string>();
  const unique: Partner[] = [];
  for (const category of partnerCategories) {
    for (const partner of category.partners) {
      if (!seen.has(partner.name)) {
        seen.add(partner.name);
        unique.push(partner);
      }
    }
  }
  return unique;
}

export function searchPartners(
  categories: PartnerCategory[],
  term: string,
): PartnerCategory[] {
  if (!term) return categories;
  const lower = term.toLowerCase();
  return categories
    .map((cat) => ({
      ...cat,
      partners: cat.partners.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          (p.description && p.description.toLowerCase().includes(lower)),
      ),
    }))
    .filter((cat) => cat.partners.length > 0);
}
