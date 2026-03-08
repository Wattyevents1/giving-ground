import { useCurrency, currencies, type CurrencyCode } from "@/hooks/useCurrency";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencyOptions: CurrencyCode[] = ["EUR", "USD", "GBP", "UGX"];

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(val) => setCurrency(val as CurrencyCode)}>
      <SelectTrigger className="w-[90px] h-8 text-xs border-border/50 bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((code) => (
          <SelectItem key={code} value={code} className="text-xs">
            {currencies[code].symbol === code ? code : `${currencies[code].symbol} ${code}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;