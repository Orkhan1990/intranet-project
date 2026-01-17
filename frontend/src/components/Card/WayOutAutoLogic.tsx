import { useEffect } from "react";
import { useFormikContext } from "formik";
import { NewCardInterface } from "../../types";

// const WAY_OUT_JOB_CODE = "WAY_OUT_SERVICE";

const WayOutAutoLogic = () => {
  const { values, setFieldValue } =
    useFormikContext<NewCardInterface>();

  useEffect(() => {
    if (!values.isWayOut) return;

    const distance = Number(values.wayOutDistance || 0);
    if (distance <= 0) return;

    /** JOB */
    // const hasJob = values.cardJobs.some(
    //   (j) => j.code === WAY_OUT_JOB_CODE
    // );

    if (distance > 0) {
      setFieldValue("cardJobs", [
        {
          code: "",
          name: "Servis çıxışı",
          av: 0,
          price: 0,
          discount: 0,
          oil: "",
          workers: [{ workerAv: "", workerId: 0 }],
        },
      ]);
    }

    /** EXPENCE */
    const hasExpence = values.expences.some(
      (e) => e.description === "Mütəxəssis çıxışı"
    );

    if (!hasExpence) {
      setFieldValue("expences", [
        {
          description: "Mütəxəssis çıxışı",
          price: "",
        },
      ]);
    }

   setFieldValue("cardJobs[0].av",+values.wayOutCar===1 ? parseFloat((distance / 72).toFixed(3)) :parseFloat(((distance / 72)*2).toFixed(3))); // 30 km/h
   setFieldValue("cardJobs[0].price", parseFloat((distance * 1).toFixed(2))); // get to + back from location
  }, [values.isWayOut, values.wayOutDistance]);

  return null;
};

export default WayOutAutoLogic;
