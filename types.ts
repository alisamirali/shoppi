export interface BannerData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  title: string;
  subtitle: string;
  price: number;
  description: string;
}

type ImageAsset = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type Slug = {
  current: string;
  _type: string;
};

type Category = {
  _id: string;
  name: string;
};

export interface ProductData {
  title: string;
  image: ImageAsset;
  quantity: number;
  price: number;
  category: Category[];
  slug: Slug;
  _createdAt: string;
  description: string;
  _updatedAt: string;
  ratings: number;
  brand: string;
  _type: string;
  _id: string;
  position: string;
  rowprice: number;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface StoreState {
  shoppi: {
    cart: ProductData[];
    wishlist: ProductData[];
    userInfo: UserInfo | null;
  };
}
