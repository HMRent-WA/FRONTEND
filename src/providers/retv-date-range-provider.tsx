'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';

interface RetvDateRangeContextProps {
  retvDateRange: DateRange | undefined;
  setRetvDateRange: (dateRange: DateRange | undefined) => void;
}

const RetvDateRangeContext = createContext<
  RetvDateRangeContextProps | undefined
>(undefined);

export const RetvProvider = ({ children }: { children: ReactNode }) => {
  const [retvDateRange, setRetvDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return (
    <RetvDateRangeContext.Provider value={{ retvDateRange, setRetvDateRange }}>
      {children}
    </RetvDateRangeContext.Provider>
  );
};

export const useRetvDateRange = (): RetvDateRangeContextProps => {
  const context = useContext(RetvDateRangeContext);
  if (context === undefined) {
    throw new Error('useRetvDateRange must be used within a RetvProvider');
  }
  return context;
};
