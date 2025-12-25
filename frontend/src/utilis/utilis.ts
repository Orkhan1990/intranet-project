export const  yearWithSuffix=(year: string) =>{
     const result = year.split("-")[2];
  const lastDigit = Number(result) % 10;

  const vowelMap: Record<number, string> = {
    0: "ı",
    1: "i",
    2: "i",
    3: "ü",
    4: "ö",
    5: "e",
    6: "ı",
    7: "e",
    8: "i",
    9: "u",
  };

  const vowel = vowelMap[lastDigit];

  let suffix = "ci";
  if (["a", "ı"].includes(vowel)) suffix = "cı";
  else if (["o", "u"].includes(vowel)) suffix = "cu";
  else if (["ö", "ü"].includes(vowel)) suffix = "cü";

  return `-${suffix}`;
}


const months = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
];

export const formatAzDate=(dateString: string) =>{
  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}-ci il`;
}

    
export const getYear=(dateString:any)=>{
    const date = new Date(dateString);
      const year = date.getFullYear();
     return year;

}