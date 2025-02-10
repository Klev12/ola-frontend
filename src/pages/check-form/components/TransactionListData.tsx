import ShowElementList, {
  ShowElementListRef,
} from "../../../components/show-element-list/ShowElementList";
import { FormGetDto } from "../../../models/forms";
import transactionService from "../../../services/transaction-service";
import { TransactionGetDto } from "../../../models/transaction";

import TransactionsTable from "../../dashboard/commercial/commercial-transaction/TransactionsTable";
import { useRef } from "react";

interface TransactionListDataProps {
  form?: FormGetDto;
}

const TransactionListData = ({ form }: TransactionListDataProps) => {
  const transactionList = useRef<ShowElementListRef>(null);

  if (!form) {
    return null;
  }

  return (
    <div>
      <h2 className="subtitle">Transacción</h2>
      <ShowElementList
        ref={transactionList}
        url={transactionService.api.base}
        queryKey={`transactions-data-${form?.code}`}
        params={{ values: { formId: form?.id } }}
        expanded={true}
        allElement={(transactions: TransactionGetDto[]) => (
          <TransactionsTable
            transactions={transactions}
            onSuccessChangeValidity={() => {
              transactionList.current?.refetch();
            }}
          />
        )}
      />
    </div>
  );
};

export default TransactionListData;
