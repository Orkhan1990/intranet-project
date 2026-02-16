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

  useEffect(() => {
    if (!client) return;

    const isInternal =
      values.paymentType === "internal" ||
      values.paymentType === "warranty";

    const allowDiscount =
      values.paymentType === "cash" ||
      values.paymentType === "transfer" ||
      values.paymentType === "pos";

    // 🔧 İŞÇİLİK
    values.cardJobs?.forEach((job: any, index: number) => {
      // Əgər istifadəçi manual dəyişibsə override etmə
      if (job.manualDiscount) return;

      if (isInternal) {
        if (job.discount !== 0) {
          setFieldValue(`cardJobs[${index}].discount`, 0);
        }
      } else if (allowDiscount && client.av) {
        setFieldValue(`cardJobs[${index}].discount`, client.av);
      }
    });

    // 🔧 EHTİYYAT HİSSƏLƏRİ
    values.cardParts.forEach((part: any, index: number) => {
      if (!part) return;

      // usedPrice yenilənməsi
      const newUsedPrice = isInternal ? part.netPrice : part.soldPrice;
      if (part.usedPrice !== newUsedPrice) {
        setFieldValue(`cardParts[${index}].usedPrice`, newUsedPrice);
      }

      // Əgər istifadəçi manual dəyişibsə override etmə
      if (part.manualDiscount) return;

      if (isInternal) {
        if (part.discount !== 0) {
          setFieldValue(`cardParts[${index}].discount`, 0);
        }
      } else if (allowDiscount && client.partsDiscount) {
        setFieldValue(
          `cardParts[${index}].discount`,
          client.partsDiscount
        );
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
