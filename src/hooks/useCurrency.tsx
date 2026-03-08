import React, { createContext, useContext, useState, useCallback } from "react";

export type CurrencyCode = "EUR" | "USD" | "GBP" | "UGX";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // rate relative to EUR (base)
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  EUR: { code: "EUR", symbol: "\u20AC", label: "Euro", rate: 1 },
  USD: { code: "USD", symbol: "$", label: "US Dollar", rate: 1.08 },
  GBP: { code: "GBP", symbol: "\u00A3", label: "Pound Sterling", rate: 0.86 },
  UGX: { code: "UGX", symbol: "UGX", label: "Ugandan Shilling", rate: 4050 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatAmount: (amountInEur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "EUR",
  setCurrency: () => {},
  formatAmount: (amount) => `\u20AC${amount.toLocaleString()}`,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem("preferred-currency");
    return (saved as CurrencyCode) || "EUR";
  });

  const handleSetCurrency = useCallback((code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem("preferred-currency", code);
  }, []);

  const formatAmount = useCallback(
    (amountInEur: number) => {
      const info = currencies[currency];
      const converted = Math.round(amountInEur * info.rate);
      if (currency === "UGX") {
        return `UGX ${converted.toLocaleString()}`;
      }
      return `${info.symbol}${converted.toLocaleString()}`;
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};