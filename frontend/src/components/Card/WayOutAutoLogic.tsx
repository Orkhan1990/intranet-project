import { useEffect } from "react";
import { useFormikContext } from "formik";
import { NewCardInterface } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";

const WayOutAutoLogic = () => {
  const { values, setFieldValue } = useFormikContext<NewCardInterface>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!values.isWayOut) return;

    const distance = Number(values.wayOutDistance || 0);
    if (distance <= 0) return;

    // ✅ Default job yarat, əgər yoxdur
    if (!values.cardJobs[0]) {
      setFieldValue("cardJobs", [
        {
          code: "",
          name: "Servis çıxışı",
          av: 0,
          price: 0,
          discount: 0,
          oil: "",
          workers: [{ workerAv: 0, workerId: 0 }],
        },
      ]);
    }

    // ✅ Default worker yarat, əgər boşdursa
    if (!values.cardJobs[0].workers || values.cardJobs[0].workers.length === 0) {
      setFieldValue("cardJobs[0].workers", [{ workerAv: 0, workerId: 0 }]);
    }

    // 🔹 AV hesabla
    const av = +values.wayOutCar === 1 ? distance * 0.014 : distance * 0.028;
    setFieldValue("cardJobs[0].av", +av.toFixed(3));

    // 🔹 Price hesabla
    let price = 0;
    if (values.paymentType === "internal") {
      const worker = values.cardJobs[0].workers[0];
      if (worker) {
        const foundUser = users.find(u => u.id === Number(worker.workerId));
        const percent = foundUser ? Number(foundUser.percent || 0) / 100 : 0;
        price = Number(worker.workerAv || 0) * 50 * percent;
      }
    } else {
      price = +values.wayOutCar === 1 ? distance * 1 : distance * 2;
    }
    setFieldValue("cardJobs[0].price", +price.toFixed(2));

    // 🔹 Expence = iş vaxtı * işçi sayı * 2 (get + return)
    const expPrice = +values.wayOutWorkTime * (+values.wayOutWorkers || 0) * 2;
    if (values.expences[0] && values.expences[0].description === "Mütəxəssis çıxışı") {
      setFieldValue("expences[0].price", +expPrice.toFixed(2));
    } else {
      setFieldValue("expences", [{ description: "Mütəxəssis çıxışı", price: +expPrice.toFixed(2) }]);
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
