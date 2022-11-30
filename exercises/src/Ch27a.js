import chalk from 'chalk';

export const _chalk = (styles, str) => {
  const styled = styles.reduce((acc, style) => acc[style], chalk);
  return styled(str);
};
