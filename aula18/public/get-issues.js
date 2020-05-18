window.onload = function (e) {
  fetch('/it/api/issues')
    .then(rsp => rsp.json())
    .then(showItems)

    function showItems(items) {
      
      let itemsHtml = items.map(item => 
      `<tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
       </tr>`).join('\n')
      
      const table = document.querySelector("#items")
      table.innerHTML += itemsHtml
      
    }
}