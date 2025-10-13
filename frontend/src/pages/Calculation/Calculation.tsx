import { useEffect, useState } from "react";
import { OrderInterface } from "../../types";
import { useLocation } from "react-router-dom";
import { DeliverType, OrderType, PayType } from "../../enums/projectEnums";
import CalculationStandart from "../../components/Calculation/CalculationStandart";
import CalculationLocal from "../../components/Calculation/CalculationLocal";

const Calculation = () => {
  const [error, setError] = useState<string>("");
  const [order, setOrder] = useState<OrderInterface>({
    id: 0,
    project: "project1",
    cardNumber: "1",
    orderType: OrderType.Standart_Client,
    clientId: 1,
    manufacturer: "Man",
    model: "",
    chassisNumber: "",
    engineNumber: "",
    produceYear: "2024",
    km: "",
    vehicleNumber: "",
    paymentType: PayType.Transfer,
    delivering: DeliverType.Fast,
    deliveringType: "simplified",
    initialPayment: 0,
    comment: "",
    oil: false,
    orderParts: [
      {
        id: 0,
        origCode: "",
        count: 1,
        stockQuantity: 0,
        checkOnWarehouse: false,
        partName: "",
        price: 0,
        totalPrice: 0,
        transport: "0",
        sipPrice: 0,
        unitSipPrice: 0,
        percent: 0,
        profit: 0,
        sellPrice: 0,
        unitSellPrice: 0,
        delivering: "",
        nettoByUnit: "0",
        totalNetto: "0",
        transportMan: "0",
        cipPrice: "0",
        tax: "0",
        accessoryCost: "0",
        declaration: "0",
        ddpPrice: "0",
        unitDdpPrice: "0",
        percentage: "0",
        sellPriceClientStock: "0",
        rabatgrupInd: 0,
        totalSellPriceClientOrdered: "0",
        sellPriceUnitWhichInStock: "0",
        reserved: "0",
        totalSellPriceWhichInStock: "0",
        totalSellPriceOrderedWhichInStock: "0",
        priceExw:0,
        priceExwNoDiscount: "0",
        totalPriceMan: "0",
        priceWithoutPacking:"0",
        packing:"0",
        totalPriceManValue: 0,
        transportValue:0,
        percentageValue:0,
        declarationValue:0,
        accessoryCostValue: 0,
        transportManValue:0,
        taxValue: 0,
      },
    ],
  });

  const [refreshPage, setRefreshPage] = useState<boolean>(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = parseInt(params.get("orderId") || "");
  const supplierId = parseInt(params.get("supplierId") || "");
  const isStandartClient = params.get("isStandartClient") === "true";
  const delivering = params.get("delivering") || "";
  console.log(order, error);

  useEffect(() => {
    const fetchOrderParts = async () => {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/getOrder/${orderId}`
      );
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message);
        return;
      }
      setOrder(data);
    };
    fetchOrderParts();
    if(refreshPage){
      setRefreshPage(false);
    }
  }, [orderId, refreshPage]);

  // const isStandartClient = order.orderType === OrderType.Standart_Client;

  // console.log(isStandartClient);

  return isStandartClient ? (
    <CalculationStandart
      order={order}
      supplierId={supplierId}
      delivering={delivering}
      setRefreshPage={setRefreshPage}
    />
  ) : (
    <CalculationLocal
      order={order}
      supplierId={supplierId}
      delivering={delivering}
    />
  );
};

export default Calculation;
