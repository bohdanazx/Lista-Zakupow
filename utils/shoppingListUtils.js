export const toggleBought = (
  shoppingList,
  sectionTitle,
  itemId,
  setShoppingList
) => {
  let newList = [...shoppingList];

  let itemIndex, sectionIndex;

  newList.forEach((section, secIdx) => {
    const foundIndex = section.data.findIndex((item) => item.id === itemId);
    if (foundIndex !== -1) {
      sectionIndex = secIdx;
      itemIndex = foundIndex;
    }
  });

  if (sectionIndex === undefined || itemIndex === undefined) return;

  let item = newList[sectionIndex].data[itemIndex];
  item.bought = !item.bought;

  // Видаляємо з поточного списку
  newList[sectionIndex].data.splice(itemIndex, 1);

  // Додаємо в нову секцію
  const targetSection = item.bought ? 1 : 0;
  newList[targetSection].data.push(item);

  setShoppingList([...newList]);
};

export const removeProduct = (
  shoppingList,
  sectionTitle,
  itemId,
  setShoppingList
) => {
  let newList = shoppingList.map((section) => ({
    ...section,
    data: section.data.filter((item) => item.id !== itemId),
  }));

  setShoppingList(newList);
};
