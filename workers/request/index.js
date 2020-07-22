worker.onMessage(function (res) {
  let data = countPrice(res.list);
  worker.postMessage(data)
});

function countPrice(list) {
  let totalPrice = 0, totalNum = 0, chooseList = []
  for (let i in list) {
    let l = list[i]
    if (l.checked) {
      totalPrice += Number(l.price) * Number(l.num)
      totalNum += Number(l.num)
      chooseList.push(l.id)
    }
  }
  return { totalPrice: totalPrice, chooseList: chooseList, totalNum: totalNum };
}