import { InputNumber } from "primereact/inputnumber";
import {
  SaleCommercialCost,
  SaleMemberShip,
  SalePaymentMethod,
} from "../../../../models/sale";
import { Dropdown } from "primereact/dropdown";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { SaleMenuContext } from "./CreateSaleMenu";
import BackButton from "./BackButton";
import { translatedMembership } from "../../../../consts/translations/sale-translations";
import { ServiceType } from "../../../../models/service";

const DISCOUNT_VALUE = 80;

const translatedPaymentMethodOptions: {
  [key in SalePaymentMethod]: { label: string; value: string };
} = {
  [SalePaymentMethod.app]: {
    label: "Pago en Línea",
    value: SalePaymentMethod.app,
  },
  [SalePaymentMethod.transference]: {
    label: "Deposito o Transferencia",
    value: SalePaymentMethod.transference,
  },
  [SalePaymentMethod.POS]: {
    label: "POS",
    value: SalePaymentMethod.POS,
  },
};

const translatedCommercialCostOptions: {
  [key in SaleCommercialCost]: { value: string; label: string };
} = {
  [SaleCommercialCost.commercial]: {
    value: SaleCommercialCost.commercial,
    label: "Comercial",
  },
  [SaleCommercialCost.institutionalAgreement]: {
    value: SaleCommercialCost.institutionalAgreement,
    label: "Convenio institucional",
  },
  [SaleCommercialCost.promotionalCost]: {
    value: SaleCommercialCost.promotionalCost,
    label: "Costo promocional",
  },
  [SaleCommercialCost.referredBenefit]: {
    value: SaleCommercialCost.referredBenefit,
    label: "Beneficio referido",
  },
};

const SalePaymentData = () => {
  const { setSale, sale, stepper } = useContext(SaleMenuContext);

  const [paymentMethod, setPaymentMethod] = useState<SalePaymentMethod>(
    sale?.paymentMethod ?? SalePaymentMethod.app
  );

  const [commercialCost, setCommercialCost] = useState<SaleCommercialCost>(
    sale?.commercialCost ?? SaleCommercialCost.commercial
  );
  const [membership, setMembership] = useState<SaleMemberShip>(
    sale?.membership ?? SaleMemberShip.none
  );

  const [totalToPay, setTotalToPay] = useState(sale?.totalToPay ?? 1);
  const [discount, setDiscount] = useState(sale?.discount ?? 0);
  const [total, setTotal] = useState(sale?.totalToPay ? sale.totalToPay : 1);
  const [amount, setAmount] = useState(sale?.amount ?? 1);

  useEffect(() => {
    if (discount > DISCOUNT_VALUE) {
      setDiscount(DISCOUNT_VALUE);
    }
  }, [discount]);

  useEffect(() => {
    setTotal(totalToPay - totalToPay * (discount / 100));
  }, [discount, totalToPay]);

  useEffect(() => {
    if (total < amount) {
      setAmount(total);
    }
  }, [total, amount]);

  useEffect(() => {
    if (commercialCost === SaleCommercialCost.commercial) {
      setDiscount(0);
    }
  }, [commercialCost]);

  useEffect(() => {
    if (sale?.service?.type === ServiceType.plans) {
      setMembership(SaleMemberShip.month);
    } else {
      setMembership(SaleMemberShip.none);
    }
  }, [sale]);

  const membershipOptions = useMemo(() => {
    if (sale?.course) {
      return Object.entries(translatedMembership)
        .map(([key, value]) => ({
          value: key,
          label: value,
        }))
        .filter((option) =>
          [SaleMemberShip.none, SaleMemberShip.month].includes(
            option.value as SaleMemberShip
          )
        );
    }

    if (sale?.service?.type === ServiceType.plans) {
      return Object.entries(translatedMembership)
        .map(([key, value]) => ({
          value: key,
          label: value,
        }))
        .filter((option) => option.value !== SaleMemberShip.none);
    }

    return Object.entries(translatedMembership)
      .map(([key, value]) => ({
        value: key,
        label: value,
      }))
      .filter((option) => option.value === SaleMemberShip.none);
  }, [sale]);

  console.log(total);

  return (
    <div>
      <BackButton />
      <form
        action=""
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={(e) => {
          e.preventDefault();

          setSale({
            ...sale,
            totalToPay,
            amount,
            commercialCost,
            paymentMethod,
            discount,
            membership,
          });
          stepper?.current?.nextCallback();
        }}
      >
        <label style={{ fontWeight: "bold" }} htmlFor="">
          Tipo de pago
        </label>
        <Dropdown
          name="paymentMethod"
          value={paymentMethod}
          options={Object.values(translatedPaymentMethodOptions)}
          onChange={(e) => {
            setPaymentMethod(e.value);
          }}
        />
        <label style={{ fontWeight: "bold" }} htmlFor="">
          Membresía
        </label>
        <Dropdown
          name="membership"
          required
          disabled={sale?.service?.type !== ServiceType.plans && !sale?.course}
          value={membership}
          options={membershipOptions}
          onChange={(e) => {
            setMembership(e.value);
          }}
        />

        <label style={{ fontWeight: "bold" }} htmlFor="">
          Modalidad
        </label>
        <Dropdown
          name="commercialCost"
          value={commercialCost}
          options={Object.values(translatedCommercialCostOptions)}
          onChange={(e) => {
            setCommercialCost(e.value);
          }}
        />

        <label style={{ fontWeight: "bold" }} htmlFor="">
          Valor normal
        </label>
        <InputNumber
          required
          value={totalToPay}
          minFractionDigits={2}
          min={1}
          mode="decimal"
          onChange={(e) => {
            setTotalToPay(e.value || 1);
          }}
        />

        {commercialCost !== SaleCommercialCost.commercial && (
          <>
            <label style={{ fontWeight: "bold" }} htmlFor="">
              Descuento
            </label>
            <InputNumber
              required
              min={0}
              value={discount}
              minFractionDigits={2}
              mode="decimal"
              onChange={(e) => {
                setDiscount(e.value || 0);
              }}
            />
            <label style={{ fontWeight: "bold" }} htmlFor="">
              Total
            </label>
            <div style={{ marginLeft: "15px" }}>{total.toFixed(2)} + IVA</div>
          </>
        )}

        <label style={{ fontWeight: "bold" }} htmlFor="">
          Monto
        </label>
        <InputNumber
          required
          value={amount}
          min={1}
          minFractionDigits={2}
          mode="decimal"
          onChange={(e) => {
            setAmount(e.value || 1);
          }}
        />
        <Button label="Siguiente" />
      </form>
    </div>
  );
};

export default SalePaymentData;
