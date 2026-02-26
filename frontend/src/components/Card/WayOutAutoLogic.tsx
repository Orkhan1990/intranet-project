import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { NewCardInterface } from "../../types";
import { RootState } from "../../redux-toolkit/store/store";

const WayOutAutoLogic = () => {
  const { values, setFieldValue } = useFormikContext<NewCardInterface>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!values.isWayOut) return;

    const distance = Number(values.wayOutDistance || 0);
    if (distance <= 0) return;

    const prevJobs = values.cardJobs || [];

    const existingServiceJob = prevJobs.find((j) => j.name === "Servis çıxışı");

    /* -------- AV -------- */
    const av =
      Number(values.wayOutCar) === 1 ? distance * 0.014 : distance * 0.028;

    /* -------- WORKER -------- */
    const workerId = existingServiceJob?.workers?.[0]?.workerId;

    /* -------- PRICE -------- */
    let price = 0;

    if (values.paymentType === "internal" && workerId) {
      const foundUser = users.find((u) => u.id === workerId);
      const percent = Number(foundUser?.percent || 0) / 100;
      price = av * 50 * percent;
    } else {
      price = Number(values.wayOutCar) === 1 ? distance * 1 : distance * 2;
    }

    const serviceJob = {
      ...(existingServiceJob ?? {
        code: "",
        name: "Servis çıxışı",
        discount: 0,
        oil: "",
        workers: [{ workerId: 0, workerAv: 0 }], // 🔥 boş array YOX
      }),
      av: +av.toFixed(3),
      price: +price.toFixed(2),
      workers: existingServiceJob?.workers?.length
        ? existingServiceJob.workers
        : [{ workerId: 0, workerAv: 0 }],
    };

    // const otherJobs = prevJobs.filter((j) => j.name !== "Servis çıxışı");

   const isOnlyOneEmptyJob =
  prevJobs.length === 1 &&
  prevJobs[0].name?.trim() === "" &&
  Number(prevJobs[0].price) === 0;

let mergedJobs: any[] = [];

if (existingServiceJob) {
  // Sadəcə update et
  mergedJobs = prevJobs.map((j) =>
    j.name === "Servis çıxışı" ? serviceJob : j
  );
} else if (isOnlyOneEmptyJob) {
  // 🔥 Əgər yalnız 1 boş job varsa → onu replace et
  mergedJobs = [serviceJob];
} else {
  // 🔥 Əks halda → ən üstdə əlavə et
  mergedJobs = [serviceJob, ...prevJobs];
}

    if (JSON.stringify(prevJobs) !== JSON.stringify(mergedJobs)) {
      setFieldValue("cardJobs", mergedJobs);
    }

    const expPrice =
      Number(values.wayOutWorkTime || 0) *
      Number(values.wayOutWorkers || 0) *
      2;

    const prevExpenses = values.expences || [];
    const idx = prevExpenses.findIndex(
      (e) => e.description === "Mütəxəssis çıxışı",
    );

    const nextExpenses = [...prevExpenses];

    if (idx >= 0) {
      if (nextExpenses[idx].price !== expPrice) {
        nextExpenses[idx] = {
          ...nextExpenses[idx],
          price: expPrice,
        };
      }
    } else {
      nextExpenses.push({
        description: "Mütəxəssis çıxışı",
        price: expPrice,
      });
    }

    setFieldValue("expences", nextExpenses);
  }, [
    values.isWayOut,
    values.wayOutDistance,
    values.wayOutCar,
    values.paymentType,
    values.wayOutWorkTime,
    values.wayOutWorkers,
    users,
  ]);

  return null;
};

export default WayOutAutoLogic;
