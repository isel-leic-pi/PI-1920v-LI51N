window.onload = function (e) {
  let functionName = window.location.pathname.substring(1).split(".")[0]

  const router = {
    index: index,   
    issue: issue
  }

  router[functionName]()

  function index() {
    fetch('/it/api/issues')
      .then(rsp => rsp.json())
      .then(showItems)

    function showItems(items) {

      let itemsHtml = items.map(item =>
        `<tr>
              <td><a href="issue.html?id=${item.id}">${item.name}</a></td>
              <td>${item.description}</td>
          </tr>`)
        .join('\n')

      const table = document.querySelector("#items")
      table.innerHTML += itemsHtml

    }
  }

  function issue() {
    let uri = '/it/api/issues/' + window.location.search.substring(1).split("=")[1]
    console.log(uri)
    fetch(uri)
      .then(rsp => rsp.json())
      .then(showItem)

    function showItem(item) {
      Object.keys(item).forEach(propName => document.querySelector(`#${propName}`).innerHTML += item[propName])
    }
  }
}