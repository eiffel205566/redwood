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
  BiDesktop,
  BiDollarCircle,
  BiIdCard,
  BiPackage,
  BiPhoneOutgoing,
  BiVideoPlus,
  BiTrophy,
  BiTrendingUp,
  BiArchiveIn,
} from 'react-icons/bi'

import { ImAirplane, ImGlass } from 'react-icons/im'

import { GiClothes, GiRunningShoe } from 'react-icons/gi'

import { Puipui } from 'src/components/Misc/svg'

import { AiOutlineTrademarkCircle } from 'react-icons/ai'

import { BsCardChecklist } from 'react-icons/bs'

import { FiSettings, FiHelpCircle } from 'react-icons/fi'

//expense
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

//income
export const EMPLOYMENT = 'EMPLOYMENT'
export const INVESTMENT = 'INVESTMENT'
export const SIDEHUSTLE = 'SIDEHUSTLE'
export const BUSINESS = 'BUSINESS'
export const SALES = 'SALES'
export const NEWMEDIA = 'NEWMEDIA'
export const AWARD = 'AWARD'
export const ROYALTY = 'ROYALTY'
export const INTEREST = 'INTEREST'
export const INHERITAGE = 'INHERITAGE'
export const CHEQUE = 'CHEQUE'
export const HANDYMAN = 'HANDYMAN'
export const MISC = 'MISC'

//expense
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
  EMPLOYMENT: BiDesktop,
  INVESTMENT: BiDollarCircle,
  SIDEHUSTLE: BiIdCard,
  BUSINESS: BiPackage,
  SALES: BiPhoneOutgoing,
  NEWMEDIA: BiVideoPlus,
  AWARD: BiTrophy,
  ROYALTY: AiOutlineTrademarkCircle,
  INTEREST: BiTrendingUp,
  INHERITAGE: BiArchiveIn,
  CHEQUE: BsCardChecklist,
  HANDYMAN: FiSettings,
  MISC: FiHelpCircle,
}

//income
export const incomeIconTypes = {
  EMPLOYMENT: BiDesktop,
  INVESTMENT: BiDollarCircle,
  SIDEHUSTLE: BiIdCard,
  BUSINESS: BiPackage,
  SALES: BiPhoneOutgoing,
  NEWMEDIA: BiVideoPlus,
  AWARD: BiTrophy,
  ROYALTY: AiOutlineTrademarkCircle,
  INTEREST: BiTrendingUp,
  INHERITAGE: BiArchiveIn,
  CHEQUE: BsCardChecklist,
  HANDYMAN: FiSettings,
  MISC: FiHelpCircle,
}

//expense
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

//income
export const defaultIncomeIcons = [
  [BiDesktop, EMPLOYMENT],
  [BiDollarCircle, INVESTMENT],
  [BiIdCard, SIDEHUSTLE],
  [BiPackage, BUSINESS],
  [BiPhoneOutgoing, SALES],
  [BiVideoPlus, NEWMEDIA],
  [BiTrophy, AWARD],
  [AiOutlineTrademarkCircle, ROYALTY],
  [BiTrendingUp, INTEREST],
  [BiArchiveIn, INHERITAGE],
  [BsCardChecklist, CHEQUE],
  [FiSettings, HANDYMAN],
  [FiHelpCircle, MISC],
]

export const expenseIconTypeCollection = [
  CREDIT_CARD,
  TRANSPORT,
  GROCERY,
  DAILY,
  VEHICLE,
  GIFT,
  UTILITY,
  ENJOYMENT,
  PERSONAL,
  VACATION,
  DINE_OUT,
  HOUSEHOLD,
  MEMERSHIP,
  CLOTH,
  SHOE,
  PUIPUI,
]

export const isTypeExpense = (description) => {
  return expenseIconTypeCollection.includes(description)
}
