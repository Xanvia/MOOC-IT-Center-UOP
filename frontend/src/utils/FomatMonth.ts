export const getFormattedDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) {
      return '';
    }
  
    const [year, month] = dateStr.split('-');
  
    // Check if year and month are valid
    if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
      return '';
    }
  
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };