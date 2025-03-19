export const toggleBought = (
  shoppingList,
  sectionTitle,
  itemId,
  setShoppingList
) => {
  let newList = [...shoppingList];

  const sectionIndex = newList.findIndex((s) => s.title === sectionTitle);
  const itemIndex = newList[sectionIndex]?.data.findIndex(
    (i) => i.id === itemId
  );

  if (sectionIndex === -1 || itemIndex === -1) {
    console.error("❌ Неправильний індекс!");
    return;
  }

  let item = newList[sectionIndex].data[itemIndex];
  item.bought = !item.bought;

  // Видаляємо товар із поточного розділу
  newList[sectionIndex].data.splice(itemIndex, 1);

  // Переміщаємо у відповідну секцію
  if (item.bought) {
    newList[1].data.push(item);
  } else {
    newList[0].data.unshift(item);
  }

  setShoppingList([...newList]);
};

export const removeProduct = (
  shoppingList,
  sectionTitle,
  itemId,
  setShoppingList
) => {
  let newList = shoppingList.map((section) => {
    if (section.title === sectionTitle) {
      return {
        ...section,
        data: section.data.filter((item) => item.id !== itemId),
      };
    }
    return section;
  });

  setShoppingList(newList);
};
