import { useEffect, useMemo } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";

const SpecialPricingController = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const { clients } = useSelector((state: RootState) => state.client);

  const client = useMemo(() => {
    return clients.find(c => c.id === Number(values.clientId));
  }, [clients, values.clientId]);


  console.log(values.cardParts,"vzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  

useEffect(() => {
  if (!client || !values.cardParts?.length) return;

  const isInternal =
    values.paymentType === "internal" ||
    values.paymentType === "warranty";

  const allowDiscount =
    values.paymentType === "cash" ||
    values.paymentType === "transfer" ||
    values.paymentType === "pos";

  // 🔧 İŞÇİLİK
  values.cardJobs?.forEach((job: any, index: number) => {
    if (isInternal) {
      if (job.discount !== 0) {
        setFieldValue(`cardJobs[${index}].discount`, 0);
      }
    } else if (allowDiscount && client.av) {
    
        setFieldValue(`cardJobs[${index}].discount`, client.av);
    }
  });

  // 🔧 EHTİYYAT HİSSƏLƏRİ — ƏSAS DÜZƏLİŞ
  values.cardParts.forEach((part: any, index: number) => {
    if (!part) return;

    const newUsedPrice = isInternal
      ? part.netPrice      // maya
      : part.soldPrice;   // satış

    if (part.usedPrice !== newUsedPrice) {
      setFieldValue(`cardParts[${index}].usedPrice`, newUsedPrice);
    }

    if (isInternal) {
      if (part.discount !== 0) {
        setFieldValue(`cardParts[${index}].discount`, 0);
      }
    } else if (allowDiscount && client.partsDiscount) {
      if (part.discount !== client.partsDiscount) {
        setFieldValue(
          `cardParts[${index}].discount`,
          client.partsDiscount
        );
      }
    }
  });

}, [
   client?.id,
  client?.av,
  client?.partsDiscount,
  values.paymentType,
  values.cardJobs,
  values.cardParts,
]);


  return null;
};

export default SpecialPricingController;
