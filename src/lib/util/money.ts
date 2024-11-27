import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
    amount: number
    currency_code: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    locale?: string
}

export const convertToLocale = ({
    amount,
    currency_code,
    minimumFractionDigits,
    maximumFractionDigits,
    locale = "fa-IR",
}: ConvertToLocaleParams) => {
    return currency_code && !isEmpty(currency_code)
        ? new Intl.NumberFormat(locale, {
            minimumFractionDigits,
            maximumFractionDigits,
            maximumSignificantDigits: 3
        }).format(amount) + ' ' + (process.env.CURRENCY || "تومان")
        : `${amount.toString()} ${process.env.CURRENCY}`
}