import type { ActionId, ActionImpl } from "kbar";
import * as React from "react";

export const ResultItem = ({
  action,
  active,
  currentRootActionId,
}: {
  action: ActionImpl;
  active: boolean;
  currentRootActionId: ActionId;
}) => {
  const ancestors = React.useMemo(() => {
    if (!currentRootActionId) {
      return action.ancestors;
    }
    const index = action.ancestors.findIndex(
      (ancestor) => ancestor.id === currentRootActionId
    );
    return action.ancestors.slice(index + 1);
  }, [action.ancestors, currentRootActionId]);

  return (
    <div
      className={
        "relative z-10 flex cursor-pointer items-center justify-between px-4 py-3"
      }
    >
      {active && (
        <div
          className="absolute inset-0 z-1! border-sidebar-primary border-l-4 bg-sidebar-accent"
          id="kbar-result-item"
        />
      )}
      <div className="relative z-10 flex items-center gap-2">
        {action.icon && action.icon}
        <div className="flex flex-col">
          <div>
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span className="mr-2 opacity-50">{ancestor.name}</span>
                  <span className="mr-2">&rsaquo;</span>
                </React.Fragment>
              ))}
            <span>{action.name}</span>
          </div>
          {action.subtitle && (
            <span className="text-muted-foreground text-sm">
              {action.subtitle}
            </span>
          )}
        </div>
      </div>
      {action.shortcut?.length ? (
        <div className="relative z-10 grid grid-flow-col gap-1">
          {action.shortcut.map((sc, i) => (
            <kbd
              className="flex items-center gap-1 rounded-md border px-1.5 py-1 font-medium text-xs shadow"
              key={sc + i}
            >
              {sc}
            </kbd>
          ))}
        </div>
      ) : null}
    </div>
  );
};
