import { useEffect } from "react";
import { useFormikContext } from "formik";
import { NewCardInterface } from "../../types";

const WayOutResetLogic = () => {
  const { values, setFieldValue } = useFormikContext<NewCardInterface>();

  useEffect(() => {
    if (values.isWayOut === false) {
      setFieldValue("wayOutDirection", "");
      setFieldValue("wayOutCar", 0);
      setFieldValue("wayOutDistance", 0);
      setFieldValue("wayOutWorkers", 0);
      setFieldValue("wayOutWorkTime", 0);

      // Servis çıxışı job-u da sil (əgər varsa)
      setFieldValue(
        "cardJobs",
        (values.cardJobs || []).filter((job) => job.name !== "Servis çıxışı"),
      );

      // WayOut expense-i də sil
      setFieldValue(
        "expences",
        (values.expences || []).filter(
          (e) => e.description !== "Mütəxəssis çıxışı",
        ),
      );
    }
  }, [values.isWayOut]);

  return null;
};

export default WayOutResetLogic;
