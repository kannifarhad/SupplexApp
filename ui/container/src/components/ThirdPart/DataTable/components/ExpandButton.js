import React from 'react';
import IconButton from '@mui/material/IconButton';
const ExpandButton = ({
  areAllRowsExpanded,
  buttonClass,
  expandableRowsHeader,
  expandedRows,
  iconClass,
  iconIndeterminateClass,
  isHeaderCell,
  onExpand,
}) => {
  return (
    <>
      {isHeaderCell && !areAllRowsExpanded() && areAllRowsExpanded && expandedRows.data.length > 0 ? (
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <span id="expandable-button" className={`${iconIndeterminateClass} fas fa-trash-alt`}></span>

        </IconButton>
      ) : (
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <span id="expandable-button" className={`${iconClass} fas fa-chevron-right`}></span>
        </IconButton>
      )}
    </>
  );
};

export default ExpandButton;
