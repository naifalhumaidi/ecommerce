// ? Why this shap "CURRENCY_FORMATTER"?
        //! new obj

const CURRENCY_FORMATTER = Intl.NumberFormat(
    "en-us",
    {
        currency: "usd",
        style: "currency",
        //! may del this one
        minimumFractionDigits:0,
    }
);

export const formatCurrency = (amount:number) => {
    console.log(CURRENCY_FORMATTER.format(amount));
    return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-us");

export const formatNumber = (count:number) => {
    return NUMBER_FORMATTER.format(count);
}

