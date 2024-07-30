export default async function CNPJValidate(cnpj: string) {
  // const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  // const c = String(cnpj).replace(/[^\d]/g, '');
  // if (c.length !== 14) {
  //   return false;
  // }

  // if (/0{14}/.test(c)) {
  //   return false;
  // }

  // let n = 0;
  // for (let i = 0; i < 12; n += Number(c[i]) * b[++i]);
  // if (Number(c[12]) != ((n %= 11) < 2 ? 0 : 11 - n)) {
  //   return false;
  // }

  // n = 0;
  // for (let i = 0; i <= 12; n += Number(c[i]) * b[i++]);
  // if (Number(c[13]) != ((n %= 11) < 2 ? 0 : 11 - n)) return false;
  console.log(cnpj);

  return true;
}
