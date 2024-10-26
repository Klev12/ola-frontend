import commissionService from "../../services/commission-service";
import ShowElementList from "../../components/show-element-list/ShowElementList";
import { ENV } from "../../consts/const";
import {
  CommissionGetDto,
  SummaryCommissionGetDto,
} from "../../models/commission";
import { useMemo } from "react";
import ShowCommissionSummaryTable from "./components/commission/ShowCommissionSummaryTable";
import ShowCommissionTable from "./components/commission/ShowCommissionTable";

interface CommissionProps {
  lastMonth?: boolean;
  expandedCommissions?: boolean;
}

const Commission = ({ lastMonth, expandedCommissions }: CommissionProps) => {
  const dateFilter = useMemo(() => {
    if (lastMonth) {
      return {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
    }
    return undefined;
  }, [lastMonth]);

  return (
    <div>
      <ShowElementList
        url={`${commissionService.api.summaries}`}
        params={{ ownership: "mine" }}
        dateFilter={dateFilter}
        limit={10}
        queryKey="commissions"
        expanded={true}
        eachElement={(element: SummaryCommissionGetDto) => (
          <>
            <ShowCommissionSummaryTable commissionSummary={element} />
            <ShowElementList
              style={{ margin: "20px" }}
              params={{ ownership: "mine" }}
              expanded={expandedCommissions}
              url={`${ENV.BACKEND_ROUTE}/commissions`}
              expandButtonMessage="Ver comisiones"
              allElement={(elements: CommissionGetDto[]) => (
                <ShowCommissionTable commissions={elements} />
              )}
            />
          </>
        )}
      />
    </div>
  );
};

export default Commission;
