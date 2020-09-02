function generateList(array) {
  const $parnetUl = document.createElement('ul');
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const $li = document.createElement('li');
    if (Array.isArray(el)) {
      const $nestedUl = document.createElement('ul');
      for (let j = 0; j < el.length; j++) {
        const innerEl = el[j];
        const $nestedLi = document.createElement('li');
        $nestedLi.textContent = innerEl;
        $nestedUl.append($nestedLi);
      }
      $li.append($nestedUl);
      $parnetUl.append($li);
    } else {
      $li.textContent = el;
      $parnetUl.append($li);
    }
  }
  return $parnetUl;
}

function createTable(length = 10) {
  let counter = 1;
  const $table = document.createElement('table');
  for (let i = 0; i < length; i++) {
    const $tableRow = document.createElement('tr');
    for (let i = 0; i < length; i++) {
      const $td = document.createElement('td');
      $td.textContent = counter;
      counter++;
      $tableRow.append($td);
    }
    $table.append($tableRow);
  }

  return $table;
}
