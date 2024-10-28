import commissionService from "../../services/commission-service";
import ShowElementList from "../../components/show-element-list/ShowElementList";
import {
  CommissionGetDto,
  SummaryCommissionGetDto,
} from "../../models/commission";
import { useMemo } from "react";
import ShowCommissionSummaryTable from "./components/commission/ShowCommissionSummaryTable";
import ShowCommissionTable from "./components/commission/ShowCommissionTable";
import useGlobalState from "../../store/store";
import { Roles } from "../../models/user";
import { OwnerAccessState } from "../../models/global";

interface CommissionProps {
  lastMonth?: boolean;
  expandedCommissions?: boolean;
}

const Commission = ({ lastMonth, expandedCommissions }: CommissionProps) => {
  const authenticatedUser = useGlobalState((state) => state.user);

  const dateFilter = useMemo(() => {
    if (lastMonth) {
      return {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
    }
    return undefined;
  }, [lastMonth]);

  const ownership: OwnerAccessState | undefined = useMemo(() => {
    if (
      [
        Roles.admin,
        Roles.secretary,
        Roles.groupAdmin,
        Roles.generalAdmin,
      ].includes(authenticatedUser?.role as Roles)
    ) {
      return "all-by-team";
    }
    return;
  }, [authenticatedUser]);

  return (
    <div>
      <ShowElementList
        url={`${commissionService.api.summaries}`}
        params={{ ownership }}
        dateFilter={dateFilter}
        limit={10}
        queryKey="commissions"
        expanded={true}
        eachElement={(element: SummaryCommissionGetDto) => (
          <>
            <ShowCommissionSummaryTable commissionSummary={element} />
            <ShowElementList
              style={{ margin: "20px" }}
              params={{ ownership }}
              expanded={expandedCommissions}
              dateFilter={{ month: element.month, year: element.year }}
              url={commissionService.api.base}
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
