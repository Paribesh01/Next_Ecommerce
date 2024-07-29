import { atom } from "recoil";

export const productsState = atom({
    key: 'productState',
    default: [],
  });

export const cartState = atom({
    key:"cartState",
    default:false
  })
export const cartItemState = atom({
  key:"cartItemState",
  default:[]
})

export const subtotal = atom({
  key:"subtotal",
default:0
})