export function maskPhone(value: string): string {
  const cleanValue = value.replace(/\D/g, '');

  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

export function maskCurrency(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  const numberValue = Number(cleanValue) / 100;
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export function getMaskedValue(value: string, props: {
  isMoneyInput?: boolean;
  keyboardType?: string;
}): string {
  if (props.isMoneyInput) {
    return maskCurrency(value);
  }

  if (props.keyboardType === 'phone-pad') {
    return maskPhone(value);
  }

  return value;
}
