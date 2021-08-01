export const dataConverter = (data) => {
  return Object.entries(data).map((a) => {
    return {
      childrens: a[1].children ? dataConverter(a[1].children) : null,
      label: a[1].name,
      id: a[1].id,
    };
  });
};
