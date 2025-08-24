// Récupérer un seul href
const href = document.evaluate(
  "//a[@class='mon-lien']/@href",
  document,
  null,
  XPathResult.STRING_TYPE,
  null
).stringValue;

// Récupérer plusieurs href
const iterator = document.evaluate(
  "//a/@href",
  document,
  null,
  XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
  null
);
let node;
const array = [];
while ((node = iterator.iterateNext())) {
  array.push(node.nodeValue);
}
console.log(array);
