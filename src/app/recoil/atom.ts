import { atom } from "recoil";

export const productsState = atom({
    key: 'productState',
    default: [],
  });

  export const cartState = atom({
    key:"cartState",
    default:false
  })