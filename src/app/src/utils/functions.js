export const getAuthToken = () => localStorage.getItem('auth-token');
export const formatDatum = dateStr => {
  try {
    const tag = dateStr.substring(8, 10);
    const monat = dateStr.substring(5, 7);
    const jahr = dateStr.substring(0, 4);
    const stunde = dateStr.substring(11, 13);
    const minute = dateStr.substring(14, 16);
    if (stunde === '00') return `${tag}.${monat}.${jahr}`;
    return `${tag}.${monat}.${jahr} ${stunde}:${minute}`;
  }
  catch (err) {
    return null;
  }
};

export const dash = '—';
