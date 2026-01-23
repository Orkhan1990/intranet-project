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
    if (!client || !values.cardParts) return;

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
        if (job.discount !== client.av) {
          setFieldValue(`cardJobs[${index}].discount`, client.av);
        }
      }
    });

    // 🔧 EHTİYYAT HİSSƏLƏRİ
    values.cardParts.forEach((part: any, index: number) => {
      if (!part) return;

      if (isInternal) {
        // payment internal/warranty → netPrice
        if (part.soldPrice !== part.netPrice) {
          setFieldValue(`cardParts[${index}].soldPrice`, part.netPrice);
        }
        if (part.discount !== 0) {
          setFieldValue(`cardParts[${index}].discount`, 0);
        }
      } else {
        // payment cash/transfer/pos → soldPrice qalır
        setFieldValue(`cardParts[${index}].soldPrice`, part.soldPrice);

        if (allowDiscount && client.partsDiscount) {
          if (part.discount !== client.partsDiscount) {
            setFieldValue(
              `cardParts[${index}].discount`,
              client.partsDiscount
            );
          }
        }
      }
    });
  }, [
    client,
    values.paymentType,
    values.cardJobs,
    values.cardParts, // <- burda artıq whole array dependency var
  ]);

  return null;
};

export default SpecialPricingController;
