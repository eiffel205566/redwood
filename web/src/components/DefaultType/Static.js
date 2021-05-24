import {
  BiCreditCardAlt,
  BiBus,
  BiCart,
  BiCoffee,
  BiGasPump,
  BiGift,
  BiHomeAlt,
  BiHeadphone,
  BiMobile,
  BiChair,
  BiDumbbell,
} from 'react-icons/bi'

import { ImAirplane, ImGlass } from 'react-icons/im'

import { GiClothes, GiRunningShoe } from 'react-icons/gi'

import { Puipui } from 'src/components/Misc/svg'

export const CREDIT_CARD = 'CREDIT_CARD'
export const TRANSPORT = 'TRANSPORT'
export const GROCERY = 'GROCERY'
export const DAILY = 'DAILY'
export const VEHICLE = 'VEHICLE'
export const GIFT = 'GIFT'
export const UTILITY = 'UTILITY'
export const ENJOYMENT = 'ENJOYMENT'
export const PERSONAL = 'PERSONAL'
export const VACATION = 'VACATION'
export const DINE_OUT = 'DINE_OUT'
export const HOUSEHOLD = 'HOUSEHOLD'
export const MEMERSHIP = 'MEMERSHIP'
export const CLOTH = 'CLOTH'
export const SHOE = 'SHOE'
export const PUIPUI = 'PUIPUI'

export const iconTypes = {
  CREDIT_CARD: BiCreditCardAlt,
  TRANSPORT: BiBus,
  GROCERY: BiCart,
  DAILY: BiCoffee,
  VEHICLE: BiGasPump,
  GIFT: BiGift,
  UTILITY: BiHomeAlt,
  ENJOYMENT: BiHeadphone,
  PERSONAL: BiMobile,
  VACATION: ImAirplane,
  DINE_OUT: ImGlass,
  HOUSEHOLD: BiChair,
  MEMERSHIP: BiDumbbell,
  CLOTH: GiClothes,
  SHOE: GiRunningShoe,
  PUIPUI: Puipui,
}

export const defaultIcons = [
  [BiCreditCardAlt, CREDIT_CARD],
  [BiBus, TRANSPORT],
  [BiCart, GROCERY],
  [BiCoffee, DAILY],
  [BiGasPump, VEHICLE],
  [BiGift, GIFT],
  [BiHomeAlt, UTILITY],
  [BiHeadphone, ENJOYMENT],
  [BiMobile, PERSONAL],
  [ImAirplane, VACATION],
  [ImGlass, DINE_OUT],
  [BiChair, HOUSEHOLD],
  [BiDumbbell, MEMERSHIP],
  [GiClothes, CLOTH],
  [GiRunningShoe, SHOE],
  [Puipui, PUIPUI],
]
