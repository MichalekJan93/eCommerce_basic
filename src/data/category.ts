import type { Category } from "@/types/types";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "phones",
    titleIntlId: "products:category.phones",
    image: "/category/iphone.webp",
    descriptionIntlId: "products:category_description.phones",
    subCategories: [
      {
        id: "subcat1",
        name: "iphone",
        titleIntlId: "products:sub_category.iphone",
        image: "/category/iphone.webp",
        descriptionIntlId: "products:sub_category_description.iphone",
        subCategories: [
          {
            id: "subsubcat1",
            name: "iphone_17",
            titleIntlId: "products:sub_category.iphone_17",
            image: "/products/iphone-17-pro/orange/iphone-17-pro-front.webp",
            descriptionIntlId: "products:sub_category_description.iphone_17",
          },
          {
            id: "subsubcat2",
            name: "iphone_16",
            titleIntlId: "products:sub_category.iphone_16",
            image: "/products/iphone-16-pro/titanium/iphone-16-pro-front.webp",
            descriptionIntlId: "products:sub_category_description.iphone_16",
          },
          {
            id: "subsubcat3",
            name: "iphone_15",
            titleIntlId: "products:sub_category.iphone_15",
            image: "/products/iphone-15-pro/black/iphone-15-pro-front.webp",
            descriptionIntlId: "products:sub_category_description.iphone_15",
          },
        ],
      },
      {
        id: "subcat2",
        name: "samsung",
        titleIntlId: "products:sub_category.samsung",
        image: "/category/samsung.webp",
        descriptionIntlId: "products:sub_category_description.samsung",
        subCategories: [
          {
            id: "subsubcat4",
            name: "samsung_s23",
            titleIntlId: "products:sub_category.samsung_s23",
            image: "/category/samsung.webp",
            descriptionIntlId: "products:sub_category_description.samsung_s23",
          },
          {
            id: "subsubcat5",
            name: "samsung_s22",
            titleIntlId: "products:sub_category.samsung_s22",
            image: "/category/samsung.webp",
            descriptionIntlId: "products:sub_category_description.samsung_s22",
          },
          {
            id: "subsubcat6",
            name: "samsung_s21",
            titleIntlId: "products:sub_category.samsung_s21",
            image: "/category/samsung.webp",
            descriptionIntlId: "products:sub_category_description.samsung_s21",
          },
        ],
      },
      {
        id: "subcat3",
        name: "xiaomi",
        titleIntlId: "products:sub_category.xiaomi",
        image: "/category/xiaomi.webp",
        descriptionIntlId: "products:sub_category_description.xiaomi",
        subCategories: [
          {
            id: "subsubcat7",
            name: "xiaomi_14",
            titleIntlId: "products:sub_category.xiaomi_14",
            image: "/category/xiaomi.webp",
            descriptionIntlId: "products:sub_category_description.xiaomi_14",
          },
          {
            id: "subsubcat8",
            name: "xiaomi_13",
            titleIntlId: "products:sub_category.xiaomi_13",
            image: "/category/xiaomi.webp",
            descriptionIntlId: "products:sub_category_description.xiaomi_13",
          },
          {
            id: "subsubcat9",
            name: "xiaomi_12",
            titleIntlId: "products:sub_category.xiaomi_12",
            image: "/category/xiaomi.webp",
            descriptionIntlId: "products:sub_category_description.xiaomi_12",
          },
        ],
      },
    ],
  },
  {
    id: "cat2",
    name: "computers",
    titleIntlId: "products:category.computers",
    image: "/category/apple.webp",
    descriptionIntlId: "products:category_description.computers",
    subCategories: [
      {
        id: "subcat4",
        name: "apple",
        titleIntlId: "products:sub_category.apple",
        image: "/category/apple.webp",
        descriptionIntlId: "products:sub_category_description.apple",
        subCategories: [
          {
            id: "subsubcat10",
            name: "macbook",
            titleIntlId: "products:sub_category.apple_macbook",
            image: "/category/macbook.webp",
            descriptionIntlId:
              "products:sub_category_description.apple_macbook",
          },
          {
            id: "subsubcat11",
            name: "imac",
            titleIntlId: "products:sub_category.apple_imac",
            image: "/category/imac.webp",
            descriptionIntlId: "products:sub_category_description.apple_imac",
          },
          {
            id: "subsubcat12",
            name: "ipad",
            titleIntlId: "products:sub_category.apple_ipad",
            image: "/category/ipad.webp",
            descriptionIntlId: "products:sub_category_description.apple_ipad",
          },
        ],
      },
      {
        id: "subcat5",
        name: "lenovo",
        titleIntlId: "products:sub_category.lenovo",
        image: "/category/lenovo.webp",
        descriptionIntlId: "products:sub_category_description.lenovo",
        subCategories: [
          {
            id: "subsubcat13",
            name: "thinkpad",
            titleIntlId: "products:sub_category.lenovo_thinkpad",
            image: "/category/thinkpad.webp",
            descriptionIntlId:
              "products:sub_category_description.lenovo_thinkpad",
          },
          {
            id: "subsubcat14",
            name: "ideapad",
            titleIntlId: "products:sub_category.lenovo_ideapad",
            image: "/category/ideapad.webp",
            descriptionIntlId:
              "products:sub_category_description.lenovo_ideapad",
          },
          {
            id: "subsubcat15",
            name: "yoga",
            titleIntlId: "products:sub_category.lenovo_yoga",
            image: "/category/yoga.webp",
            descriptionIntlId: "products:sub_category_description.lenovo_yoga",
          },
        ],
      },
      {
        id: "subcat6",
        name: "dell",
        titleIntlId: "products:sub_category.dell",
        image: "/category/dell.webp",
        descriptionIntlId: "products:sub_category_description.dell",
        subCategories: [
          {
            id: "subsubcat16",
            name: "xps",
            titleIntlId: "products:sub_category.dell_xps",
            image: "/category/xps.webp",
            descriptionIntlId: "products:sub_category_description.dell_xps",
          },
          {
            id: "subsubcat17",
            name: "inspiron",
            titleIntlId: "products:sub_category.dell_inspiron",
            image: "/category/inspiron.webp",
            descriptionIntlId:
              "products:sub_category_description.dell_inspiron",
          },
          {
            id: "subsubcat18",
            name: "latitude",
            titleIntlId: "products:sub_category.dell_latitude",
            image: "/category/latitude.webp",
            descriptionIntlId:
              "products:sub_category_description.dell_latitude",
          },
        ],
      },
    ],
  },
];
