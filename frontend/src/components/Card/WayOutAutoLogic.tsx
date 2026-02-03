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

    /* -------------------------------
       1️⃣ Servis çıxışı job-u MERGE
    ------------------------------- */
    const otherJobs =
      values.cardJobs?.filter((job) => job.name !== "Servis çıxışı") || [];

    const serviceJob =
      values.cardJobs?.find((job) => job.name === "Servis çıxışı") || {
        code: "",
        name: "Servis çıxışı",
        av: 0,
        price: 0,
        discount: 0,
        oil: "",
        workers: [{ workerAv: 0, workerId: 0 }],
      };

    /* -------------------------------
       2️⃣ AV HESABI
    ------------------------------- */
    const av = +values.wayOutCar === 1 ? (distance * 0.014) : (distance * 0.028);
    serviceJob.av = +av.toFixed(3);

    /* -------------------------------
       3️⃣ PRICE HESABI
    ------------------------------- */
    let price = 0;
    if (values.paymentType === "internal") {
      const worker = serviceJob.workers[0];
      const foundUser = users.find((u) => u.id === Number(worker.workerId));
      const percent = foundUser ? Number(foundUser.percent || 0) / 100 : 0;
      price = Number(worker.workerAv || 0) * 50 * percent;
    } else {
      price = +values.wayOutCar === 1 ? distance * 1 : distance * 2;
    }
    serviceJob.price = +price.toFixed(2);

    /* -------------------------------
       4️⃣ CARDJOBS UPDATE (Merge + Only if Changed)
    ------------------------------- */
    const mergedJobs = [serviceJob, ...otherJobs];

    const prevJobs = values.cardJobs || [];
    const isSame =
      prevJobs.length === mergedJobs.length &&
      prevJobs.every((job, i) => job.name === mergedJobs[i].name && job.av === mergedJobs[i].av && job.price === mergedJobs[i].price);

    if (!isSame) {
      setFieldValue("cardJobs", mergedJobs);
    }

    /* -------------------------------
       5️⃣ EXPENSE HESABI
    ------------------------------- */
    const expPrice =
  Number(values.wayOutWorkTime || 0) *
  Number(values.wayOutWorkers || 0) *
  2;

const prevExpenses = values.expences || [];

const exitExpenseIndex = prevExpenses.findIndex(
  (e) => e.description === "Mütəxəssis çıxışı"
);

const mergedExpenses = [...prevExpenses];

if (exitExpenseIndex >= 0) {
  // varsa → update
  if (mergedExpenses[exitExpenseIndex].price !== expPrice) {
    mergedExpenses[exitExpenseIndex] = {
      ...mergedExpenses[exitExpenseIndex],
      price: (expPrice),
    };
  }
} else {
  // yoxdursa → əlavə et
  mergedExpenses.push({
    description: "Mütəxəssis çıxışı",
    price: expPrice,
  });
}

/* 🔒 only if changed */
const isSameExpense =
  prevExpenses.length === mergedExpenses.length &&
  prevExpenses.every(
    (e, i) =>
      e.description === mergedExpenses[i].description &&
      e.price === mergedExpenses[i].price
  );

if (!isSameExpense) {
  setFieldValue("expences", mergedExpenses);
}
  }, [
    values.isWayOut,
    values.wayOutDistance,
    values.wayOutCar,
    values.wayOutWorkTime,
    values.wayOutWorkers,
    values.paymentType,
    values.cardJobs,
    values.expences,
    users,
    setFieldValue,
  ]);

  return null;
};

export default WayOutAutoLogic;
