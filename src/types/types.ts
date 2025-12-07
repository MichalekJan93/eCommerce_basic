export type Category = {
  id: string;
  name: string;
  titleIntlId: string;
  image: string;
  descriptionIntlId: string;
  subCategories: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
  titleIntlId: string;
  image: string;
  descriptionIntlId: string;
  subCategories?: SubCategory[];
};

export type Product = {
  id: string;
  name: string;
  nameIntlId: string;
  color: string;
  colorIntlId: string;
  brand: string;
  categoriesId: string[];
  price: string;
  currency: string;
  images: string[];
  shortDescription: string;
  longDescription: string;
  specs: object;
  variantsId: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
};
