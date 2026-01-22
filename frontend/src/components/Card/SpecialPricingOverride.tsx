import { FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";

const SpecialPricingOverride = () => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const isInternalWorker =
    values.paymentType === "internal" &&
    values.client?.type === "ischi";

  useEffect(() => {
    if (!isInternalWorker) return;

    // Ehtiyat hissələrini override et
    values.cardParts.forEach((p:any, i:any) => {
      setFieldValue(`cardParts.${i}.soldPrice`, p.costPrice);
      setFieldValue(`cardParts.${i}.discount`, 0);
    });

    // İşçilik endirimi disable et (yalnız UI və ya override lazımdır)
    values.cardJobs.forEach((j:any, i:any) => {
      setFieldValue(`cardJobs.${i}.discount`, 0);
    });
  }, [isInternalWorker]);
  
  return null;
};
export default SpecialPricingOverride;